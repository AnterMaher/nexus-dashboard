import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
// import { shape } from "../Theme/theme";
const StatCard = ({ title, value, percentage, isIncrease, iconColor }) => {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "12px",
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mb: 1, color: "text.primary" }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {isIncrease ? (
              <TrendingUp sx={{ color: "#10B981", fontSize: "1.2rem" }} />
            ) : (
              <TrendingDown sx={{ color: "#EF4444", fontSize: "1.2rem" }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: isIncrease ? "#10B981" : "#EF4444",
                fontWeight: "bold",
              }}
            >
              {percentage}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default StatCard;
