import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const landscapes = [
    {
      src: "/lovable-uploads/vip-banner.png",
      link: "/vip-membership",
      title: "VIP Membership",
    },
    {
      src: "/lovable-uploads/challenges-banner2.png",
      link: "/challenges",
      title: "Challenges",
    },
  ];
  const services = [
    {
      title: "Eco Wash",
      src: "/services/eco-wash.png",
      link: "/souq/maintenance",
    },
    {
      title: "Service Plan",
      src: "/services/service-plan.png",
      link: "/souq/maintenance",
    },
    {
      title: "Zero Fine Driving Challenge",
      src: "/services/zero-fine.png",
      link: "/analytics",
    },
    {
      title: "Smart Route Rewards",
      src: "/services/smart-route.png",
      link: "/souq/maintenance",
    },
    {
      title: "Mileage Master Tracker",
      src: "/services/mileage-tracker.png",
      link: "/analytics",
    },
    {
      title: "Refer and Ride Free",
      src: "/services/refer.png",
      link: "/souq/maintenance",
    },
  ];

  const handleClick = (link: string) => {
    if (link !== "/souq/maintenance") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {landscapes.map((service, index) => (
          <Link
            key={index}
            to={service.link}
            className="h-full flex flex-col items-center justify-center overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleClick(service.link)}
          >
            <img src={service.src} alt={service.title} />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-12">
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.link}
            className={`h-[17rem] flex items-center justify-center rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 ${service.title === ""}`}
            onClick={() => handleClick(service.link)}
          >
            <img src={service.src} alt={service.title} className="object-contain" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Services;
