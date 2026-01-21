import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  OutlinedInput,
  Avatar,
  IconButton,
  Badge,
  useTheme,
  Menu, // ✅ جديد
  MenuItem, // ✅ جديد
  Divider, // ✅ جديد
} from "@mui/material";
import {
  GridViewRounded,
  BarChartRounded,
  PeopleRounded,
  Inventory2Rounded,
  SettingsRounded,
  SearchRounded,
  NotificationsNoneRounded,
  LightModeRounded,
  DarkModeRounded,
  Menu as MenuIcon,
  HelpOutlineRounded,
  Logout, // ✅ جديد
  Person, // ✅ جديد
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const drawerWidth = 280;

const menuItems = [
  { text: "Dashboard", icon: <GridViewRounded />, path: "/" },
  { text: "Analytics", icon: <BarChartRounded />, path: "/analytics" },
  { text: "Customers", icon: <PeopleRounded />, path: "/customers" },
  { text: "Products", icon: <Inventory2Rounded />, path: "/products" },
  { text: "Settings", icon: <SettingsRounded />, path: "/settings" },
];

const MainLayout = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. سحب البيانات ودالة الخروج
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  // --- States للقوائم المنبثقة ---
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // --- دوال التحكم في قائمة البروفايل ---
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    logout(); // مسح البيانات
    navigate("/signin"); // التوجيه للدخول
  };

  // --- دوال التحكم في قائمة الإشعارات ---
  const handleOpenNotifMenu = (event) => setAnchorElNotif(event.currentTarget);
  const handleCloseNotifMenu = () => setAnchorElNotif(null);

  // محتوى الـ Sidebar
  const drawerContent = (
    <Box
      sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2 }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
          px: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.contrastText",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          N
        </Box>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Nexus
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "primary.contrastText" : "text.secondary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "inherit" : "inherit", minWidth: 40 }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Need Help Box */}
      <Box sx={{ p: 2, borderRadius: 1, bgcolor: "action.hover", mt: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <HelpOutlineRounded fontSize="small" color="primary" />
          <Typography variant="subtitle2">Need help?</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          Check our docs
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* === AppBar === */}
      <AppBar
        position="fixed"
        sx={{
          // 1. الترتيب: عشان يفضل فوق القائمة في الموبايل
          // 1. الترتيب: عشان يفضل فوق القائمة في الموبايل
          zIndex: (theme) => theme.zIndex.drawer + 1,

          // 2. العرض والتحرك:
          // في الموبايل (xs): العرض 100%، والهامش اليسار 0 (يعني لازق في الشمال)
          // في الكمبيوتر (md): العرض يخصم منه عرض القائمة، ويزيح نفسه يمين
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },

          // 3. الألوان والحدود
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            delay: theme.transitions.duration.leavingScreen,
            duration: theme.transitions.duration.enteringScreen,
            delay: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Left Side: Mobile Menu & Search */}
          <Box sx={{ display: "flex", alignItems: "center",justifyContent: "space-between", width: "100%", position: "relative", left: "-1px" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <OutlinedInput
              size="small"
              placeholder="Search anything..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: "text.secondary" }} />
                </InputAdornment>
              }
              sx={{
                width: 300,
                borderRadius: 2,
                display: { xs: "none", sm: "flex" },
              }}
            />
          </Box>

          {/* Right Side: Theme, Notif, Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme}>
              {mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>

            {/* Notification Icon & Menu */}
            <IconButton onClick={handleOpenNotifMenu}>
              <Badge badgeContent={3} color="error">
                <NotificationsNoneRounded />
              </Badge>
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElNotif}
              open={Boolean(anchorElNotif)}
              onClose={handleCloseNotifMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleCloseNotifMenu}>
                <Typography variant="body2">New order received</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNotifMenu}>
                <Typography variant="body2">Server overloaded</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNotifMenu}>
                <Typography variant="body2">New user registered</Typography>
              </MenuItem>
            </Menu>

            {/* User Avatar & Menu */}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={user?.avatarUrl}
                alt={user?.name}
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: "primary.main",
                  fontSize: 18,
                }}
              >
                {/* كود آمن لعرض الحروف الأولى */}
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Avatar>
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {/* عرض اسم المستخدم */}
              <Box sx={{ px: 2, py: 1 }}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ fontWeight: "bold" }}
                >
                  {user?.name || "User"}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user?.email}
                </Typography>
              </Box>
              <Divider />

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/settings");
                }}
              >
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/settings");
                }}
              >
                <ListItemIcon>
                  <SettingsRounded fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <Logout fontSize="small" color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* === Drawers Logic (Sidebar) === */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width: drawerWidth,
              borderRight: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              width: "450px",
              
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* === Main Content === */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
