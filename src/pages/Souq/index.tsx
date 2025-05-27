import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card } from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Services from "./components/services";
import ServicesGrid from "./components/ServicesGrid";

const Souq = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const images = [
    {
      title: "Premium Car Wash at Your Doorstep",
      subtitle:
        "Eco-friendly, waterless wash. Showroom shine, anytime, anywhere. Book in seconds!",
      src: "/cars/car-banner-1.jpg",
    },
    {
      title: "Seamless Vehicle Registration Renewal",
      subtitle:
        "Aviod RTA queues. Upload your documents — we handle testing, fines, and renewal, delivered to your doorstep",
      src: "/cars/car-banner-2.jpg",
    },
    {
      title: "This Week Only: 20% Off on Repairs",
      subtitle:
        "Save on brakes, engine tuning, and suspension. Certified garages, genuine parts — limited slots available!",
      src: "/cars/car-banner-3.jpg",
    },
  ];

  const insights = [
    {
      label: "Insurance",
      icon: "/souq/Insurance.png",
      link: "/souq/insurance",
    },
    {
      label: "Buy/Sell a Car",
      icon: "/souq/car-logo.png",
      link: "/souq/buy-sell",
    },
    {
      label: "Renew Registration",
      icon: "/souq/registration.png",
      link: "/souq/registration",
    },
    {
      label: "Get Warranty",
      icon: "/souq/warranty.png",
      link: "/souq/get-warranty",
    },
    {
      label: "Roadside Assistance",
      icon: "/souq/roadside.png",
      link: "/souq/roadside-assistance",
    },
    {
      label: "Maintenance",
      icon: "/souq/maintenance.png",
      link: "/souq/maintenance",
    },
    {
      label: "Hire a Driver",
      icon: "/cars/steering.jpeg",
      link: "/souq/hire-driver",
    },
    {
      label: "Car Leasing",
      icon: "/souq/car-leasing.png",
      link: "/souq/car-leasing",
    },
    {
      label: "Car Financing",
      icon: "/souq/car-financing.png",
      link: "/souq/car-financing",
    },
    {
      label: "Door Step Fuel",
      icon: "/souq/doorstep-fuel.png",
      link: "#",
    },
    {
      label: "Parking Locator",
      icon: "/souq/parking-locator.jpg",
      link: "#",
    },
    {
      label: "Dubai Mall Offers",
      icon: "/souq/mall.png",
      link: "#",
    },
  ];

  const handleScroll = () => {
    if (window.scrollY < 100) {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="container mt-[-1rem]">
      <div className="w-full max-w-[74rem] flex items-center justify-center mx-auto px-4 overflow-x-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          className="h-[300px] rounded-3xl overflow-hidden"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-[300px] flex justify-center bg-gray-100 relative">
                <div className="absolute w-[40%] inset-0 ml-12 flex flex-col justify-center">
                  <div className="text-[2.3rem] leading-tight font-bold text-white">
                    <span className="uppercase">{img.title}</span>
                    {img.subtitle && (
                      <span className="block text-[1.2rem] font-normal mt-6 text-gray-300 sentence-case">
                        {img.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <img
                  src={img.src}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Insights */}
      <div className="mt-9 grid grid-cols-2 md:grid-cols-6 gap-6 place-items-center px-2">
        {/* <div className="mt-9 flex items-center gap-5 overflow-auto"> */}
        {insights.map((insight, index) => (
          <Link key={index} to={insight.link} onClick={handleScroll}>
            <Card className="flex flex-col w-[10rem] items-center justify-center py-4 stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden">
              {insight?.link === "#" && (
                <div className="absolute top-0 right-1 text-[.7rem] bg-[#2595be35] rounded-sm px-2">
                  Coming Soon
                </div>
              )}
              <div className={`mb-1 rounded-full h-[4.2rem] w-[4.2rem] `}>
                <img
                  src={insight.icon}
                  alt=""
                />
              </div>
              <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                {insight.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {location.pathname === "/souq" && (
        <div className="mt-20">
          {/* <Services /> */}
          <ServicesGrid />
        </div>
      )}
    </div>
  );
};

export default Souq;
