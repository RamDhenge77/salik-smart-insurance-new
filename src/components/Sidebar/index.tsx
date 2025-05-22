import React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  HandCoins,
  LogOut,
  User,
} from "lucide-react";
import { useCarContext } from "@/context/Context";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const { collapsed, setCollapsed } = useCarContext();
  const location = useLocation();

  const { handleLogOut } = useCarContext();

  return (
    <div
      className={cn(
        "fixed h-screen transition-all duration-300 bg-[#1A1F2C] text-white z-40",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "p-4 flex items-center justify-between",
            collapsed && "justify-center p-2"
          )}
        >
          {!collapsed && <h1 className="text-2xl font-bold">Salik Souq</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "p-2 rounded-full hover:bg-gray-700/50",
              collapsed ? "mx-auto" : "ml-auto"
            )}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                collapsed,
              });
            }
            return child;
          })}
        </div>

        {/* footer */}
        <div
          className={`flex items-center justify-end px-2 space-x-2 mb-3 overflow-hidden `}
        >
          {/* <Link
            to="/user-profile"
            className={`hover:text-white duration-150 hover:bg-gray-700/50 p-[.64rem] rounded-full ${
              location.pathname === "/user-profile" ? "bg-white/10" : ""
            }`}
          >
            <User className="h-5 w-5" />
          </Link> */}
          <Link
            to="/"
            className="hover:text-white duration-150 bg-gray-700/50 hover:bg-[#ffffff2a] p-[.64rem] rounded-full"
          >
            <LogOut className="h-5 w-5" onClick={handleLogOut} />
          </Link>
          {/* <SettingsDialog /> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);

//  {React.Children.map(children, (child) => {
//             if (React.isValidElement(child)) {
//               return React.cloneElement(child as React.ReactElement<any>, {
//                 collapsed,
//               });
//             }
//             return child;
//           })}
