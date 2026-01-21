import React, { useState, useEffect } from "react"; // 1. استدعاء useEffect
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const UpdateProductModal = ({ open, onClose, product, onUpdate }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "",
    sales: "",
  });

  useEffect(() => {
    if (product) {
      setProductData({
        id: product.id, // مهم جداً نحتفظ بالـ ID
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        sales: product.sales || 0,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.price) {
      alert("Please fill required fields");
      return;
    }

    // 4. إرسال البيانات الجديدة للأب (عشان يعمل عملية التبديل)
    onUpdate(productData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Edit Product
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Product Name"
              fullWidth
              variant="outlined"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Category *"
              fullWidth
              variant="outlined"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              label="Price *"
              fullWidth
              variant="outlined"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              label="Stock *"
              fullWidth
              variant="outlined"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              label="Status"
              value={productData.status}
              fullWidth
              name="status"
              variant="outlined"
              onChange={handleChange}
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
              onClick={handleSubmit}
              sx={{ bgcolor: "primary.main", py: 1.5, fontWeight: "bold" }}
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
