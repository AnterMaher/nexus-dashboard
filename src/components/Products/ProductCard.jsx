import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import {
  MoreHoriz,
  Edit,
  Delete,
  Image as ImageIcon,
} from "@mui/icons-material";
import ProductActions from "./ProductsActions";

const ProductCard = ({ product, onEdit, viewMode = "grid", onDelete }) => {
  const isList = viewMode === "list";
  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "success";
      case "Low Stock":
        return "warning";
      case "Out of Stock":
        return "error";
      default:
        return "default";
    }
  };

  const renderListContent = () => (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%", p: 2 }}>
      {/* Image Section */}
      <Box
        sx={{
          width: 60, // Smaller fixed square for list view
          height: 60,
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
          flexShrink: 0,
        }}
      >
        <ImageIcon sx={{ fontSize: 24, opacity: 0.3 }} />
      </Box>

      {/* Info Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {product.category}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            label={product.status}
            color={getStatusColor(product.status)}
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: "0.75rem",
              fontWeight: "bold",
              borderRadius: "4px",
              "& .MuiChip-label": { px: 1 },
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {product.stock} in stock
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {product.sales || 0} sold
          </Typography>
        </Box>
      </Box>

      {/* Price Section */}
      <Typography
        variant="h6"
        color="primary.main"
        fontWeight="bold"
        sx={{ mr: 4 }}
      >
        ${product.price}
      </Typography>

      {/* Actions */}
      <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
    </Box>
  );

  const renderGridContent = () => (
    <>
      <Box
        sx={{
          height: "250px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          position: "relative",
        }}
      >
        <ImageIcon sx={{ fontSize: 40, opacity: 0.3 }} />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
        </Box>
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.category}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            ${product.price}
          </Typography>

          <Chip
            label={product.status}
            color={getStatusColor(product.status)}
            size="small"
            variant="outlined"
            sx={{ fontWeight: "bold", borderRadius: "6px" }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {product.stock} in stock
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {product.sales || 0} sold
          </Typography>
        </Box>
      </CardContent>
    </>
  );

  return (
    <Card
      sx={{
        borderRadius: 1,
        bgcolor: "background.paper",
        boxShadow: (theme) => theme.shadows[2],
        position: "relative",
        transition: "0.3s",
        display: isList ? "flex" : "block",
        alignItems: isList ? "center" : "initial",
        "&:hover": {
          translateY: "-5px",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {isList ? renderListContent() : renderGridContent()}
    </Card>
  );
};

export default ProductCard;
