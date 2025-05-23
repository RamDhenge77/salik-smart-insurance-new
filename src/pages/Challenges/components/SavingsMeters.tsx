import React from "react";

interface SavingsMetersProps {
  co2Saved: number;
  treesPlanted: number;
  maxCO2: number;
  maxTrees: number;
}

const SavingsMeters = ({
  co2Saved,
  treesPlanted,
  maxCO2,
  maxTrees,
}: SavingsMetersProps) => {
  // Calculate rotation degrees for speedometers (0 to 180 degrees)
  const co2Degrees = Math.min((co2Saved / maxCO2) * 180, 180);
  const treesDegrees = Math.min((treesPlanted / maxTrees) * 180, 180);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="eco-card relative overflow-hidden shadow-md border border-eco-gray p-6 transition-all duration-300 hover:shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
          }}
        />
        <div className="relative z-10">
          <h3 className="text-center text-lg font-medium mb-4">
            CO₂ Saved This Month
          </h3>
          <div className="speedometer mb-4">
            <div className="speedometer-background"></div>
            <div
              className="speedometer-dial"
              style={{ transform: `translateX(-50%) rotate(${co2Degrees}deg)` }}
            ></div>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-eco-green">
              {co2Saved}
            </span>
            <span className="text-xl ml-1">kg</span>
          </div>
          <div className="mt-3">
            <div className="gauge-wrapper">
              <div
                className="gauge-fill"
                style={{ width: `${(co2Saved / maxCO2) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-eco-gray-dark">
              <span>0 kg</span>
              <span>{maxCO2} kg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="eco-card relative overflow-hidden shadow-md border border-eco-gray p-6 transition-all duration-300 hover:shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
          }}
        />
        <div className="relative z-10">
          <h3 className="text-center text-lg font-medium mb-4">
            Trees Equivalent
          </h3>
          <div className="speedometer mb-4">
            <div className="speedometer-background"></div>
            <div
              className="speedometer-dial"
              style={{
                transform: `translateX(-50%) rotate(${treesDegrees}deg)`,
              }}
            ></div>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-eco-green">
              {treesPlanted}
            </span>
            <span className="text-xl ml-1">trees</span>
          </div>
          <div className="mt-3">
            <div className="gauge-wrapper">
              <div
                className="gauge-fill"
                style={{ width: `${(treesPlanted / maxTrees) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-eco-gray-dark">
              <span>0 trees</span>
              <span>{maxTrees} trees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsMeters;
