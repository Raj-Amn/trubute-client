// src/components/CarouselCards.tsx
import React from "react";
import Slider from "react-slick";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const tributes = [
  {
    id: 1,
    name: "John Doe",
    message: "Forever in our hearts 💖",
    image: "https://cdn.pixabay.com/photo/2022/04/04/12/42/old-man-7111157_1280.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "A life beautifully lived deserves to be beautifully remembered.",
    image: "https://cdn.pixabay.com/photo/2019/08/09/20/52/old-man-4395870_1280.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    message: "Your memory will forever be our guiding light.",
    image: "https://cdn.pixabay.com/photo/2017/03/28/12/46/man-2182083_1280.jpg",
  },
  {
    id: 4,
    name: "Sarah Williams",
    message: "Gone but never forgotten, always in our hearts.",
    image: "https://cdn.pixabay.com/photo/2017/11/03/22/43/galatasaray-2915917_1280.jpg",
  },
];

const ArrowButton = ({ direction, onClick }: any) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        [direction === "left" ? "left" : "right"]: -20,
        transform: "translateY(-50%)",
        backgroundColor: "white",
        boxShadow: theme.shadows[3],
        "&:hover": { backgroundColor: theme.palette.grey[100] },
        zIndex: 10,
      }}
    >
      {direction === "left" ? <ArrowBackIos /> : <ArrowForwardIos />}
    </IconButton>
  );
};

export default function CarouselCards() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ position: "relative", mt: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        color="primary"
        fontWeight={700}
        mb={3}
      >
        Featured Tributes
      </Typography>

      <Slider {...settings}>
        {tributes.map((item) => (
          <Box key={item.id} px={1}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 4,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{ height: 260, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" color="primary" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.message}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
