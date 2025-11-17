// src/components/ObituaryList.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import { CalendarMonth, Newspaper, Group } from "@mui/icons-material";

const mockObituaries = [
  {
    id: 1,
    name: "Violet ADAMS",
    date: "Published 10/13/2025",
    details:
      "ADAMS Violet (Gowkley Moss Farm, Penicuik) peacefully passed at home. Beloved wife of Bryson. Service at Mortonhall Crematorium on Oct 20, 1pm.",
    source: "Edinburgh News",
  },
  {
    id: 2,
    name: "John ROBERTSON",
    date: "Published 10/12/2025",
    details:
      "ROBERTSON John, peacefully on Oct 5, aged 82 years. Beloved husband and father. Funeral service on Oct 18, 11am, St. Andrew’s Church.",
    source: "The Scotsman",
  },
];

const ObituaryList: React.FC = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight={700} color="#1a1a1a" mb={3}>
        Recent Results ({mockObituaries.length.toLocaleString()})
      </Typography>

      <Stack spacing={3}>
        {mockObituaries.map((item) => (
          <Card
            key={item.id}
            sx={{
              borderRadius: 3,
              backgroundColor: "#fbf8f3",
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                gutterBottom
              >
                {item.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <CalendarMonth fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {item.date}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {item.details}{" "}
                <Typography
                  component="span"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Read More
                </Typography>
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
              >
                Published In
              </Typography>
              <Stack direction="row" spacing={4} mt={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Newspaper fontSize="small" />
                  <Typography variant="body2">{item.source}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Group fontSize="small" />
                  <Typography variant="body2">
                    Last Name “{item.name.split(" ").pop()}”
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default ObituaryList;
