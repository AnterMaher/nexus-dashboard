import React from "react";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { GridView, ViewList } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";

// icons box
import { Inventory2 } from "@mui/icons-material";

import StatCard from "../components/Products/StatCardProducts";
import { useProducts } from "../context/dataproducts";
import ProductsActions from "../components/Products/ProductsActions";
import ProductCard from "../components/Products/ProductCard";

import AddProductModal from "../components/Products/AddProducts";
import UpdateProductModal from "../components/Products/UpdateProducts";
import CustomToggleButtonGroup from "../components/Products/ToggleButtonGroup";

const Products = () => {
  const { products, updateProduct, deleteProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdateOpen(true);
  };

  const handleUpdateDetails = (updatedData) => {
    updateProduct(updatedData);
    setUpdateOpen(false);
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
            Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your product inventory.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Product
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 ,lg: 4,xl: 4}}>
          <StatCard
            title="Total Products"
            value={products.length}
            icon={<Inventory2 />}
            iconColor="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 ,lg: 4,xl: 4}}>
          <StatCard
            title="In Stock"
            value={
              products.filter((product) => product.status === "In Stock").length
            }
            icon={<Inventory2 />}
            iconColor="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 ,lg: 4,xl: 4}}>
          <StatCard
            title="Low Stock"
            value={
              products.filter((product) => product.status === "Low Stock")
                .length
            }
            icon={<Inventory2 />}
            iconColor="warning.main"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          border: "1px solid ",
          borderRadius: 1.5,
          p: 2,
          borderColor: "divider",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
              All Products
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <OutlinedInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              placeholder="Search Products..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: "text.secondary" }} />
                </InputAdornment>
              }
              sx={{
                width: 300,
                borderRadius: 1,
                display: { xs: "none", sm: "flex" },
              }}
            />

            <CustomToggleButtonGroup
              value={viewMode}
              onChange={(e, newVal) => {
                if (newVal) setViewMode(newVal);
              }}
              options={[
                {
                  value: "grid",
                  label: "grid view",
                  icon: <GridView fontSize="small" />,
                },
                {
                  value: "list",
                  label: "list view",
                  icon: <ViewList fontSize="small" />,
                },
              ]}
            />
          </Box>
        </Box>
        {/* cards */}
        <Grid container spacing={2}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid
                size={{
                  xs: 12,
                  sm: viewMode === "grid" ? 6 : 12,
                  md: viewMode === "grid" ? 6 : 12,
                  lg: viewMode === "grid" ? 4 : 12,
                  xl: viewMode === "grid" ? 3 : 12,

                }}
                key={product.id}
              >
                <ProductCard
                  product={product}
                  onEdit={handleEditClick}
                  viewMode={viewMode}
                  onDelete={deleteProduct}
                />
              </Grid>
            ))
          ) : (
            <Box sx={{ p: 4, width: "100%", textAlign: "center" }}>
              <Typography color="text.secondary">
                No products found matching "{searchQuery}"
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>

      <AddProductModal open={open} onClose={() => setOpen(false)} />
      <UpdateProductModal
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateDetails}
      />
    </Box>
  );
};

export default Products;
