import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import MemorialHero from "../components/MemorialHero";
import MemorialTabs from "../components/MemorialTabs";

// Load memorial + tributes
const fetchMemorial = async (website: string) => {
  const res = await axiosInstance.get(`/memorials/${website}`);
  return res.data.memorial;
};

const MemorialFullPage = () => {
  const { website } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [tributeText, setTributeText] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [type, setType] = useState<"text" | "photo" | "video" | "audio">(
    "text"
  );

  const memorialQuery = useQuery({
    queryKey: ["memorial", website],
    queryFn: () => fetchMemorial(website!),
  });

  // Add tribute
  const addTributeMutation = useMutation({
    mutationFn: async () => {
      let mediaUrl = null;

      if (mediaFile) {
        const form = new FormData();
        form.append("file", mediaFile);

        const upload = await axiosInstance.post("/upload", form);
        mediaUrl = upload.data.url;

        // detect type
        const fileType = mediaFile.type.startsWith("video")
          ? "video"
          : mediaFile.type.startsWith("audio")
          ? "audio"
          : "photo";

        setType(fileType);
      }

      return axiosInstance.post(
        `/memorials/${memorialQuery.data._id}/tribute`,
        {
          type,
          text: tributeText,
          mediaUrl,
        }
      );
    },
    onSuccess: () => {
      setTributeText("");
      setMediaFile(null);
      queryClient.invalidateQueries(["memorial", website]);
    },
  });

  if (memorialQuery.isLoading) return <CircularProgress sx={{ mt: 10 }} />;

  const memorial = memorialQuery.data;

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <MemorialHero memorial={memorial} />
        <MemorialTabs memorial={memorial} tributes={memorial?.tributes || []} />

        <Typography textAlign="center" sx={{ color: "gray", mt: 1 }}>
          Created on {new Date(memorial?.createdAt).toLocaleDateString()}
        </Typography>

      </Paper>
    </Box>
  );
};

export default MemorialFullPage;
