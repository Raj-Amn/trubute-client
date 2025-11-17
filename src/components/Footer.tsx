import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ bgcolor: "#0d47a1", color: "#fff", py: 3, textAlign: "center" }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} Trubute.com — All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
