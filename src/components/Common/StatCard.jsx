import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
// import { shape } from "../Theme/theme";
const StatCard = ({
  title,
  value,
  percentage,
  isIncrease,
  icon,
  iconColor,
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderRadius: "12px",
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* الجزء الأيسر: البيانات */}
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 1, color: "text.primary" }}
        >
          {value}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* سهم طالع أو نازل حسب الحالة */}
          {isIncrease ? (
            <TrendingUp sx={{ color: "#10B981", fontSize: "1.2rem" }} /> // أخضر
          ) : (
            <TrendingDown sx={{ color: "#EF4444", fontSize: "1.2rem" }} /> // أحمر
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

          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      </Box>

      {/* الجزء الأيمن: الأيقونة الملونة */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          bgcolor: iconColor,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
    </Paper>
  );
};

export default StatCard;
