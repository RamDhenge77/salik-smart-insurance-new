import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SubscriptionModal from "./SubscriptionModal";
import { Star, CircleDollarSign } from "lucide-react";
import { useCarContext } from "@/context/Context";

interface SubscriptionSectionProps {
  onSubscribe: () => void;
  isSubscribed: boolean;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  onSubscribe,
  isSubscribed,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { setSubscriptionPeriod } = useCarContext();

  const handleSubscribe = (type = 1) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setIsModalOpen(false);
    onSubscribe();
    setSubscriptionPeriod(type);
    toast({
      title: "VIP Membership Activated",
      description:
        "Welcome to Salik Souq VIP. Your premium journey begins now.",
      duration: 5000,
    });
  };

  // Don't render component when user is subscribed
  if (isSubscribed) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-white rounded-xl p-10 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500 rounded-full shadow-lg">
            <Star className="h-8 w-8 text-white" fill="white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          <span className="text-amber-500">Upgrade</span> to Premium Experience
        </h2>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-100 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center">
            <div className="text-xl mb-1 font-bold">Monthly</div>
            <div className="flex items-center">
              <img src="/lovable-uploads/dirham-orange.svg" className="h-5 mr-1" alt="" />
              <span className="font-medium text-lg">AED 29/month</span>
            </div>
          </div>

          <div className="bg-amber-50 px-6 py-4 rounded-lg border border-amber-100 shadow-md hover:shadow-lg transition-all cursor-pointer relative">
            <div className="absolute -top-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
              Best Value
            </div>
            <div className="text-xl mb-1 font-bold">Annual</div>
            <div className="flex items-center">
              <img src="/lovable-uploads/dirham-orange.svg" className="h-5 mr-1" alt="" />
              <span className="font-medium text-lg">AED 19/month</span>
            </div>
            <div className="text-xs text-gray-500">Billed as AED 228/year</div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto transition-all duration-300 rounded-full flex items-center justify-center mx-auto font-semibold text-white px-12 py-5 text-xl bg-amber-500 hover:bg-amber-600 shadow-lg hover:shadow-xl hover:translate-y-[-2px] animate-pulse"
        >
          Subscribe to VIP Today
        </button>
      </div>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubscribe}
      />
    </div>
  );
};

export default SubscriptionSection;
