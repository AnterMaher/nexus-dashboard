import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
// icon box

const StatCard = ({ title, value, icon, iconColor }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        p: 3,
        mb: 3,
        width: "100%",
        borderRadius: "12px",
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 0, fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 0, color: "text.primary" }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
