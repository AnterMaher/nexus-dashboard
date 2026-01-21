import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MoreHoriz, Edit, Delete } from "@mui/icons-material";
import { useProducts } from "../../context/dataproducts";

export default function ProductsActions({
  product,
  onEdit,
  openUpdate,
  setOpenUpdate,
  onDelete,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const { DeleteProduct } = useProducts();

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleMenuClick}
        size="small"
        sx={{
          color: "text.secondary",
          bgcolor: openMenu ? "action.hover" : "transparent",
        }}
      >
        <MoreHoriz />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { boxShadow: 3, borderRadius: 1, minWidth: 120 },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit(product);
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete(product.id);
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
