import Slider from "react-slick";
import { Box } from "@mui/material";

const MemorialCarousel = ({ children }: { children: React.ReactNode }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};

export default MemorialCarousel;
