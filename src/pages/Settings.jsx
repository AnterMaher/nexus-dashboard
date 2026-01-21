import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, useTheme, Paper } from "@mui/material";
import { Person, Notifications, Security, Palette } from "@mui/icons-material";

// Components (سننشئها في الخطوة القادمة)
import Profile from "../components/Settings/Profile";
import Notification from "../components/Settings/Notifications";
import SecuritySettings from "../components/Settings/Security";
import Appearance from "../components/Settings/Appearance";

const Settings = ({ toggleTheme, mode }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences.
        </Typography>
      </Box>

      {/* Tabs Container */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          mb: 4,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden", // عشان الحواف الدائرية
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable" // مهم للموبايل عشان لو التبويبات كترت
          scrollButtons="auto"
          aria-label="settings tabs"
          fullWidth
          sx={{
            "& .MuiTabs-indicator": {
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              minHeight: 60,
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
                bgcolor: theme.palette.action.selected, // خلفية خفيفة للنشط
              },
            },
          }}
        >
          <Tab icon={<Person />} iconPosition="start" label="Profile" />
          <Tab
            icon={<Notifications />}
            iconPosition="start"
            label="Notifications"
          />
          <Tab icon={<Security />} iconPosition="start" label="Security" />
          <Tab icon={<Palette />} iconPosition="start" label="Appearance" />
        </Tabs>
      </Paper>

      {/* Content Section */}
      <Box sx={{ minHeight: 400 }}>
        {value === 0 && <Profile />}
        {value === 1 && <Notification />}
        {value === 2 && <SecuritySettings />}
        {value === 3 && <Appearance toggleTheme={toggleTheme} mode={mode} />}
      </Box>
    </Box>
  );
};

export default Settings;
