import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  MoreHoriz,
  VisibilityOutlined,
  EmailOutlined,
  DeleteOutline,
  Close,
  ShoppingBag,
  AttachMoney,
  CalendarToday,
  Send as SendIcon,
} from "@mui/icons-material";
import emailjs from "@emailjs/browser"; // مكتبة الإيميل
import { useCustomers } from "../../context/datacustomers";

// دالة مساعدة لتلوين الحالة
const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  return s === "active" ? "success" : "default";
};

export default function CustomerActions({ customer }) {
  // --- 1. States (المتغيرات) ---
  const [anchorEl, setAnchorEl] = useState(null); // للقائمة
  const [detailsOpen, setDetailsOpen] = useState(false); // لمودال التفاصيل
  const [emailOpen, setEmailOpen] = useState(false); // لمودال الإيميل

  // بيانات الإيميل
  const [emailData, setEmailData] = useState({ subject: "", message: "" });
  const [isSending, setIsSending] = useState(false); // حالة التحميل

  const { deleteItem } = useCustomers();
  const openMenu = Boolean(anchorEl);

  // --- 2. Handlers (الدوال) ---

  // فتح وقفل القائمة
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // فتح التفاصيل
  const handleViewDetails = () => {
    handleMenuClose();
    setDetailsOpen(true);
  };

  // فتح الإيميل
  const handleOpenEmail = () => {
    setDetailsOpen(false); // لو التفاصيل مفتوحة اقفلها
    handleMenuClose(); // لو القائمة مفتوحة اقفلها
    setEmailOpen(true); // افتح الإيميل
  };

  // --- 3. دالة إرسال الإيميل (EmailJS) ---
  const handleSendEmail = (e) => {
    if (e) e.preventDefault();

    // التحقق من البيانات
    if (!emailData.subject || !emailData.message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSending(true); // شغل التحميل

    // تجهيز البيانات
    const templateParams = {
      to_name: customer.name,
      to_email: customer.email,
      subject: emailData.subject,
      message: emailData.message,
    };

    // الإرسال بالمفاتيح الخاصة بك
    emailjs
      .send(
        "service_60xgyjh", // Service ID
        "template_581gjpp", // Template ID
        templateParams,
        "VJsY-b4hblNJ4l8fN" // Public Key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Email sent successfully! 🚀");

        // اغلاق وتنظيف
        setEmailOpen(false);
        setEmailData({ subject: "", message: "" });
      })
      .catch((err) => {
        console.log("FAILED...", err);
        alert("Failed to send email. Please try again.");
      })
      .finally(() => {
        setIsSending(false); // وقف التحميل
      });
  };

  return (
    <>
      {/* ================= 1. زرار الثلاث نقط والقائمة ================= */}
      <IconButton
        onClick={handleMenuClick}
        size="small"
        sx={{ color: "text.secondary" }}
      >
        <MoreHoriz />
      </IconButton>

      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <VisibilityOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenEmail}>
          <ListItemIcon>
            <EmailOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Email</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            deleteItem(customer.id);
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteOutline fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* ================= 2. مودال التفاصيل (Details Modal) ================= */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Customer Details
          <IconButton onClick={() => setDetailsOpen(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4, mt: 1 }}>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "primary.main",
                fontSize: 28,
                mr: 2,
              }}
            >
              {customer.initials}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {customer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {customer.email}
              </Typography>
              <Chip
                label={customer.status}
                color={getStatusColor(customer.status)}
                size="small"
                sx={{ borderRadius: "6px", fontWeight: 600 }}
                variant="outlined"
              />
            </Box>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "#f5f7fa",
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <ShoppingBag color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {customer.orders}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Orders
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "#f5f7fa",
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <AttachMoney color="success" sx={{ mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  ${customer.totalSpent}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Spent
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "#f5f7fa",
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <CalendarToday color="warning" sx={{ mb: 1 }} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: "0.9rem", mt: 0.5 }}
                >
                  {customer.joinDate}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Joined
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            startIcon={<EmailOutlined />}
            onClick={handleOpenEmail}
            fullWidth
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= 3. مودال الإيميل (Send Email Modal) ================= */}
      <Dialog
        open={emailOpen}
        onClose={() => !isSending && setEmailOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              mb: 2,
              mt: 1,
              p: 2,
              bgcolor: "background.default",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 30, height: 30, mr: 1, fontSize: 12 }}>
              {customer.initials}
            </Avatar>
            <Typography variant="body2">
              To: <strong>{customer.name}</strong> ({customer.email})
            </Typography>
          </Box>

          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            variant="outlined"
            value={emailData.subject}
            onChange={(e) =>
              setEmailData({ ...emailData, subject: e.target.value })
            }
            disabled={isSending}
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mt: 2 }}
            value={emailData.message}
            onChange={(e) =>
              setEmailData({ ...emailData, message: e.target.value })
            }
            disabled={isSending}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setEmailOpen(false)}
            color="inherit"
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendEmail}
            variant="contained"
            endIcon={isSending ? null : <SendIcon />}
            disabled={isSending}
          >
            {isSending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Email"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
