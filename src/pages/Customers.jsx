import {
  Grid,
  Box,
  Typography,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { People } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import StatCard from "../components/Customers/StatCardCustomers";
import CustomersTable from "../components/Customers/CustomersTable";
import AddCustomers from "../components/Customers/AddCustomers";
import { useCustomers } from "../context/datacustomers";
import { useState } from "react";
const Customers = () => {
  const [open, setOpen] = useState(false);
  const { customersData } = useCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }} display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "text.primary", mb: 1 }}
          >
            Customers
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and view all your customers.
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Customers
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 ,lg: 4,xl: 4}}>
          <StatCard
            icon={<People />}
            title="Total Customers"
            value={customersData.length}
            iconColor="#6366f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 ,lg: 4,xl: 4}}>
          <StatCard
            icon={<People />}
            title="Active Customers"
            value={
              customersData.filter((customer) => customer.status === "Active")
                .length
            }
            iconColor="#6366f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 ,lg: 4,xl: 4}}>
          <StatCard
            icon={<People />}
            title="Total Revenue"
            value={`$${customersData.reduce(
              (total, customer) => total + customer.totalSpent,
              0
            )}`}
            iconColor="#6366f1"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 4,
          padding: "15px",
          borderRadius: "12px",
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 2,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              All Customers
            </Typography>
          </Box>

          <Box>
            <OutlinedInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              placeholder="Search Customers..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: "text.secondary" }} />
                </InputAdornment>
              }
              sx={{
                width: 300,
                borderRadius: 0.5,
                display: { xs: "none", sm: "flex" },
              }}
            />
          </Box>
        </Box>
        <CustomersTable searchQuery={searchQuery} />
      </Box>
      <AddCustomers open={open} onClose={handleClose} />
    </Box>
  );
};

export default Customers;
