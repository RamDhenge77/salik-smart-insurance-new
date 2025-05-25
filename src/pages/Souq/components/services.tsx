import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Eco Wash",
      src: "/services/eco-wash.png",
      link: "/souq/maintenance",
    },
    {
      title: "VIP Membership",
      src: "/services/vip-banner.png",
      link: "/vip-membership",
    },
    {
      title: "Service Plan",
      src: "/services/service-plan.png",
      link: "/souq/maintenance",
    },
    {
      title: "Challenges",
      src: "/services/challenges.png",
      link: "/challenges",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {services.map((service, index) => (
        <Link
          key={index}
          to={service.link}
          className="h-[16rem] flex flex-col items-center justify-center rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleClick(service.link)}
        >
          <img src={service.src} alt={service.title} />
        </Link>
      ))}
    </div>
  );
};

export default Services;
