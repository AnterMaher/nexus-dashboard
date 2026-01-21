import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  AttachMoney,
  People,
  ShoppingCart,
  ShowChart,
  Inventory2,
} from "@mui/icons-material";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import StatCard from "../components/Dashboard/StatCardDashboard";
import RecentOrdersTable from "../components/Dashboard/RecentOrdersTable";

// data for bar chart
import { useCustomers } from "../context/datacustomers";

import { useProducts } from "../context/dataproducts";

const dataset = [
  { rev: 4000, exp: 2400, month: "Jan" },
  { rev: 3000, exp: 1398, month: "Feb" },
  { rev: 5000, exp: 3800, month: "Mar" },
  { rev: 2780, exp: 3908, month: "Apr" },
  { rev: 1890, exp: 4800, month: "May" },
  { rev: 2390, exp: 3800, month: "Jun" },
  { rev: 2390, exp: 3800, month: "Jul" },
  { rev: 2390, exp: 3800, month: "Aug" },
  { rev: 2390, exp: 3800, month: "Sep" },
  { rev: 2390, exp: 3800, month: "Oct" },
  { rev: 2390, exp: 3800, month: "Nov" },
  { rev: 2390, exp: 3800, month: "Dec" },
];

const data = [
  { id: 0, value: 400, label: "18-24", color: "#6366f1" },
  { id: 1, value: 300, label: "25-34", color: "#10b981" },
  { id: 2, value: 200, label: "35-44", color: "#f59e0b" },
  { id: 3, value: 150, label: "45-54", color: "#3b82f6" },
  { id: 4, value: 100, label: "55+", color: "#ef4444" },
];

const ordersData = [
  {
    id: "#1234",
    user: "John Doe",
    date: "2025-01-10",
    amount: 120.0,
    status: "Completed",
  }, // شلنا علامة $ عشان نعرف نجمع
  {
    id: "#1235",
    user: "Sarah Smith",
    date: "2025-01-11",
    amount: 85.5,
    status: "Pending",
  },
  {
    id: "#1236",
    user: "Michael Brown",
    date: "2025-01-12",
    amount: 300.0,
    status: "Cancelled",
  },
  {
    id: "#1237",
    user: "Emily Davis",
    date: "2025-01-13",
    amount: 45.0,
    status: "Completed",
  },
  {
    id: "#1238",
    user: "David Wilson",
    date: "2025-01-14",
    amount: 150.2,
    status: "Completed",
  },
];

const Dashboard = () => {
  const { customersData } = useCustomers();

  const { products } = useProducts();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "text.primary", mb: 1 }}
        >
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your business.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* 1 */}
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Total Revenue"
            value={ordersData.reduce((total, order) => total + order.amount, 0)}
            percentage={
              ordersData.reduce((total, order) => total + order.amount, 0) /
              ordersData.length
            }
            isIncrease={true}
            icon={<AttachMoney />}
            iconColor="#6366f1"
          />
        </Grid>
        {/* 2 */}
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Total Users"
            value={customersData.length} // هنا الرقم 150
            percentage={customersData.length / ordersData.length}
            isIncrease={true}
            icon={<People />}
            iconColor="#6366f1"
          />
        </Grid>
        {/* 3 */}
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Total Products"
            value={products.length} // <-- الرقم ده حقيقي من المخزن
            percentage={products.length / customersData.length}
            isIncrease={true}
            icon={<Inventory2 />} // أيقونة المخزن
            iconColor="#6366f1"
          />
        </Grid>
        {/* 4 */}
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <StatCard
            title="Conversion Rate"
            value={products.reduce(
              (total, product) => total + product.price,
              0,
            )} // النسبة المئوية بتكون نص مش طول مصفوفة
            percentage={
              products.reduce((total, product) => total + product.price, 0) /
              products.length
            }
            isIncrease={true}
            icon={<ShowChart />}
            iconColor="#6366f1"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Box
            sx={{
              mt: 2,
              padding: "15px",
              borderRadius: "12px",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "text.primary", mb: 1 }}
            >
              Revenue Overview
            </Typography>
            <BarChart
              dataset={dataset}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "month",
                  categoryGapRatio: 0.4,
                  barGapRatio: 0.2,
                },
              ]}
              series={[
                { dataKey: "rev", label: "Revenue", color: "#6366f1" },
                { dataKey: "exp", label: "Expenses", color: "#334155" },
              ]}
              height={300}
              sx={{
                "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                  display: "none",
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  display: "none",
                },
                "& .MuiChartsAxis-tick": { display: "none" },
                "& .MuiChartsAxis-tickLabel": {
                  fill: "#94a3b8 !important",
                  fontSize: "12px",
                },
                "& .MuiBarElement-root": {
                  rx: 10,
                },
                "& .MuiChartsGrid-line": {
                  strokeDasharray: "5 5",
                  stroke: "#1e293b",
                },
              }}
              grid={{ horizontal: true }}
            />{" "}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              backgroundColor: "background.paper",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "text.primary", mb: 1 }}
            >
              User Demographics
            </Typography>
            <PieChart
              series={[
                {
                  data: data,
                  innerRadius: 70,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 8,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -10,
                    color: "gray",
                  },
                },
              ]}
              height={300}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "center" },
                  labelStyle: { fill: "#94a3b8", fontSize: 12 },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <RecentOrdersTable rows={ordersData} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
