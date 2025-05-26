import React from "react";
import {
  Car,
  Wrench,
  Target,
  ChartLine,
  Megaphone,
  Shield,
  Leaf,
} from "lucide-react";
import ServiceTile from "./ServiceTile";
import { useNavigate } from "react-router-dom";

const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();
  const featuredServices = [
    {
      icon: Shield,
      iconBgColor: "bg-yellow-500",
      title: "Salik Souq VIP Membership",
      description: "Drive smart. Earn rewards. Get VIP treatment.",
      link: "/vip-membership",
    },
    {
      icon: Leaf,
      iconBgColor: "bg-green-500",
      title: "GREEN WARRIOR CHALLENGE",
      description: "Track your eco-driving progress and compete for rewards!",
      link: "/challenges",
    },
  ];

  const regularServices = [
    {
      icon: Car,
      iconBgColor: "bg-green-500",
      title: "ECO WASH SUBSCRIPTION",
      description:
        "Keep your car shining with unlimited monthly washes at home or office. Eco-friendly, waterless, and fully contactless.",
      link: "/souq/maintenance",
    },
    {
      icon: Wrench,
      iconBgColor: "bg-yellow-500",
      title: "SERVICE SAVER PLAN",
      description:
        "One fixed fee, all your car services covered for the year — from oil changes to tyre rotation. Peace of mind, guaranteed.",
      link: "/souq/maintenance",
    },
    {
      icon: Target,
      iconBgColor: "bg-red-500",
      title: "ZERO-FINE DRIVING CHALLENGE",
      description:
        "Stay fine-free for 30 days and win! Join our challenge to promote safe driving and get exclusive rewards.",
      link: "/analytics",
    },
    {
      icon: Car,
      iconBgColor: "bg-green-600",
      title: "SMART ROUTE REWARDS",
      description:
        "Save money every time you avoid traffic! Use our smart routing to cut costs and unlock weekly rewards for efficient travel.",
      link: "/souq/maintenance",
    },
    {
      icon: ChartLine,
      iconBgColor: "bg-blue-600",
      title: "MILEAGE MASTER TRACKER",
      description:
        "Track your driving habits, fuel usage, and cost per trip. Get monthly reports and AI tips to drive smarter & save more.",
      link: "/analytics",
    },
    {
      icon: Megaphone,
      iconBgColor: "bg-blue-400",
      title: "REFER & RIDE FREE",
      description:
        "Love our portal? Invite your friends. Every referral gets you discounts, free washes, and loyalty perks.",
      link: "/souq/maintenance",
    },
  ];

  const handleTileClick = (link: string) => {
    window.scrollTo({
      top: (link==='/challenges' || link==='vip-membership') ? 0 : 400,
      behavior: "smooth",
    });
    navigate(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Car Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our comprehensive range of automotive services designed to
          keep your vehicle in perfect condition
        </p>
      </div> */}

      {/* Featured services - full width tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {featuredServices.map((service, index) => (
          <ServiceTile
            key={`featured-${index}`}
            icon={service.icon}
            iconBgColor={service.iconBgColor}
            title={service.title}
            description={service.description}
            onClick={() => handleTileClick(service.link)}
          />
        ))}
      </div>

      {/* Regular services - 3 columns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularServices.map((service, index) => (
          <ServiceTile
            key={`regular-${index}`}
            icon={service.icon}
            iconBgColor={service.iconBgColor}
            title={service.title}
            description={service.description}
            onClick={() => handleTileClick(service.link)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
