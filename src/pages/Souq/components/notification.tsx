import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Notification = () => {
  const notificationData = [
    {
      title: "Warranty Expiring Soon",
      description: "Coverage ends in 2 weeks — extend today.",
    },
    {
      title: "Your oil change should be due soon",
      description: "your last oil change was done 5 months ago",
    },
    {
      title: "Lease Term Ending",
      description: "30 days left on your lease — plan next steps.",
    },
    {
      title: "Eligible for Upgrade",
      description: "You're now eligible for a new model lease.",
    },
    {
      title: "Car service due soon",
      description: "You last serviced your car 30 days ago",
    },

    // 2nd

    // {
    //   title: "Warranty Expiring Soon",
    //   description: "Coverage ends in 2 weeks — extend today.",
    // },
    // {
    //   title: "Claim Period Ending",
    //   description: "Last eligible claim window closes in 7 days.",
    // },
    // {
    //   title: "Lease Term Ending",
    //   description: "30 days left on your lease — plan next steps.",
    // },
    // {
    //   title: "Eligible for Upgrade",
    //   description: "You're now eligible for a new model lease.",
    // },
    // {
    //   title: "Prepay & Save",
    //   description: "Early closure offer: save AED 950 in interest.",
    // },
  ];

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#2595be7e] hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[21rem] max-h-[27.4rem] overflow-auto backdrop-blur-md bg-white/90 border border-gray-200 rounded-xl shadow-2xl p-4 mr-5 
        [&::-webkit-scrollbar]:w-1 
        [&::-webkit-scrollbar-track]:bg-gray-100 
        [&::-webkit-scrollbar-thumb]:bg-gray-300 
        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full
        "
        >
          <div className="flex items-center justify-center border-b pb-2">
            <img
              src="/lovable-uploads/notification.png"
              alt=""
              className="w-8 rotate-12 bg-[#ffdb797e] p-[.35rem] rounded-full"
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {notificationData.map((notification, index) => (
              <>
                <div
                  key={index}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                >
                  <div className="p-[.2rem] w-fit bg-themeDark rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-[.9rem] font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="text-[.8rem] text-gray-700">
                      {notification.description}
                    </p>
                  </div>
                </div>
                {index !== notificationData?.length - 1 && (
                  <div className="border-t border-gray-300"></div>
                )}
              </>
            ))}
            {/* <div className="flex items-start gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
              <div className="p-1 w-fit bg-themeDark rounded-full mt-2"></div>
              <div>
                <h3 className="text-[.9rem] font-semibold text-gray-900">
                  Warranty Expiring Soon
                </h3>
                <p className="text-[.8rem] text-gray-700">
                  Coverage ends in 2 weeks — extend today.
                </p>
              </div>
            </div> */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Notification;
