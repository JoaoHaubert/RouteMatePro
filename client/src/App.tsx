import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "@/theme";
//import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./views/dashboard";
import Layout from "./views/layout";
import Register from "./views/form/register";
import VehicleForm from "./views/form/vehicles/VehicleForm";
import DriverForm from "./views/form/drivers/DriverForm";
import ShopForm from "./views/form/shops/ShopForm";
import VehicleList from "./views/vehicleList";
import DriverList from "./views/driverList";
import ShopList from "./views/shopList";
//import Navbar from '@/components/Navbar'
//import Sidebar from '@/components/Sidebar'
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 1.5rem 4rem 0.7rem">
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/new-vehicle" element={<VehicleForm />} />
                <Route path="/new-driver" element={<DriverForm />} />
                <Route path="/new-shop" element={<ShopForm />} />
                <Route path="/vehicles" element={ <VehicleList/> } />
                <Route path="/active-vehicles" element={<div>Veiculos Ativos</div>}/>
                <Route path="/maintenance" element={<div>Manutencoes</div>} />
                <Route path="/drivers" element={<DriverList/>} />
                <Route path="/shop" element={<ShopList/>} />
              </Route>
            </Routes>
          </Box>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
