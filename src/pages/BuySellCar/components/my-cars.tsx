
import React from 'react';
import { MyCar } from '@/data/auction-data';
import { Button } from '@/components/ui/button';
import { Check, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type MyCarsProps = {
  cars: MyCar[];
};

const MyCars: React.FC<MyCarsProps> = ({ cars }) => {
  const { toast } = useToast();

  const handleRelist = (car: MyCar) => {
    toast({
      title: "Car Relisted",
      description: `Your ${car.year} ${car.make} ${car.model} has been relisted for another auction.`,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Cars</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <div key={car.id} className="tile overflow-hidden">
            <div className="relative">
              <img 
                src={car.image} 
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
                {car.plate}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{car.year} {car.make} {car.model}</h3>
                  <div className="text-gray-600">{car.color}</div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
                  Purchased
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 my-3 text-sm">
                <div className="flex items-center">
                  <span className="mr-1">Mileage:</span> 
                  <span className="font-medium">{car.mileage.toLocaleString()} KM</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">Purchased:</span>
                  <span className="font-medium">{car.purchaseDate}</span>
                </div>
              </div>
              
              <div className="bg-bgLight p-3 rounded-lg my-3">
                <div className="flex items-center text-sm text-themeDark">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    Can be relisted within <span className="font-semibold">{car.relistDaysRemaining} days</span>
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-sm mb-2">
                  <div className="text-gray-600">Purchase Price</div>
                  <div className="font-semibold">AED {car.purchasePrice.toLocaleString()}</div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <div className="text-gray-600">Relist Cost</div>
                  <div className="font-semibold">AED 99</div>
                </div>
              </div>
              
              <Button variant='primary' onClick={() => handleRelist(car)} className="w-full">
                Relist This Car
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
        <div className="flex gap-2 items-center">
          <div className="text-amber-600 font-bold text-xl">💡</div>
          <p className="text-sm text-amber-800">
            <span className="font-medium">Tip:</span> Cars can be relisted for just AED 99 within 30 days of purchase.
            Relisted cars appear in the auction immediately with no additional inspection required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyCars;
