// src/components/TributeForm.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Stack } from "@mui/material";

export interface Tribute {
  id: number;
  name: string;
  relation: string;
  message: string;
  image?: string;
  dateOfPassing: string;
}

interface TributeFormProps {
  onAddTribute: (tribute: Tribute) => void;
}

export const TributeForm: React.FC<TributeFormProps> = ({ onAddTribute }) => {
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    message: "",
    image: "",
    dateOfPassing: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    const newTribute: Tribute = { id: Date.now(), ...formData };
    onAddTribute(newTribute);
    setFormData({ name: "", relation: "", message: "", image: "", dateOfPassing: "" });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Give a Tribute
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth />
          <TextField label="Relation" name="relation" value={formData.relation} onChange={handleChange} fullWidth />
          <TextField label="Message" name="message" value={formData.message} onChange={handleChange} multiline rows={3} fullWidth />
          <TextField label="Image URL (optional)" name="image" value={formData.image} onChange={handleChange} fullWidth />
          <TextField
            label="Date of Passing"
            name="dateOfPassing"
            type="date"
            value={formData.dateOfPassing}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Tribute
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
