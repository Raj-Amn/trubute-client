import { Paper, Typography, Box } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
  bg?: string;
}

const AboutSectionCard = ({ title, children, bg = "#f7f9fc" }: Props) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        background: bg,
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default AboutSectionCard;
