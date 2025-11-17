// src/components/TributeCard.tsx
import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Tribute } from "./TributeForm";

interface TributeCardProps {
  tribute: Tribute;
}

export const TributeCard: React.FC<TributeCardProps> = ({ tribute }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      {tribute.image && (
        <CardMedia
          component="img"
          height="200"
          image={tribute.image}
          alt={tribute.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" color="primary">{tribute.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {tribute.relation && `Relation: ${tribute.relation}`}
        </Typography>
        <Typography variant="body1" sx={{ my: 1 }}>{tribute.message}</Typography>
        <Typography variant="caption" color="text.secondary">
          {tribute.dateOfPassing && `Date of Passing: ${tribute.dateOfPassing}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
