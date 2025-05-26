import React from "react";

type HowItWorksProps = {
  steps: string[];
  title?: string;
};

const HowItWorks: React.FC<HowItWorksProps> = ({
  steps,
  title = "How It Works",
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-tile mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-themeDark text-white font-semibold z-30">
                {index + 1}
              </div>
              {index < steps.length && (
                <div className="w-0.5 h-4 bg-gray-300 my-1"></div>
              )}
              <div className="text-center text-sm mt-2 font-normal text-black">{step}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-5 left-[calc(50%+16px)] w-[calc(100%-20px)] h-0.5 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
