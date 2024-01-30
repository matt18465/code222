import { LocalizationProvider } from "@mui/x-date-pickers";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  BarElement,
  Title,
} from "chart.js";
import "chartjs-adapter-luxon";
import { Layout } from "./layout/Layout";
import { LoginPage } from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Home } from "./pages/Home/home";
import { AuthContextProvider } from "./state/auth-context";
import { Analytics } from "./pages/Analytics/Analytics";
import { Locations } from "./pages/Locations/Locations";
import { ThemeContextProvider } from "./state/theme-context";
import { EnergyStorage } from "./pages/EnergyStorage/EnergyStorage";
import { RoutePathname } from "./utils/routing";
import { ClientContextProvider } from "./state/client-context";
import { PV } from "./pages/PV/PV";
import { Wind } from "./pages/Wind/Wind";
import { Documentation } from "./pages/Documentation/Documentation";
import { Customers } from "./pages/Customers/Customers";
import { Projects } from "./pages/Projects/Projects";
import { Calendar } from "./pages/Calendar/Calendar";
import { HelpCenter } from "./pages/HelpCenter/HelpCenter";
import { Settings } from "./pages/Settings/Settings";
import { element } from "prop-types";
import { Location } from "./pages/Location/location";
import React from "react";

ChartJS.register(
  LinearScale,
  TimeScale,
  CategoryScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  Title
);

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeContextProvider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <ClientContextProvider>
              <Layout>
                <Routes>
                  <Route path={RoutePathname.Login} element={<LoginPage />} />
                  <Route
                    path={RoutePathname.Home}
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.EnergyStorage}
                    element={
                      <ProtectedRoute>
                        <EnergyStorage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.PV}
                    element={
                      <ProtectedRoute>
                        <PV />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Wind}
                    element={
                      <ProtectedRoute>
                        <Wind />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Analytics}
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Locations}
                    element={
                      <ProtectedRoute>
                        <Locations />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path={`${RoutePathname.Locations}/:locationId`}
                    element={<Location />}
                  />
                  <Route
                    path={`${RoutePathname.Locations}/:locationId/pv`}
                    element={<PV />}
                  />
                  <Route
                    path={`${RoutePathname.Locations}/:locationId/wind`}
                    element={<Wind />}
                  />
                  <Route
                    path={`${RoutePathname.Locations}/:locationId/energy-storage`}
                    element={<EnergyStorage />}
                  />
                  <Route
                    path={RoutePathname.Documentation}
                    element={
                      <ProtectedRoute>
                        <Documentation />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Customers}
                    element={
                      <ProtectedRoute>
                        <Customers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Projects}
                    element={
                      <ProtectedRoute>
                        <Projects />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Calendar}
                    element={
                      <ProtectedRoute>
                        <Calendar />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.HelpCenter}
                    element={
                      <ProtectedRoute>
                        <HelpCenter />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={RoutePathname.Settings}
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="*"
                    element={<Navigate to={RoutePathname.Home} replace />}
                  />
                </Routes>
              </Layout>
            </ClientContextProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </LocalizationProvider>
    </ThemeContextProvider>
  );
}

export default App;
