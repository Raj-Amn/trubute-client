// src/components/TributeForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface TributeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const MakeWebTrubuteForm: React.FC<TributeFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    relationship: "",
    designation: "",
    specialDesignation: "",
    details: "",
    memorialUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: "primary.main" }}>
        Create a Tribute
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            This memorial is dedicated to:
          </Typography>

          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="Relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                placeholder="e.g. Father, Friend"
              />
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Doctor, Engineer"
              />
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="Special Designation (if applies)"
                name="specialDesignation"
                value={formData.specialDesignation}
                onChange={handleChange}
              />
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="More details (optional)"
                name="details"
                multiline
                minRows={3}
                value={formData.details}
                onChange={handleChange}
              />
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="Memorial Web Address"
                name="memorialUrl"
                value={formData.memorialUrl}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mr: 1 }}
                    >
                      https://
                    </Typography>
                  ),
                  endAdornment: (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      .forevermissed.com
                    </Typography>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Create Tribute
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeWebTrubuteForm;
