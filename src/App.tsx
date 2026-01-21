import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getTheme } from "./Theme/theme";
import MainLayout from "./layout/Sidebar"; // تأكد إن المسار صح

// Pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoFount from "./pages/NoFount";

// Context Providers
import { DataCustomersProvider } from "./context/datacustomers";
import { DataProductsProvider } from "./context/dataproducts";
import { AuthProvider, useAuth } from "./context/authcontext"; // 1. استدعاء Auth

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
};

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <DataProductsProvider>
        <DataCustomersProvider>
          <ThemeProvider theme={theme}> 
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <MainLayout toggleTheme={toggleTheme} mode={mode} />
                    </RequireAuth>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="products" element={<Products />} />
                  <Route
                    path="settings"
                    element={<Settings toggleTheme={toggleTheme} mode={mode} />}
                  />
                </Route>
                <Route path="*" element={<NoFount />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </DataCustomersProvider>
      </DataProductsProvider>
    </AuthProvider>
  );
}

export default App;
