
import React, { useState } from 'react';
import { Car } from '@/data/auction-data';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type VehicleModalProps = {
  car: Car | null;
  onClose: () => void;
};

const VehicleModal: React.FC<VehicleModalProps> = ({ car, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState<number | ''>('');
  const [offerAmount, setOfferAmount] = useState<number | ''>('');
  const { toast } = useToast();

  if (!car) return null;

  // For demo, we'll just use the same image 5 times
  const images = Array(5).fill(car.image);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlePlaceBid = () => {
    if (bidAmount && typeof bidAmount === 'number') {
      toast({
        title: "Bid Placed",
        description: `Your bid of AED ${bidAmount.toLocaleString()} has been placed successfully.`,
      });
      onClose();
    } else {
      toast({
        title: "Invalid Bid",
        description: "Please enter a valid bid amount.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitOffer = () => {
    if (offerAmount && typeof offerAmount === 'number') {
      toast({
        title: "Offer Submitted",
        description: `Your offer of AED ${offerAmount.toLocaleString()} will be shared with the seller after the auction ends.`,
      });
      onClose();
    } else {
      toast({
        title: "Invalid Offer",
        description: "Please enter a valid offer amount.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-xl">{car.year} {car.make} {car.model}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-auto">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between p-2">
              <button 
                onClick={prevImage}
                className="bg-white/80 hover:bg-white rounded-full p-1"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="bg-white/80 hover:bg-white rounded-full p-1"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 px-2 rounded-md text-xs">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-600">Make & Model:</div>
                  <div>{car.make} {car.model}</div>
                  <div className="text-gray-600">Year:</div>
                  <div>{car.year}</div>
                  <div className="text-gray-600">Color:</div>
                  <div>{car.color}</div>
                  <div className="text-gray-600">Plate:</div>
                  <div>{car.plate}</div>
                  <div className="text-gray-600">Mileage:</div>
                  <div>{car.mileage.toLocaleString()} KM</div>
                  <div className="text-gray-600">Engine:</div>
                  <div>{car.specs?.engine || "N/A"}</div>
                  <div className="text-gray-600">Transmission:</div>
                  <div>{car.specs?.transmission || "N/A"}</div>
                  <div className="text-gray-600">Interior:</div>
                  <div>{car.specs?.interiorColor || "N/A"}</div>
                  <div className="text-gray-600">Inspection:</div>
                  <div className="flex items-center">
                    {car.inspection ? (
                      <>
                        <Check size={16} className="text-green-500 mr-1" />
                        <span className="text-green-500">240-point Autohub</span>
                      </>
                    ) : (
                      <span>Not Inspected</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Place Your Bid</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <div className="text-gray-600">Reserve Price</div>
                    <div className="font-medium">AED {car.reservePrice.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <div className="text-gray-600">Current Bid</div>
                    <div className="font-medium">AED {car.currentBid.toLocaleString()}</div>
                  </div>

                  <label className="block text-sm font-medium mb-1">Your Bid (AED)</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Enter your bid amount"
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    min={car.currentBid + 500}
                    step={500}
                  />
                  <Button variant='primary' onClick={handlePlaceBid} className='w-full'>
                    Place Bid
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-2">Or Make an Offer Below Base</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Your offer will be shown to the seller privately after the auction ends
                  </p>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Enter your offer amount"
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    max={car.reservePrice - 1}
                    step={500}
                  />
                  <Button onClick={handleSubmitOffer} variant="outline" className='w-full border border-themeDark text-themeDark hover:text-btn-themeDark'>
                    Submit Offer Below Base
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
