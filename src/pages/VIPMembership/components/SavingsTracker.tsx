import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";

interface SavingsTrackerProps {
  isSubscribed: boolean;
  savings: number;
}

const SavingsTracker: React.FC<SavingsTrackerProps> = ({
  isSubscribed,
  savings,
}) => {
  if (!isSubscribed) {
    return null;
  }

  return (
    <div className="mb-12 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <TrendingUp className="text-amber-500 h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">
              Your VIP Savings
            </h3>
            <p className="text-gray-500">This Month</p>
          </div>
        </div>

        <div className="bg-white px-8 py-4 rounded-lg border border-gray-100 shadow-md flex items-center justify-center">
          <DollarSign className="h-6 w-6 mr-1 text-green-500" />
          <span className="text-green-500 text-3xl font-mono tracking-wider font-bold">
            AED {savings.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;
