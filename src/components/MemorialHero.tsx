import {
  Box,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axiosInstance from "../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";

interface Props {
  memorial: any;
}

const MemorialHero = ({ memorial }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  // Preview images (before upload)
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // API upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return axiosInstance.post(
        `/memorials/${memorial._id}/upload-image`,
        formData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["memorial", memorial.website]);
      setHeroPreview(null);
      setProfilePreview(null);
    },
  });

  const handleUpload = (file: File, type: "hero" | "profile") => {
    const form = new FormData();
    form.append("file", file);
    form.append("type", type);
    uploadMutation.mutate(form);
  };

  const handlePreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "hero" | "profile"
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    const previewURL = URL.createObjectURL(file);

    if (type === "hero") setHeroPreview(previewURL);
    else setProfilePreview(previewURL);

    handleUpload(file, type);
  };

  return (
    <Box
      sx={{
        height: 340,
        borderRadius: 3,
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${
          heroPreview ||
          memorial.heroImage ||
          "https://cdn.pixabay.com/photo/2024/09/19/21/07/night-sky-9059825_1280.jpg"
        })`,
        display: "flex",
        alignItems: "flex-end",
        p: 3,
        color: "white",
      }}
    >
      {/* Upload Hero Image */}
      {user && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
            }}
            onClick={() => heroInputRef.current?.click()}
          >
            <CameraAltIcon />
          </IconButton>

          <input
            ref={heroInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handlePreview(e, "hero")}
          />
        </>
      )}

      {/* Profile picture */}
      <Box sx={{ position: "absolute", right: 30, bottom: -50 }}>
        <Avatar
          src={
            profilePreview ||
            memorial.profileImage ||
            "https://cdn.pixabay.com/photo/2018/11/10/18/30/all-saints-3807221_1280.jpg"
          }
          sx={{
            width: 130,
            height: 130,
            border: "4px solid white",
            bgcolor: "#eee",
          }}
        />

        {/* Upload Profile Picture */}
        {user && (
          <>
            <IconButton
              sx={{
                mt: -4,
                ml: 14,
                bgcolor: "white",
                boxShadow: 2,
              }}
              onClick={() => profileInputRef.current?.click()}
            >
              <CameraAltIcon />
            </IconButton>

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handlePreview(e, "profile")}
            />
          </>
        )}
      </Box>

      {/* Name Section */}
      <Box sx={{ pb: 1 }}>
        <Typography variant="h3" fontWeight={700}>
          {memorial.firstName} {memorial.middleName || ""}{" "}
          {memorial.lastName}
        </Typography>

        <Typography sx={{ opacity: 0.9, fontSize: 18 }}>
          Forever in our hearts
        </Typography>
      </Box>
    </Box>
  );
};

export default MemorialHero;
