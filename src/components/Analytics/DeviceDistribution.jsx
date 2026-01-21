import React from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { LaptopMac, Smartphone, TabletMac } from "@mui/icons-material";

const data = [
  { name: "Desktop", value: 55, icon: <LaptopMac fontSize="small" /> },
  { name: "Mobile", value: 35, icon: <Smartphone fontSize="small" /> },
  { name: "Tablet", value: 10, icon: <TabletMac fontSize="small" /> },
];

const DeviceDistribution = () => {
  const theme = useTheme();

  // تحديد الألوان بناءً على الثيم الخاص بك
  const COLORS = [
    theme.palette.primary.main, // لون الديسكتوب (الأزرق)
    theme.palette.secondary.main || "#8884d8", // لون الموبايل
    theme.palette.warning.main, // لون التابلت
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Device Distribution
      </Typography>

      <Box sx={{ width: "100%", height: 250, position: "relative" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60} // عشان يبقى شكله Donut (مفرغ)
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "8px",
                boxShadow: theme.shadows[3],
                border: "none",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* النسبة المئوية في المنتصف */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            55%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Desktop
          </Typography>
        </Box>
      </Box>

      {/* مفتاح الرسم (Legend) المخصص */}
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
        {data.map((item, index) => (
          <Box key={item.name} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 0.5,
                color: COLORS[index],
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="body2" fontWeight="bold">
              {item.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DeviceDistribution;
