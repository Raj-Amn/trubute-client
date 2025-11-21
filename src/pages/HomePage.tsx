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
import FeaturedTributes from "../components/FeaturedTributes";

const HomePage: React.FC = () => {
  return (
    <>
      {/* <HeroSection /> */}
      <MemorialForm />
      {/* <FeaturedTributes/> */}
      {/* <ObituaryList /> */}
    </>
  );
};

export default HomePage;
