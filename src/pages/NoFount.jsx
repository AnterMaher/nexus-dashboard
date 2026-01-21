import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NoFount = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary">
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} to="/" size="large">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NoFount;
