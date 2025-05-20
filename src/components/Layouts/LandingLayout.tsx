import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import { TripData } from "../FileUploader";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RiskThresholds } from "../RiskFactorConfig";
import LandingPage from "../dashboard/LandingPage";
import DashboardLayout from "./DashboardLayout";
import { useCarContext } from "@/context/Context";
import Sidebar from "../Sidebar";
import SidebarItem from "../Sidebar/SidebarItem";
import {
  LayoutDashboard,
  Shield,
  CarFront,
  CalendarCheck2,
  CircleUserRound,
  CarTaxiFront,
  Handshake,
} from "lucide-react";

const LandingLayout = () => {
  
  const {
    setTripData,
    showContent,
    setShowContent,
    collapsed,
  } = useCarContext();
  // const [showContent, setShowContent] = useState(false);
  const [uploadKey, setUploadKey] = useState(Date.now());
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    localStorage.removeItem("tripData");
    localStorage.removeItem("driverProfile");
    localStorage.removeItem("riskFactors");
    localStorage.clear();
  }, []);

  // Attempt to restore data from localStorage if available
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tripData");
      // console.log("Saved data from localStorage:", savedData);

      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTripData(parsed);
          setShowContent(true);
          console.log(
            "Restored data from localStorage:",
            parsed.length,
            "trips"
          );
        }
      }
    } catch (error) {
      console.error("Failed to restore trip data from localStorage:", error);
    }
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (showContent) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [showContent]);

  return (
    <div className="min-h-screen flex w-full">
      <div>
        {showContent && (
          <Sidebar>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" path={"/dashboard"} />
            <SidebarItem icon={Shield} label="Insurance" path="/insurance" />
            <SidebarItem icon={CarFront} label="Buy/Sell" path="/buy-sell" />
            <SidebarItem icon={CalendarCheck2} label="Renew Registration" path="/registration" />
            <SidebarItem icon={CarFront} label="Maintenance" path="/maintenance" />
            <SidebarItem icon={CircleUserRound} label="Hire a Driver" path="/hire-driver" />
            <SidebarItem icon={CarTaxiFront} label="Car Leasing" path="/car-leasing" />
            <SidebarItem icon={Handshake} label="Car Financing" path="/car-financing" />
          </Sidebar>
        )}
      </div>
      <div
        className={`min-h-screen flex flex-col w-full ${
          showContent ? (collapsed ? "ml-[3rem]" : "ml-[15rem]") : ""
        }`}
        style={{ transition: "margin-left 0.2s ease-in-out" }}
      >
        <Header />

        <div
          className={`container relative mx-auto px-4 py-8 ${
            !showContent ? "min-h-[85vh] flex items-center justify-center" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
