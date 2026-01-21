import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";

const Notifications = () => {
  // 1. حالة الإعدادات (State)
  const [settings, setSettings] = useState({
    email: true,      // افتراضياً شغال
    push: true,       // افتراضياً شغال
    marketing: false, // افتراضياً مطفي
    security: true,
  });

  // حالة لرسالة التنبيه الصغيرة (Snackbar)
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // 2. دالة التغيير (Toggle Handler)
  const handleToggle = (key) => () => {
    // بنعكس القيمة الحالية
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    
    // بنظهر رسالة صغيرة إن التغيير تم حفظه
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Notification Preferences
      </Typography>

      <List>
        {/* Email Notifications */}
        <ListItem>
          <ListItemText
            primary="Email Notifications"
            secondary="Receive emails about your account activity."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.email}
              onChange={handleToggle("email")}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider component="li" />

        {/* Push Notifications */}
        <ListItem>
          <ListItemText
            primary="Push Notifications"
            secondary="Receive real-time push notifications on your device."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.push}
              onChange={handleToggle("push")}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider component="li" />

        {/* Marketing Emails */}
        <ListItem>
          <ListItemText
            primary="Marketing Emails"
            secondary="Receive emails about new features and offers."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.marketing}
              onChange={handleToggle("marketing")}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider component="li" />

        {/* Security Alerts */}
        <ListItem>
          <ListItemText
            primary="Security Alerts"
            secondary="Get notified about login attempts from new devices."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.security}
              onChange={handleToggle("security")}
              color="error" // لون أحمر للأمان
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      {/* رسالة تأكيد بتظهر وتختفي لوحدها */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Settings saved!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Notifications;