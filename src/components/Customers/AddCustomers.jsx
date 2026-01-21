import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { useCustomers } from "../../context/datacustomers";

export default function FormDialog({ open, onClose }) {
  const { handleAddItem } = useCustomers();
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <Button
          onClick={handleClose}
          variant="text"
          size="small"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <ClearIcon />
        </Button>
        <DialogContent>
          <form onSubmit={(event) => {}} id="subscription-form">
            <TextField
              fullWidth
              required
              id="name"
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              margin="dense"
              value={data.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <TextField
              fullWidth
              required
              id="email"
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              margin="dense"
              value={data.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Button
              onClick={(event) => {
                event.preventDefault();

                handleAddItem(data);
                onClose();
                setData({
                  name: "",
                  email: "",
                });
              }}
              fullWidth
              sx={{ mt: 1 }}
              variant="contained"
              startIcon={<AddIcon />}
              type="submit"
              form="subscription-form"
            >
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
