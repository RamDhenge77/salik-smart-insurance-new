import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  collapsed?: boolean;
  path: string;
}

const SidebarItemComponent = ({
  icon: Icon,
  label,
  collapsed = false,
  path,
}: SidebarItemProps) => {
  const location = useLocation();
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    // Check if the current path matches the sidebar item path
    if (location.pathname.includes(path)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname]);

  return (
    <Link
    to={path}
      className={cn(
        "flex items-center py-3 cursor-pointer transition-colors",
        collapsed ? "justify-center px-2" : "px-4",
        active
          ? "bg-white/10 text-white font-medium rounded-lg mx-2"
          : "text-gray-300 hover:bg-white/5 hover:text-white rounded-lg mx-2"
      )}
    >
      <Icon className="h-5 w-5 min-w-[20px]" />
      {!collapsed && <span className="ml-3">{label}</span>}
    </Link>
  );
};

// Memoize it
export const SidebarItem = React.memo(SidebarItemComponent);

export default SidebarItem;
