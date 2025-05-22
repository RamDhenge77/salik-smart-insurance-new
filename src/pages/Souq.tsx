import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Souq = () => {
  const navigate = useNavigate();
  const images = [
    {
      title: "Car Services Provider",
      subtitle: "Professional car Services at your convenience",
      src: "/cars/car-banner-1.jpg",
    },
    {
      title: "Car Services Provider",
      subtitle: "Professional car Services at your convenience",
      src: "/cars/car-banner-2.jpg",
    },
    {
      title: "Car Services Provider",
      subtitle: "Professional car Services at your convenience",
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
  ];
  const scrollTrack = window.scrollY;

  useEffect(() => {
    navigate("/souq/insurance");
  }, []);

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
                  <div className="text-[3rem] leading-tight font-bold text-white">
                    <span className="uppercase">{img.title}</span>
                    {img.subtitle && (
                      <span className="block text-[1.5rem] font-normal mt-5 text-gray-300 sentence-case">
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
            <Card className="flex flex-col w-[10rem] items-center justify-center py-4 stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl">
              <div className={`mb-1 rounded-full h-[4.2rem] w-[4.2rem] `}>
                <img src={insight.icon} alt="" />
              </div>
              <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                {insight.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* <div className="border flex justify-start pl-4 items-center mt-10 mx-auto">
        <Carousel className="w-[100%] max-w-[100%]">
          <CarouselContent className="-ml-[10.25rem] mr-[8rem]">
            {insights.map((insight, index) => (
              <CarouselItem
                key={index}
                className="px-[12rem] pr-[0rem] py-4 md:basis-1/2 lg:basis-1/5"
              >
                <Link key={index} to={insight.link} onClick={handleScroll} className="">
                  <Card className="flex flex-col w-[10rem] items-center justify-center py-4 stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl">
                    <div className={`mb-1 rounded-full h-[4.2rem] w-[4.2rem] `}>
                      <img src={insight.icon} alt="" />
                    </div>
                    <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                      {insight.label}
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}
    </div>
  );
};

export default Souq;
