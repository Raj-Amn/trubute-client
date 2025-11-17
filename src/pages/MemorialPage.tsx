import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import MemorialHero from "../components/MemorialHero";
import MemorialTabs from "../components/MemorialTabs";

// Load memorial + tributes
const fetchMemorial = async (website: string) => {
  const res = await axiosInstance.get(`/memorials/${website}`);
  return res.data.memorial;
};

const MemorialFullPage = () => {
  const { website } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [tributeText, setTributeText] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [type, setType] = useState<"text" | "photo" | "video" | "audio">(
    "text"
  );

  const memorialQuery = useQuery({
    queryKey: ["memorial", website],
    queryFn: () => fetchMemorial(website!),
  });

  // Add tribute
  const addTributeMutation = useMutation({
    mutationFn: async () => {
      let mediaUrl = null;

      if (mediaFile) {
        const form = new FormData();
        form.append("file", mediaFile);

        const upload = await axiosInstance.post("/upload", form);
        mediaUrl = upload.data.url;

        // detect type
        const fileType = mediaFile.type.startsWith("video")
          ? "video"
          : mediaFile.type.startsWith("audio")
          ? "audio"
          : "photo";

        setType(fileType);
      }

      return axiosInstance.post(
        `/memorials/${memorialQuery.data._id}/tribute`,
        {
          type,
          text: tributeText,
          mediaUrl,
        }
      );
    },
    onSuccess: () => {
      setTributeText("");
      setMediaFile(null);
      queryClient.invalidateQueries(["memorial", website]);
    },
  });

  if (memorialQuery.isLoading) return <CircularProgress sx={{ mt: 10 }} />;

  const memorial = memorialQuery.data;

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <MemorialHero memorial={memorial} />
        <MemorialTabs memorial={memorial} tributes={memorial?.tributes || []} />

        <Typography textAlign="center" sx={{ color: "gray", mt: 1 }}>
          Created on {new Date(memorial.createdAt).toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 3 }} />

{user && (
  <Box
    sx={{
      mb: 4,
      p: 3,
      borderRadius: 3,
      background: "linear-gradient(135deg, #fff7f0, #fffcfa)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <Typography
      variant="h6"
      fontWeight={700}
      sx={{ color: "#8b5e3c", mb: 1 }}
    >
      Leave a Tribute
    </Typography>

    <Typography variant="body2" sx={{ mb: 2, color: "#6d4c41" }}>
      Share a warm memory, offer your love, or celebrate their legacy.  
      Your words become part of this special remembrance.
    </Typography>

    {/* Tribute Text Input */}
    <TextField
      fullWidth
      multiline
      rows={4}
      value={tributeText}
      onChange={(e) => setTributeText(e.target.value)}
      placeholder="Write something from the heart…"
      sx={{
        background: "white",
        borderRadius: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />

    {/* Media Upload */}
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        component="label"
        sx={{
          borderRadius: 20,
          textTransform: "none",
        }}
      >
        Upload Photo / Video / Audio
        <input
          type="file"
          hidden
          onChange={(e) => {
            setMediaFile(e.target.files?.[0] || null);
          }}
        />
      </Button>
    </Box>

    {/* Preview Section */}
    {mediaFile && (
      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Preview
        </Typography>

        {/* Image Preview */}
        {mediaFile.type.startsWith("image") && (
          <img
            src={URL.createObjectURL(mediaFile)}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: 280,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />
        )}

        {/* Video Preview */}
        {mediaFile.type.startsWith("video") && (
          <video
            controls
            style={{
              width: "100%",
              borderRadius: 10,
            }}
          >
            <source src={URL.createObjectURL(mediaFile)} />
          </video>
        )}

        {/* Audio Preview */}
        {mediaFile.type.startsWith("audio") && (
          <audio
            controls
            style={{ width: "100%" }}
            src={URL.createObjectURL(mediaFile)}
          />
        )}
      </Box>
    )}

    {/* Submit Button */}
    <Button
      variant="contained"
      fullWidth
      sx={{
        mt: 3,
        py: 1.3,
        borderRadius: 3,
        fontSize: "1rem",
        fontWeight: 600,
        background: "linear-gradient(135deg, #8b5e3c, #a47148)",
        "&:hover": {
          background: "linear-gradient(135deg, #7a4f31, #8c603a)",
        },
        textTransform: "none",
      }}
      onClick={() => addTributeMutation.mutate()}
    >
      Post Tribute
    </Button>
  </Box>
)}


        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" mb={2}>
          Tributes
        </Typography>

        {memorial.tributes?.length === 0 && (
          <Typography>No tributes yet.</Typography>
        )}

        {memorial.tributes?.map((t: any) => (
          <Paper key={t._id} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight={600}>
              {t.createdBy?.name || "Anonymous"}
            </Typography>

            {t.type === "text" && <Typography>{t.text}</Typography>}

            {t.type === "photo" && (
              <img src={t.mediaUrl} style={{ width: "200px", marginTop: 10 }} />
            )}

            {t.type === "video" && (
              <video src={t.mediaUrl} controls style={{ width: "300px" }} />
            )}

            {t.type === "audio" && <audio src={t.mediaUrl} controls />}

            <Typography variant="caption">
              {new Date(t.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
};

export default MemorialFullPage;
