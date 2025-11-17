// src/components/HeroSection.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { Search, Tune } from "@mui/icons-material";

const HeroSection: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${firstName} ${lastName}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#efe7d9",
        py: { xs: 8, md: 10 },
        textAlign: "center",
        borderBottom: "1px solid #e0d7c5",
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          color="#1a1a1a"
          mb={5}
          fontFamily="'Merriweather', serif"
        >
          Find an Obituary
        </Typography>

        {/* Search Bar */}
        <Paper
          component="form"
          onSubmit={handleSearch}
          elevation={1}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 50,
            overflow: "hidden",
            mb: 4,
            mx: "auto",
            maxWidth: "900px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <TextField
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              "& fieldset": { border: "none" },
              px: 2,
            }}
          />
          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ddd" }} />
          <TextField
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              "& fieldset": { border: "none" },
              px: 2,
            }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#1e293b",
              color: "#fff",
              borderRadius: "50%",
              m: 1.5,
              width: 45,
              height: 45,
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            <Search />
          </IconButton>
        </Paper>

        {/* Filter Buttons */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ flexWrap: "wrap" }}
        >
          {["Publish Date", "Result Type", "Location", "Newspaper"].map(
            (label) => (
              <Grid  key={label}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1e293b",
                    borderColor: "#e0e0e0",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      borderColor: "#ccc",
                    },
                  }}
                >
                  {label}
                </Button>
              </Grid>
            )
          )}
          <Grid >
            <Button
              variant="outlined"
              startIcon={<Tune />}
              sx={{
                borderRadius: 50,
                px: 3,
                py: 1,
                fontWeight: 500,
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#1e293b",
                borderColor: "#e0e0e0",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  borderColor: "#ccc",
                },
              }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
