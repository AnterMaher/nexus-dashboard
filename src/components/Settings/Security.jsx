import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Grid,
} from "@mui/material";

const SecuritySettings = () => {
  // 1. مخزن للبيانات (State)
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // مخزن لرسائل الخطأ أو النجاح
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 2. دالة التعامل مع الكتابة
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    // تصفير الرسائل أول ما المستخدم يبدأ يكتب تاني
    if (error) setError("");
    if (success) setSuccess("");
  };

  // 3. دالة الحفظ والتحقق
  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق الأول: هل الحقول فاضية؟
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setError("All fields are required.");
      return;
    }

    // التحقق الثاني: هل الباسورد الجديد قصير؟
    if (passwords.new.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    // التحقق الثالث: هل الباسورد الجديد مطابق للتأكيد؟
    if (passwords.new !== passwords.confirm) {
      setError("Passwords do not match!");
      return;
    }

    // لو وصلنا هنا يبقى كله تمام ✅
    // (في الحقيقة هنا بنبعت API للسيرفر)
    console.log("Password Changed Successfully");

    setSuccess("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" }); // تفريغ الخانات
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, borderRadius: 2 }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Change Password
      </Typography>

      {/* عرض رسائل الخطأ أو النجاح إن وجدت */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Box>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Current Password"
              name="current"
              type="password"
              value={passwords.current}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="New Password"
              name="new"
              type="password"
              value={passwords.new}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "right" }}>
            <Button variant="contained" type="submit" size="large">
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SecuritySettings;
