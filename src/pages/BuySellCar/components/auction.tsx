
import React, { useState } from 'react';
import Layout from './layout';
import HowItWorks from './how-it-works';
import AuctionTile from './auction-tile';
import VehicleModal from './vehicle-modal';
import SellerDashboard from './seller-dashboard';
import MyCars from './my-cars';
import { buyingSteps, sellingSteps, mockCars, mockSellerCars, mockMyCars, Car } from '@/data/auction-data';

const Auction = () => {
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell' | 'mycars'>('buy');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  const handleTileClick = (car: Car) => {
    setSelectedCar(car);
  };
  
  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <Layout selectedTab={selectedTab} onTabChange={setSelectedTab}>
      {selectedTab === 'buy' ? (
        <div className="animate-fade-in">
          <HowItWorks steps={buyingSteps} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {mockCars.map((car) => (
              <AuctionTile 
                key={car.id}
                car={car} 
                onTileClick={handleTileClick}
              />
            ))}
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6">
            <div className="flex items-center gap-2">
              <div className="text-amber-600 font-bold text-xl">💡</div>
              <div>
                <h3 className="font-semibold">Bought for Resale?</h3>
                <p className="text-sm text-amber-800">
                  Instantly list this car on Salik Auctions or Direct Sales for just AED 99
                </p>
              </div>
              <div className="ml-auto">
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm">
                  Relist Now
                </button>
              </div>
            </div>
          </div>
          
          {selectedCar && (
            <VehicleModal car={selectedCar} onClose={handleCloseModal} />
          )}
        </div>
      ) : selectedTab === 'sell' ? (
        <div className="animate-fade-in">
          <HowItWorks steps={sellingSteps} />
          <SellerDashboard cars={mockSellerCars} />
        </div>
      ) : (
        <div className="animate-fade-in">
          <MyCars cars={mockMyCars} />
        </div>
      )}
    </Layout>
  );
};

export default Auction;
