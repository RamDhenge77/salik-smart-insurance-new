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
  const { collapsed, setCollapsed, isSubscribed, subscriptionPeriod } = useCarContext();
  const location = useLocation();

  const { handleLogOut } = useCarContext();

  return (
    <div
      className={cn(
        `fixed transition-all duration-300 text-white z-40 ${subscriptionPeriod === 2 ? "!bg-[linear-gradient(to_bottom,_#5a3d25,_#2b1d13)] border border-white h-[calc(100vh-1.4rem)] rounded-2xl" : "bg-[#1A1F2C] h-screen"}`,
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
          {!collapsed && (
            <h1 className="text-2xl font-bold relative">
              Salik Souq
              {isSubscribed && (
                <img
                  src="/lovable-uploads/VIP.png"
                  className="h-7 absolute top-[.25rem] left-[8rem]"
                  alt=""
                />
              )}
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "p-2 rounded-full hover:bg-gray-700/50 duration-200",
              collapsed ? "mx-auto" : "ml-auto",
              subscriptionPeriod === 2 ? "bg-white/20 hover:bg-white/10 mt-2" : "",
            )}
          >
            {collapsed ? <ChevronRight size={subscriptionPeriod === 2 ? 16 : 20} /> : <ChevronLeft size={subscriptionPeriod === 2 ? 16 : 20} />}
          </button>
        </div>
        <div className={`flex-1 overflow-y-auto ${subscriptionPeriod === 2 ?'space-y-3 mt-3':''}`}>
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
            onClick={handleLogOut}
            className={`hover:text-white duration-150 bg-gray-700/50 hover:bg-[#ffffff2a] p-[.64rem] rounded-full ${subscriptionPeriod === 2 ? "bg-white/20" : ""}`}
          >
            <LogOut className={`${subscriptionPeriod === 2?'h-4 w-4':'h-5 w-5'}`} />
          </Link>
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
