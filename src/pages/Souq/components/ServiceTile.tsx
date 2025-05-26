import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceTileProps {
  icon: LucideIcon;
  iconBgColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const ServiceTile: React.FC<ServiceTileProps> = ({
  icon: Icon,
  iconBgColor,
  title,
  description,
  onClick,
}) => {
  return (
    <div
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group hover:border-gray-600"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div
          className={`${iconBgColor} p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold leading-tight mb-2 text-gray-100">
            {title}
          </h2>
        </div>
      </div>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceTile;
