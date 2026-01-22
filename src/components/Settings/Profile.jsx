import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { useAuth } from "../../context/authcontext"; // تأكد من المسار

const Profile = () => {
  const { user, updateProfile } = useAuth(); // سحبنا البيانات والدالة

  const [profile, setProfile] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name ? user.name.split(" ")[1] || "" : "",
    email: user?.email || "",
    phone: "01123456789",
    bio: "Frontend Developer passionate about React and UI design.",
    avatarUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatarUrl: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = `${profile.firstName} ${profile.lastName}`;

    updateProfile({
      name: fullName,
      email: profile.email,
    });

    console.log("Profile Saved:", profile);
    alert("Profile Updated Successfully!");
  };

  return (
    <Paper
      sx={{ p: 4, borderRadius: 2 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Profile Information
      </Typography>

      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <Avatar
          src={profile.avatarUrl}
          sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: 30 }}
        >
          {!profile.avatarUrl &&
            `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`}
        </Avatar>

        <Box>
          <Button variant="outlined" component="label" sx={{ mr: 2 }}>
            Upload New
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={1}
          >
            Recommended size: 200x200px
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
         <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            required
            placeholder={profile.firstName}
            value={profile.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            required
            placeholder={profile.lastName}
            value={profile.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            required
            placeholder={profile.email}
            value={profile.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            required
            placeholder={profile.phone}
            value={profile.phone}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end">
        {/* شيلنا onClick من هنا لأنه موجود في الفورم وشيلنا حرف الـ ع الزيادة */}
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;
