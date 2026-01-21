import React from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", visitors: 4000, pageViews: 2400 },
  { name: "Tue", visitors: 3000, pageViews: 1398 },
  { name: "Wed", visitors: 2000, pageViews: 9800 },
  { name: "Thu", visitors: 2780, pageViews: 3908 },
  { name: "Fri", visitors: 1890, pageViews: 4800 },
  { name: "Sat", visitors: 2390, pageViews: 3800 },
  { name: "Sun", visitors: 3490, pageViews: 4300 },
];

const TrafficOverview = () => {
  const theme = useTheme(); // 1. استدعاء ثيم Material UI
  
  // 2. استخدام ألوان الثيم بتاعك
  const primaryColor = theme.palette.primary.main; 
  const secondaryColor = theme.palette.secondary.main || theme.palette.info.main;
  const textColor = theme.palette.text.secondary;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius:1.5,
        height: "400px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper", 
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" >
          Traffic Overview
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height="85%" >
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0  }}>
          
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={secondaryColor} stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 12 }} 
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper, 
              borderRadius: '8px', 
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[3],
              color: theme.palette.text.primary
            }} 
          />

          <Area 
            type="monotone" 
            dataKey="pageViews" 
            stroke={primaryColor} 
            fillOpacity={1} 
            fill="url(#colorPrimary)" 
            strokeWidth={3}
          />
          <Area 
            type="monotone" 
            dataKey="visitors" 
            stroke={secondaryColor} 
            fillOpacity={1} 
            fill="url(#colorSecondary)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default TrafficOverview;