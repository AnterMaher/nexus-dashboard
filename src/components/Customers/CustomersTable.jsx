import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CustomerActions from "./CustomerActions";
import { useCustomers } from "../../context/datacustomers";

function getStatusColor(status) {
  const s = (status || "").toLowerCase();
  if (s === "active") return "success";
  if (s === "inactive") return "text.secondary";
  return "default";
}

function formatStatusLabel(status) {
  const s = (status || "").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function RecentOrdersTable({ searchQuery }) {
  const { customersData } = useCustomers();
  const filteredCustomers = customersData.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <Table aria-label="recent orders table">
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                color: "text.secondary",
                borderBottom: "1px solid",
                borderColor: "rgba(255,255,255,0.06)",
              },
            }}
          >
            <TableCell align="left">Customer</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center">Orders</TableCell>
            <TableCell align="center">Total Spent</TableCell>
            <TableCell align="right">Joined</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  No customers found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
                  "& .MuiTableCell-root": {
                    borderBottom: "1px solid",
                    borderColor: "rgba(255,255,255,0.04)",
                    py: 1.5,
                  },
                  "&:last-child .MuiTableCell-root": { borderBottom: "none" },
                }}
              >
                <TableCell
                  align="left"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "background.paper",
                      backgroundColor: "primary.main",
                    }}
                  >
                    {customer.initials}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customer.email}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Chip
                    label={formatStatusLabel(customer.status)}
                    color={getStatusColor(customer.status)}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: "999px",
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "text.secondary" }} align="center">
                  {customer.orders}
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {`$ ${customer.totalSpent}`}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {customer.joinDate}
                </TableCell>
                <TableCell align="right">
                  <CustomerActions customer={customer} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecentOrdersTable;
