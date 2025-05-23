import React from "react";
import { LucideIcon } from "lucide-react";

interface BenefitTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  theme?: string;
}

const BenefitTile: React.FC<BenefitTileProps> = ({
  title,
  description,
  icon: Icon,
  theme = "light",
}) => {
  const tileClasses =
    theme === "subscribed"
      ? "bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      : "bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col";

  const iconBackdropClasses =
    theme === "subscribed"
      ? "flex items-center justify-center rounded-full h-14 w-14 mb-4 bg-amber-100"
      : "flex items-center justify-center rounded-full h-14 w-14 mb-4 bg-blue-50";

  const iconClasses =
    theme === "subscribed" ? "h-7 w-7 text-amber-600" : "h-7 w-7 text-blue-600";

  const titleClasses = "text-xl font-semibold mb-2 text-gray-800";
  const descriptionClasses = "text-gray-600 flex-grow";

  return (
    <div className={tileClasses}>
      <div className={iconBackdropClasses}>
        <Icon className={iconClasses} />
      </div>
      <h3 className={titleClasses}>{title}</h3>
      <p className={descriptionClasses}>{description}</p>
    </div>
  );
};

export default BenefitTile;
