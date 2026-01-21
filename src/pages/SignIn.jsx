import { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // 1. استدعاء هوك التنقل
import { useAuth } from "../context/authcontext"; // 2. استدعاء الأوث

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // هات دالة اللوجين

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // بننادي على دالة اللوجين
    const result = login(user.email, user.password);

    if (result.success) {
      // ✅ لو البيانات صح، روح للداشبورد
      navigate("/");
    } else {
      // ❌ لو غلط، طلع رسالة
      alert("Login failed! Password needs to be 6+ chars.");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleOnSubmit}
      sx={{
        width: "100%",
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        flexDirection="column"
        mb={4}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          N
        </Box>
        <Typography variant="h5" fontWeight="bold" mt={1}>
          Nexus Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to your account
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your credentials to continue
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              onChange={handleOnChange}
              type="email"
              name="email"
              variant="outlined"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Password"
              value={user.password}
              onChange={handleOnChange}
              type="password"
              name="password"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ borderRadius: 1 }}
          >
            Sign In
          </Button>
        </Box>

        <Box display="flex" justifyContent="center">
          <Typography variant="body2">
            Don't have an account?
            <Link to="/signup" component={Link} color="primary">
              <button
                style={{
                  color: "blue",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  marginLeft: "5px",
                }}
              >
                Sign Up
              </button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignIn;
