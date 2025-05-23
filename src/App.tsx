import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CarContextProvider } from "./context/Context";
import RoadsideAssitanceLayout from "./components/RoadsideAssitance/RoadsideAssitanceLayout";
import RoadsideAssitance from "./pages/RoadsideAssitancePage";
import RoadSideServices from "./components/RoadsideAssitance/Services";
import { BookingProvider } from "./context/BookingContext";
import UserProfilePage from "./pages/UserProfilePage";
import LandingLayout from "./components/Layouts/LandingLayout";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./components/dashboard/LandingPage";
import { FinanceProvider } from "./context/FinanceContext";
import ServiceHistoryPage from "./components/ServicesHistory";
import DrivingAnalyticsPage from "./pages/DrivingAnalyticsPage";
import Insurance from "./components/Insurance";
import BuySellCar from "./pages/BuySellCar/index.tsx";
import RenewRegistrationPage from "./pages/RenewRegistrationPage";
import Maintenance from "./components/Maintenance";
import HireDriver from "./components/HireDriver/HireDriver";
import CarLeasing from "./components/CarLeasing";
import CarFinancing from "./components/CarFinancing";
import Souq from "./pages/Souq";
import GetWarrantyPage from "./pages/GetWarrantyPage";
import RoadsideAssitancePage from "./pages/RoadsideAssitancePage";
import VIPMembership from "./pages/VIPMembership/index.tsx";

const queryClient = new QueryClient();

const App = () => (
  <CarContextProvider>
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <FinanceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<LandingLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/user-profile" element={<UserProfilePage />} />
                  <Route path="/service-history" element={<ServiceHistoryPage />} />
                  <Route path="/souq" element={<Souq />} />
                  <Route path="/analytics" element={<DrivingAnalyticsPage />} />
                  <Route path="/vip-membership" element={<VIPMembership />} />

                  <Route element={<DashboardLayout />}>
                    <Route path="/souq/insurance" element={<Insurance />} />
                    <Route path="/souq/get-warranty" element={<GetWarrantyPage />} />
                    <Route path="/souq/roadside-assistance" element={<RoadsideAssitancePage />} />
                    <Route path="/souq/buy-sell" element={<BuySellCar />} />
                    <Route
                      path="/souq/registration"
                      element={<RenewRegistrationPage />}
                    />
                    <Route path="/souq/maintenance" element={<Maintenance />} />
                    <Route path="/souq/hire-driver" element={<HireDriver />} />
                    <Route path="/souq/car-leasing" element={<CarLeasing />} />
                    <Route path="/souq/car-financing" element={<CarFinancing />} />
                  </Route>
                </Route>

                <Route element={<RoadsideAssitanceLayout />}>
                  <Route
                    path="/roadside-assistance"
                    element={<RoadsideAssitance />}
                  />
                  <Route
                    path="/roadside-assistance/services"
                    element={<RoadSideServices />}
                  />

                  <Route
                    path="/roadside-assistance"
                    element={<RoadsideAssitance />}
                  />
                  <Route
                    path="/roadside-assistance/services"
                    element={<RoadSideServices />}
                  />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FinanceProvider>
      </BookingProvider>
    </QueryClientProvider>
  </CarContextProvider>
);

export default App;
