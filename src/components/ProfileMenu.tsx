import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Popover,
  Divider,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const ProfileMenu = ({ anchorEl, handleClose }: any) => {
  const open = Boolean(anchorEl);
  const { user, logout } = useAuth();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: 1 }}
    >
      <Box sx={{ p: 2, minWidth: 220 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

export default ProfileMenu;
