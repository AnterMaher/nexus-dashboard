import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import StatCard from "../components/Analytics/StatCardAnalytics";
import TrafficOverview from "../components/Analytics/TrafficOverview";
import DeviceDistribution from "../components/Analytics/DeviceDistribution";
import TopPages from "../components/Analytics/TopPages";
const Analytics = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "text.primary", mb: 1 }}
        >
          Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your website performance and user engagement.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Page Load Time"
            value="1.2s"
            percentage="15%"
            isIncrease={true}
            iconColor="#6366f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Server Response"
            value="245ms"
            percentage="8%"
            isIncrease={false}
            iconColor="#6366f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Bounce Rate"
            value="32%"
            percentage="3%"
            isIncrease={false}
            iconColor="#6366f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Avg. Session"
            value="4.5 min"
            percentage="3%"
            isIncrease={true}
            iconColor="#6366f1"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <TrafficOverview />
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
            <DeviceDistribution />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
            <TopPages />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Analytics;
