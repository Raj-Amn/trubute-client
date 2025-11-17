import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";

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

  const handleChange = (_: any, newValue: number) => setTab(newValue);

  const textTributes = tributes.filter((t) => t.type === "text");
  const photoTributes = tributes.filter((t) => t.type === "photo");
  const videoTributes = tributes.filter((t) => t.type === "video");
  const audioTributes = tributes.filter((t) => t.type === "audio");

  return (
    <Paper
      sx={{
        mt: 6,
        borderRadius: 3,
        padding:2,
        
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
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3,
      p: 2,
    }}
  >
    {/* Heading */}
    <Typography
      variant="h4"
      fontWeight={700}
      sx={{
        color: "#0b2c52",
        mb: 1,
        textAlign: "center",
      }}
    >
      Honoring the Life of {memorial.firstName} {memorial.middleName} {memorial.lastName}
    </Typography>

    {/* PERSONAL INFO CARD */}
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "#f7f9fc",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Personal Details
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography>
          <strong>Full Name:</strong> {memorial.firstName}{" "}
          {memorial.middleName || ""} {memorial.lastName}
        </Typography>

        <Typography>
          <strong>Gender:</strong> {memorial.gender || "—"}
        </Typography>

        <Typography>
          <strong>Relationship to You:</strong>{" "}
          {memorial.relationshipOther || memorial.relationship}
        </Typography>

        <Typography>
          <strong>Role in Family / Society:</strong>{" "}
          {memorial.designationOther || memorial.designation}
        </Typography>

        {memorial.specialDesignation && (
          <Typography>
            <strong>Special Honor:</strong> {memorial.specialDesignation}
          </Typography>
        )}
      </Box>
    </Paper>

    {/* BIRTH INFO CARD */}
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "#fef6f7",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Birth Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography>
          <strong>Date of Birth:</strong> {memorial.bornDay}-{memorial.bornMonth}-{memorial.bornYear}
        </Typography>

        <Typography>
          <strong>Birthplace:</strong>{" "}
          {memorial.bornCity || "—"}, {memorial.bornState || "—"}, {memorial.bornCountry || "—"}
        </Typography>
      </Box>
    </Paper>

    {/* PASSING INFO CARD */}
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "#f5f7ff",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        In Loving Memory
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography>
          <strong>Date of Passing:</strong> {memorial.passedDay}-{memorial.passedMonth}-{memorial.passedYear}
        </Typography>

        <Typography>
          <strong>Place:</strong>{" "}
          {memorial.passedCity || "—"}, {memorial.passedState || "—"}, {memorial.passedCountry || "—"}
        </Typography>
      </Box>
    </Paper>

    {/* LEGACY CARD */}
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "#fff8e8",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Their Legacy
      </Typography>

      <Typography sx={{ lineHeight: 1.7 }}>
        {memorial.moreDetails ||
          "Their journey, kindness, and memories continue to live in the hearts they touched."}
      </Typography>
    </Paper>

    {/* WEBSITE + PLAN INFO */}
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 4,
        background: "#f4fafb",
      }}
    >
      <Typography>
        <strong>Memorial Page:</strong> {memorial.website}
      </Typography>

      <Typography>
        <strong>Plan:</strong> {memorial.plan}
      </Typography>

      <Typography>
        <strong>Privacy:</strong>{" "}
        {memorial.privacy === "public" ? "Public – Anybody can view" : "Private – Only allowed viewers"}
      </Typography>
    </Paper>
  </Box>
</TabPanel>


      {/* MESSAGES */}
      <TabPanel value={tab} index={1}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "#0b2c52", mb: 3 }}
        >
          Heartfelt Messages
        </Typography>

        {textTributes.length === 0 && (
          <Typography color="text.secondary">
            No messages shared yet — be the first to honor their memory.
          </Typography>
        )}

        {textTributes.map((t) => (
          <Paper
            key={t._id}
            sx={{
              p: 2.5,
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#fffaf3",
              borderLeft: "4px solid #b68b43",
            }}
          >
            <Typography fontWeight={700} sx={{ color: "#0b2c52" }}>
              {t.userId?.name || "Anonymous"}
            </Typography>

            <Typography sx={{ mt: 1, fontSize: 16 }}>{t.text}</Typography>

            <Typography
              variant="caption"
              sx={{ mt: 1, display: "block", color: "#795c34" }}
            >
              {new Date(t.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </TabPanel>

      {/* PHOTOS */}
      <TabPanel value={tab} index={2}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "#0b2c52", mb: 3 }}
        >
          Photo Memories
        </Typography>

        {photoTributes.length === 0 && (
          <Typography color="text.secondary">No photos added yet.</Typography>
        )}

        <Grid container spacing={2}>
          {photoTributes.map((t) => (
            <Grid item xs={6} sm={4} md={3} key={t._id}>
              <img
                src={t.mediaUrl}
                alt="tribute"
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

      {/* AUDIO */}
      <TabPanel value={tab} index={4}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "#0b2c52", mb: 3 }}
        >
          Audio Messages
        </Typography>

        {audioTributes.length === 0 && (
          <Typography color="text.secondary">No audio tributes yet.</Typography>
        )}

        {audioTributes.map((t) => (
          <Paper
            key={t._id}
            sx={{
              p: 2.5,
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#fff8ea",
              borderLeft: "4px solid #b68b43",
            }}
          >
            <Typography fontWeight={700} sx={{ color: "#0b2c52" }}>
              {t.userId?.name || "Anonymous"}
            </Typography>

            <audio controls style={{ width: "100%", marginTop: 10 }}>
              <source src={t.mediaUrl} />
            </audio>

            <Typography
              variant="caption"
              sx={{ mt: 1, display: "block", color: "#795c34" }}
            >
              {new Date(t.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </TabPanel>
    </Paper>
  );
};

export default MemorialTabs;
