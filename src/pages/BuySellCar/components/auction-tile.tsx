import React from "react";
import { Car } from "@/data/auction-data";
import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuctionTileProps = {
  car: Car;
  onTileClick: (car: Car) => void;
};

const AuctionTile: React.FC<AuctionTileProps> = ({ car, onTileClick }) => {
  return (
    <div
      className="tile overflow-hidden cursor-pointer animate-fade-in bg-[#bdbdbd3e] rounded-xl  hover:shadow-xl duration-300"
      onClick={() => onTileClick(car)}
    >
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
          {car.plate}
        </div>
        {car.hasView360 && (
          <div className="absolute bottom-2 right-2 bg-btn-primary text-black px-2 py-1 rounded-[.64rem] font-medium text-xs">
            360° View
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {car.year} {car.make} {car.model}
        </h3>
        <div className="text-gray-600">{car.color}</div>

        <div className="grid grid-cols-2 gap-2 my-3 text-sm">
          <div className="flex items-center">
            <span className="mr-1">Mileage:</span>
            <span className="font-medium">
              {car.mileage.toLocaleString()} KM
            </span>
          </div>
          <div className="flex items-center justify-end">
            {/* <span className="mr-1">Inspection:</span>
            {car.inspection ? (
              <div className="flex items-center">
                <Check size={16} className="text-green-500 mr-1" />
                <span className="text-green-500">Autohub</span>
              </div>
            ) : (
              <span className="text-red-500">Pending</span>
            )} */}
            <a href="/pdf/inspection.pdf" rel="noopener noreferrer" download>
              <Button
                variant="primary"
                className="hover:bg-bgLight h-[1.6rem] text-[.8rem]"
              >
                Download
              </Button>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-sm mb-2">
            <div className="text-gray-600">Reserve Price</div>
            <div className="font-semibold">
              AED {car.reservePrice.toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <div className="text-gray-600">Current Bid</div>
            <div className="font-semibold">
              AED {car.currentBid.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>{car.timeRemaining}</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="h-[1.7rem] rounded-[.7rem] flex justify-center items-center text-[.86rem]"
          >
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuctionTile;
