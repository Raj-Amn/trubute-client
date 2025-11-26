// src/App.tsx
import React from "react";
import {
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import MemorialForm from "../components/MemorialForm";
import ObituaryList from "../components/ObituaryList";
import CarouselCards from "../components/CarouselCards";

const HomePage: React.FC = () => {
  return (
    <>
      {/* <HeroSection /> */}
      <MemorialForm />
      <ObituaryList />
      {/* ------------------ HERO SECTION ------------------ */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Remember and Honor Loved Ones
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Search obituaries, create tributes, and celebrate cherished lives.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ borderRadius: 3 }}
          >
            Browse Tributes
          </Button>
        </Container>
      </Box>

      {/* ------------------ FEATURED TRIBUTES (CAROUSEL) ------------------ */}

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight={600}>
          Featured Tributes
        </Typography>
        <CarouselCards />
      </Container>

      {/* ------------------ ABOUT SECTION ------------------ */}
      <Box sx={{ backgroundColor: "#f8f9fa", py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            color="primary"
            fontWeight={700}
            mb={2}
          >
            About Trubute.com
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Trubute.com is the largest online obituary and memorial platform,
            helping families share tributes and preserve cherished memories.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
