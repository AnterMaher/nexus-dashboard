import React from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
} from "@mui/material";

const rows = [
  { id: 1, path: "/dashboard", views: "12,453", bounce: "24%" },
  { id: 2, path: "/products", views: "8,234", bounce: "32%" },
  { id: 3, path: "/analytics", views: "6,123", bounce: "28%" },
  { id: 4, path: "/customers", views: "4,532", bounce: "35%" },
  { id: 5, path: "/settings", views: "2,341", bounce: "42%" },
];

const TopPages = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Top Pages
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* رقم الترتيب */}
                <TableCell component="th" scope="row" sx={{ width: 50, pl: 0 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 1.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      color: "text.secondary",
                    }}
                  >
                    {row.id}
                  </Box>
                </TableCell>

                {/* اسم الصفحة */}
                <TableCell sx={{ fontWeight: 600, color: "primary.main" }}>
                  {row.path}
                </TableCell>

                {/* المشاهدات */}
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {row.views}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    views
                  </Typography>
                </TableCell>

                {/* معدل الارتداد */}
                <TableCell align="right" sx={{ pr: 0 }}>
                  <Chip
                    label={`${row.bounce} bounce`}
                    size="small"
                    variant="outlined"
                    color={parseInt(row.bounce) > 40 ? "error" : "default"}
                    sx={{ borderRadius: "6px", height: 24, fontSize: "0.7rem" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopPages;
