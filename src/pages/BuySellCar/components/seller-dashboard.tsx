import React from "react";
import { SellerCar } from "@/data/auction-data";
import { Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

type SellerDashboardProps = {
  cars: SellerCar[];
};

const SellerDashboard: React.FC<SellerDashboardProps> = ({ cars }) => {
  const { toast } = useToast();

  const handleAcceptBid = (car: SellerCar) => {
    toast({
      title: "Bid Accepted",
      description: `You have accepted the bid of AED ${car.bestBid.toLocaleString()} for your ${
        car.year
      } ${car.make} ${car.model}.`,
    });
  };

  const handleAdjustPrice = (car: SellerCar) => {
    toast({
      title: "Price Adjustment",
      description:
        "This feature is coming soon. You'll be able to adjust your base price here.",
    });
  };

  const handleCreateListing = () => {
    toast({
      title: "Create New Listing",
      description:
        "You'll be guided through the process of listing your car for auction.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Listings</h2>
        <Button
          variant="primary"
          onClick={handleCreateListing}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Create New Listing
        </Button>
      </div>

      {cars.length > 0 ? (
        cars.map((car) => (
          <div key={car.id} className="tile mb-6 overflow-hidden bg-[#bdbdbd3e]">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-48 md:h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
                  {car.plate}
                </div>
              </div>

              <div className="p-4 md:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-xl">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="text-gray-600">{car.color}</div>
                  </div>
                  <div className="px-3 py-1 bg-[#2595be20] text-themeDark rounded-full text-sm font-medium">
                    {car.auctionStatus}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Mileage</div>
                    <div className="font-medium">
                      {car.mileage.toLocaleString()} KM
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Inspection Status
                    </div>
                    <div className="font-medium flex items-center">
                      {car.inspectionStatus === "Done" ? (
                        <>
                          <Check size={16} className="text-green-500 mr-1" />
                          <span className="text-green-500">
                            {car.inspectionStatus} by Autohub
                          </span>
                        </>
                      ) : (
                        <span>{car.inspectionStatus}</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Base Price</div>
                    <div className="font-medium">
                      AED {car.reservePrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Photo Status
                    </div>
                    <div className="font-medium flex items-center">
                      {car.photoStatus === "Complete" ? (
                        <>
                          <Check size={16} className="text-green-500 mr-1" />
                          <span className="text-green-500">
                            360° {car.photoStatus}
                          </span>
                        </>
                      ) : (
                        <span>{car.photoStatus}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-bgLight p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Best Bid Received
                      </div>
                      <div className="font-semibold text-lg">
                        AED {car.bestBid.toLocaleString()}
                        {car.bestBid < car.reservePrice && (
                          <span className="text-amber-600 text-sm ml-2">
                            (Below Base)
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="primary" onClick={() => handleAcceptBid(car)}>
                      Accept Best Bid
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAdjustPrice(car)}
                    className="bg-transparent border border-themeDark text-themeDark hover:text-btn-themeDark"
                  >
                    Adjust Base Price
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-tile text-center">
          <div className="text-gray-500 mb-4">
            You don't have any listings yet
          </div>
          <Button
            onClick={handleCreateListing}
            className="flex items-center gap-2 mx-auto"
          >
            <Plus size={16} />
            Create Your First Listing
          </Button>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
        <div className="flex gap-2 items-center">
          <div className="text-amber-600 font-bold text-xl">🎯</div>
          <p className="text-sm text-amber-800">
            <span className="font-medium">Tip:</span> Set realistic base prices
            to maximize your chances of selling. Best bids below base will be
            shown to you privately at the end of each auction day.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-tile">
          <div className="text-sm text-gray-600 mb-1">My Listed Cars</div>
          <div className="font-semibold text-xl">2</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-tile">
          <div className="text-sm text-gray-600 mb-1">Avg Time to Sale</div>
          <div className="font-semibold text-xl">3 Days</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-tile">
          <div className="text-sm text-gray-600 mb-1">Best Bid Received</div>
          <div className="font-semibold text-xl">AED 77,500</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-tile">
          <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
          <div className="font-semibold text-xl">90%</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-tile">
          <div className="text-sm text-gray-600 mb-1">Relist Cost</div>
          <div className="font-semibold text-xl">AED 99</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-tile">
          <div className="text-sm text-gray-600 mb-1">Offline Offers Sales</div>
          <div className="font-semibold text-xl">28%</div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
