import { useEffect, useRef, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Skeleton,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import MessageTributes from "./MessageTributes";
import AudioTributes from "./AudioTributes";
import AboutTab from "./AboutTab";

interface MemorialTabsProps {
  memorial: any;
  tributes: any[];
}

const TabPanel = ({ value, index, children }: any) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const MemorialTabs = ({ memorial, tributes }: MemorialTabsProps) => {
  const [tab, setTab] = useState(0);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoDescription, setPhotoDescription] = useState("");
  const { user } = useAuth();
  console.log(user,'user')
  console.log(memorial,'memorial')
  const isUser=user.id===memorial.createdBy
  const uploadPhoto = async () => {
    if (!photoFile) return alert("Please select a photo");

    const formData = new FormData();
    formData.append("media", photoFile);
    formData.append("caption", photoDescription);

    await axiosInstance.post(`/memorial/${memorial._id}/media`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    resetPhotos();
    loadPhotos(); // refresh list immediately
  };

  const handleChange = (_: any, newValue: number) => setTab(newValue);

  const textTributes = tributes.filter((t) => t.type === "text");
  const photoTributes = tributes.filter((t) => t.type === "photo");
  const videoTributes = tributes.filter((t) => t.type === "video");
  const audioTributes = tributes.filter((t) => t.type === "audio");

  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPhotos = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    const res = await axiosInstance.get(
      `/memorial/${memorial._id}/media?type=photo&page=${page}&limit=10`
    );

    setPhotos((prev) => [...prev, ...res.data.data]);
    setHasMore(res.data.hasMore);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const hasLoadedRef = useRef(false);

  // Load photos when entering the Photos tab
  useEffect(() => {
    if (tab === 2 && !hasLoadedRef.current) {
      resetPhotos();
      loadPhotos();
      hasLoadedRef.current = true;
    }
  }, [tab]);

  // Reset on tab open or after upload
  const resetPhotos = () => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
  };

  // Infinite Scroll Listener
  useEffect(() => {
    if (tab !== 2) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        hasMore &&
        !loading
      ) {
        loadPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tab, hasMore, loading]);

  return (
    <Paper
      sx={{
        mt: 6,
        borderRadius: 3,
        padding: 2,

        backgroundColor: "#fdfaf6",
        overflow: "hidden",
      }}
    >
      {/* HEADER TABS */}
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          backgroundColor: "#0b2c52",
          "& .MuiTab-root": {
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
          },
          "& .Mui-selected": {
            color: "#ffd089 !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#ffd089",
            height: 3,
          },
        }}
      >
        <Tab label="About" />
        <Tab label="Messages" />
        <Tab label="Photos" />
        <Tab label="Videos" />
        <Tab label="Audio" />
      </Tabs>

      {/* ABOUT TAB */}

       <TabPanel value={tab} index={0}>
        <AboutTab memorial={memorial} />
       </TabPanel>

      <TabPanel value={tab} index={1}>
        <MessageTributes memorialId={memorial._id} tab={tab} />
      </TabPanel>

      {/* PHOTOS */}
      <TabPanel value={tab} index={2}>
        {/* Upload Section */}
        {isUser && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: "#f7faff",
              border: "1px solid #d9e5f7",
            }}
            elevation={0}
          >
            <Typography variant="h6" fontWeight={700} sx={{ color: "#0b2c52" }}>
              Share a Photo Memory
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add a photo with a short message to honor their memory.
            </Typography>

            <TextField
              fullWidth
              label="Description (optional)"
              multiline
              rows={2}
              value={photoDescription}
              onChange={(e) => setPhotoDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              style={{ marginBottom: 16 }}
            />

            <Button
              variant="contained"
              sx={{
                background: "#0b2c52",
                "&:hover": { background: "#09305f" },
                fontWeight: "600",
              }}
              onClick={uploadPhoto}
            >
              Upload Photo
            </Button>
          </Paper>
        )}

        {/* Section Header */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: "#0b2c52", mb: 3 }}
        >
          Photo Memories
        </Typography>

        {photos.length === 0 && !loading && (
          <Typography color="text.secondary">
            No photos have been added yet. Be the first to share a memory.
          </Typography>
        )}

        {/* Instagram Grid */}
        <Grid container spacing={3}>
          {photos.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t._id}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <img
                  src={t.url}
                  alt="tribute"
                  style={{
                    width: "100%",
                    height: 260,
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ p: 2 }}>
                  <Typography fontWeight={700} sx={{ color: "#0b2c52", mb: 1 }}>
                    {t.userId?.name || "Anonymous"}
                  </Typography>

                  {t.caption && (
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 1, fontSize: "0.9rem" }}
                    >
                      {t.caption}
                    </Typography>
                  )}

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {new Date(t.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Loading Skeleton */}
        {loading && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {[1, 2, 3].map((s) => (
                <Grid key={s} item xs={12} sm={6} md={4}>
                  <Skeleton variant="rectangular" width="100%" height={260} />
                  <Skeleton width="60%" sx={{ mt: 1 }} />
                  <Skeleton width="40%" />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Load More button fallback */}
        {hasMore && !loading && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="outlined"
              onClick={loadPhotos}
              sx={{ borderColor: "#0b2c52", color: "#0b2c52" }}
            >
              Load More
            </Button>
          </Box>
        )}
      </TabPanel>

      {/* VIDEOS */}
      <TabPanel value={tab} index={3}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "#0b2c52", mb: 3 }}
        >
          Video Tributes
        </Typography>

        {videoTributes.length === 0 && (
          <Typography color="text.secondary">No videos yet.</Typography>
        )}

        <Grid container spacing={2}>
          {videoTributes.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t._id}>
              <video
                controls
                src={t.mediaUrl}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* AUDIO Message */}
      <TabPanel value={tab} index={4}>
        <AudioTributes memorialId={memorial._id} isUser={isUser} tab={tab} />
      </TabPanel>
    </Paper>
  );
};

export default MemorialTabs;
