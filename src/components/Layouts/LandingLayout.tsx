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

const LandingLayout = () => {
  // const [tripData, setTripData] = useState<TripData[]>([]);
  const {
    tripData,
    setTripData,
    handleFileProcessed,
    showContent,
    setShowContent,
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
  useEffect(()=>{
    if(showContent){
      navigate("/dashboard");
    }
    else{
      navigate("/");
    }
  },[showContent])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div
        className={`container relative mx-auto px-4 py-8 ${
          !showContent ? "min-h-[85vh] flex items-center justify-center" : ""
        }`}
      >
        {/* {!showContent ? (
          <LandingPage />
        ) : (
          <>
            <DashboardLayout />
          </>
        )} */}
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
