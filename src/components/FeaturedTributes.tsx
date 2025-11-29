import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const FeaturedTributes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-tributes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/memorials/featured/list");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {data?.map((item: any) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="160"
              image={
                item.profile ||
                "https://cdn.pixabay.com/photo/2018/11/10/18/30/all-saints-3807221_1280.jpg"
              }
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                {item.name}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {item.description?.slice(0, 60)}...
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                🏠 {item.address}
              </Typography>

              {item.latestTribute && (
                <Typography
                  variant="body2"
                  sx={{ mt: 1, fontWeight: 500, color: "primary.main" }}
                >
                  “{item.latestTribute.content.slice(0, 50)}...”
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedTributes;
