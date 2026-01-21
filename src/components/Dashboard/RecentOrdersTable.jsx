import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  Avatar,
} from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const RecentOrdersTable = ({ rows }) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ mt: 3 }}>
      <Table
        sx={{ width: "100%", bgcolor: "transparent" }}
        aria-label="simple table"
      >
        <TableHead>
          <Typography variant="h6" fontWeight="bold" sx={{ m: 2 }}>
            Recent Orders
          </Typography>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
              Order ID
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
              Customer
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
              Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
              Amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                {row.id}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      fontSize: 12,
                    }}
                  >
                    {row.user.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">{row.user}</Typography>
                </Box>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>{row.amount}</TableCell>
              <TableCell>
                <Chip
                  label={row.status}
                  color={getStatusColor(row.status)}
                  size="small"
                  variant="outlined" // أو "filled"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentOrdersTable;
