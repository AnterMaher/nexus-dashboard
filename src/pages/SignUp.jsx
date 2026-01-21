import { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    login(user.email, user.password);
    navigate("/");
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
          create your account
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
            Get Started
          </Typography>
          <Typography variant="body2" color="text.secondary">
            create a new account to continue
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={user.name}
              onChange={handleOnChange}
              type="text"
              name="name"
              variant="outlined"
            />
          </Grid>
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
          <Grid size={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              value={user.confirmPassword}
              onChange={handleOnChange}
              type="password"
              name="confirmPassword"
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
            Create Account
          </Button>
        </Box>

        <Box display="flex" justifyContent="center">
          <Typography variant="body2">
            Already have an account?
            <Link to="/signin" component={Link} color="primary">
              <button
                type="submit"
                onClick={handleOnSubmit}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  marginLeft: "5px",
                }}
              >
                Sign In
              </button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignUp;
