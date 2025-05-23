import React from "react";
import { Star } from "lucide-react";

interface VIPLogoProps {
  className?: string;
}

const VIPLogo: React.FC<VIPLogoProps> = ({ className = "" }) => {
  return (
    <div className={`${className} relative`}>
      <div className="absolute inset-0 bg-zinc-700 rounded-full shadow-lg transform -rotate-6"></div>
      <div className="absolute inset-0 bg-zinc-800 rounded-full shadow-xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Star
            className="h-5 w-5 text-amber-400 mb-0.5 drop-shadow-md"
            fill="currentColor"
          />
          <span className="font-bold text-sm text-amber-400">VIP</span>
        </div>
      </div>
    </div>
  );
};

export default VIPLogo;
