import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  MenuItem,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useProducts } from "../../context/dataproducts";

const AddProductModal = ({ open, onClose }) => {
  const { AddProduct } = useProducts();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: null,
    stock: "",
    status: "In Stock",
    sales: 0,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.stock
    ) {
      alert("Please fill all the required fields");
    } else {
      e.preventDefault();
      AddProduct({ ...product, sales: 0 });
      onClose();
      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "In Stock",
        sales: 0,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Add New Product
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Product Name *"
              placeholder="Enter product name"
              fullWidth
              variant="outlined"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Category *"
              placeholder="e.g., Electronics, Fashion"
              fullWidth
              variant="outlined"
              name="category"
              value={product.category}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Price *"
              placeholder="0.00"
              type="number"
              fullWidth
              variant="outlined"
              name="price"
              value={product.price}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Stock Quantity"
              placeholder="0.00"
              type="number"
              fullWidth
              variant="outlined"
              name="stock"
              value={product.stock}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              label="Status"
              value={product.status}
              fullWidth
              name="status"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: "primary.main",
                py: 1.5,
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
