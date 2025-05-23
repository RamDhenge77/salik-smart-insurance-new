import React from "react";

const Header = () => {
  return (
    <div className="mb-10 text-center max-w-xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-zinc-800 rounded-lg shadow-xl flex items-center justify-center">
          <div className="text-amber-400 font-bold text-2xl">VIP</div>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-800">
        Salik Souq <span className="text-amber-500">VIP</span> Membership
      </h1>
      <p className="text-lg md:text-[1rem] text-gray-600 max-w-xl mx-auto">
        Drive smarter. Earn more. Get treated like a{" "}
        <span className="font-semibold text-amber-500">VIP</span>.
      </p>
    </div>
  );
};

export default Header;
