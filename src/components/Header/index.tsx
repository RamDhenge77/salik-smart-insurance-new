import React, { useEffect } from "react";
import {
  Bell,
  HandCoins,
  HandHelping,
  LayoutTemplate,
  Settings,
  User,
  UserCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCarContext } from "@/context/Context";
import { Button } from "../ui/button";
import SettingsDialog from "./components/SettingsDialog";
import Notification from "@/pages/Souq/components/notification";

const Header: React.FC = () => {
  const location = useLocation();
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const { collapsed, isSubscribed } = useCarContext();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/souq" className="flex items-center">
          {/* <div className="w-12 h-12 mr-3">
            <img
              src="/lovable-uploads/f6d21fb8-8be7-4c07-82b6-710b4f0636cd.png"
              alt="AI Icon"
              className="w-full h-full object-contain"
            />
          </div> */}
          {collapsed && (
            <div className="relative">
              <h1 className="text-black font-bold text-xl">Salik Souq</h1>
              {/* <p className="text-gray-500 text-sm">Your Mobility Assistant</p> */}
              {isSubscribed && (
                <img
                  src="/lovable-uploads/VIP.png"
                  className="h-6 absolute top-[.2rem] left-[6.5rem]"
                  alt=""
                />
              )}
            </div>
          )}
        </Link>

        {isLoggedin && (
          <div className="flex items-center space-x-2">
            <Notification />
            <Link to="/salik-dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[#2595be7e] hover:text-white"
              >
                <LayoutTemplate className="h-5 w-5" />
              </Button>
            </Link>
            <SettingsDialog />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
