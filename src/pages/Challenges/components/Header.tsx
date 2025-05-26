import React from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-eco-gray">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="mr-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-themeDark text-white">
            <span className="text-xl">🌱</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            Green Warrior
            <Badge className="ml-2 bg-themeDark hover:bg-btn-primary text-white">Challenge</Badge>
          </h1>
          <p className="text-eco-gray-dark">
            Track your eco-driving impact and compete with others
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="text-center px-4 py-2 bg-eco-gray-light rounded-lg">
          <p className="text-xs text-eco-gray-dark">Current Challenge</p>
          <p className="font-medium">{format(new Date(), "MMMM yyyy")}</p>
        </div>
        <div className="text-center px-4 py-2 bg-eco-gray-light rounded-lg">
          <p className="text-xs text-eco-gray-dark">Active Warriors</p>
          <p className="font-medium">204</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
