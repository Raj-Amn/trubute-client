import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import theme from "../theme";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
  };

  const handleProfileClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  // >>> Detect current page
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  // >>> Decide button text + route
  const buttonText = isLoginPage ? "Signup" : "Login";
  const buttonRoute = isLoginPage ? "/signup" : "/login";

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography
          variant="h5"
          onClick={() => navigate("/")}
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Trubute<span style={{ color: "#1565c0" }}>.com</span>
        </Typography>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search obituaries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                "& fieldset": { border: "none" },
                px: 2,
              },
            }}
            sx={{
              flexGrow: 1,
            }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "#fff",
              borderRadius: 0,
              px: 2.5,
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            <Search />
          </IconButton>
        </Box>

        {/* Profile / Auth Button */}
        {user ? (
          <>
            <IconButton onClick={handleProfileClick}>
              <Avatar sx={{ bgcolor: "#1565c0" }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <ProfileMenu anchorEl={anchorEl} handleClose={handleCloseMenu} />
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate(buttonRoute)}
            sx={{ textTransform: "none", ml: 2 }}
            color="primary"
          >
            {buttonText}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
