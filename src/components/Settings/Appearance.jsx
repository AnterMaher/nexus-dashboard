import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  useTheme,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const Appearance = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  // حالة وهمية لتجربة الواجهة (في الواقع ستربطها بالـ Context)

  return (
    <Paper sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Appearance
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Customize the look and feel of your dashboard.
      </Typography>

      {/* 1. Theme Selection (Light / Dark) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          Interface Theme
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select your preferred theme.
        </Typography>
        <Grid container spacing={3}>
          {/* Light Mode Card */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
            <Box
              onClick={() => toggleTheme("light")}
              sx={{
                border:
                  mode === "light"
                    ? `2px solid ${theme.palette.primary.main}`
                    : "1px solid",
                borderColor: mode === "light" ? "primary.main" : "divider",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                opacity: mode === "light" ? 1 : 0.7,
                "&:hover": { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  height: 100,
                  bgcolor: "#f3f4f6",
                  borderRadius: 1,
                  border: "1px solid #e5e7eb",
                  p: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                {/* محاكاة شكل اللايت مود */}
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    bgcolor: "#fff",
                    borderRadius: 0.5,
                  }}
                />
                <Box
                  sx={{
                    width: "90%",
                    height: "100%",
                    bgcolor: "#fff",
                    borderRadius: 0.5,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="500">Light Mode</Typography>
                <Radio checked={mode === "light"} />
              </Box>
            </Box>
          </Grid>

          {/* Dark Mode Card */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
            <Box
              onClick={() => toggleTheme("dark")}
              sx={{
                border:
                  mode === "dark"
                    ? `2px solid ${theme.palette.primary.main}`
                    : "1px solid",
                borderColor: mode === "dark" ? "primary.main" : "divider",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                opacity: mode === "dark" ? 1 : 0.7,
                "&:hover": { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  height: 100,
                  bgcolor: "#111827",
                  borderRadius: 1,
                  border: "1px solid #374151",
                  p: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                {/* محاكاة شكل الدارك مود */}
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    bgcolor: "#1f2937",
                    borderRadius: 0.5,
                  }}
                />
                <Box
                  sx={{
                    width: "90%",
                    height: "100%",
                    bgcolor: "#1f2937",
                    borderRadius: 0.5,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="500">Dark Mode</Typography>
                <Radio checked={mode === "dark"} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Save Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" size="large" sx={{ px: 4 }}>
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default Appearance;
