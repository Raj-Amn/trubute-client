import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "80vh" }}>{children}</Box>
      <Footer />
    </>
  );
};

export default MainLayout;
