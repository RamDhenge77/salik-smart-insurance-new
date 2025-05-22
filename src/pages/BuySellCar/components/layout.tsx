import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  selectedTab: "buy" | "sell" | "mycars";
  onTabChange: (tab: "buy" | "sell" | "mycars") => void;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  selectedTab,
  onTabChange,
}) => {
  return (
    <div className="min-h-screen flex bg-salik-background">

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-salik-sidebar text-white p-4">
          <h1 className="text-xl font-semibold">Salik Auctions</h1>
          <p className="text-white/70 text-sm">Buy or Sell Cars in Minutes</p>
        </div>

        {/* Tab navigation for both mobile and desktop */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition-colors ${
              selectedTab === "buy"
                ? "border-themeDark text-themeDark"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onTabChange("buy")}
          >
            Buy a Car
          </button>
          <button
            className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition-colors ${
              selectedTab === "sell"
                ? "border-themeDark text-themeDark"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onTabChange("sell")}
          >
            Sell a Car
          </button>
          <button
            className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition-colors ${
              selectedTab === "mycars"
                ? "border-themeDark text-themeDark"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onTabChange("mycars")}
          >
            My Cars
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
