// src/pages/NotFound.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box); // ✅ Type-safe motion wrapper for MUI Box

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        textAlign: "center",
        p: 3,
      }}
    >
      {/* Animated icon with proper typing */}
      <MotionBox
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        sx={{ mb: 2 }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 90, color: "primary.main" }} />
      </MotionBox>

      <Typography
        variant="h3"
        fontWeight={700}
        color="primary.main"
        gutterBottom
      >
        Oops! Page Not Found
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ maxWidth: 500, mb: 3 }}
      >
        The page you’re looking for doesn’t exist or may have been moved.
        Let’s get you back on track!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.2,
          textTransform: "none",
          fontSize: "1rem",
        }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
