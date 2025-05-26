import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Star, CircleDollarSign } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: number) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );
  const price = billingPeriod === "monthly" ? "29" : "19";
  const annualAmount = "228"; // 19 * 12

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-lg sm:max-w-lg rounded-xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-amber-500 rounded-full">
              <Star className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Confirm VIP Membership
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 mb-8 space-y-6 text-center px-4">
          <p className="text-gray-700">
            Select your preferred billing period and confirm your subscription
            to unlock exclusive VIP benefits.
          </p>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-4 rounded-lg border ${
                billingPeriod === "monthly"
                  ? "border-amber-300 bg-amber-50 shadow-md"
                  : "border-gray-200 bg-white"
              } transition-all duration-200`}
            >
              <div className="font-semibold text-gray-800 mb-1">Monthly</div>
              <div className="flex items-center justify-center text-lg">
               <img src="/lovable-uploads/dirham-orange.svg" className="h-5 mr-1" alt="" />
                <span className="font-medium">AED 29/month</span>
              </div>
            </button>

            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-4 rounded-lg border relative ${
                billingPeriod === "annual"
                  ? "border-amber-300 bg-amber-50 shadow-md"
                  : "border-gray-200 bg-white"
              } transition-all duration-200`}
            >
              {billingPeriod === "annual" && (
                <div className="absolute -top-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                  Best Value
                </div>
              )}
              <div className="font-semibold text-gray-800 mb-1">Annual</div>
              <div className="flex items-center justify-center text-lg">
               <img src="/lovable-uploads/dirham-orange.svg" className="h-5 mr-1" alt="" />
                <span className="font-medium">AED 19/month</span>
              </div>
              <div className="text-xs text-gray-500">
                Billed as AED {annualAmount}/year
              </div>
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-600 font-medium">
              {billingPeriod === "monthly" ? (
                <span>
                  Monthly Subscription:{" "}
                  <span className="font-bold text-amber-500">
                    AED {price}/month
                  </span>
                </span>
              ) : (
                <span>
                  Annual Subscription:{" "}
                  <span className="font-bold text-amber-500">
                    AED {annualAmount}/year
                  </span>
                </span>
              )}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              By confirming, you authorize Salik Souq to charge your Salik
              Wallet for this subscription. Your subscription will automatically
              renew until canceled.
            </p>
          </div>
        </div>

        <DialogFooter className="flex space-x-3 justify-center sm:justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full px-6 border-gray-300 hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8"
            onClick={() => onConfirm(2)}
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm & Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
