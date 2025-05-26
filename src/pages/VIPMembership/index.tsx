import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BenefitsSection from "./components/BenefitsSection";
import SubscriptionSection from "./components/SubscriptionSection";
import SavingsTracker from "./components/SavingsTracker";
import VIPLogo from "./components/VIPLogo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useCarContext } from "@/context/Context";

const VIPMembership = () => {
  const { isSubscribed, setIsSubscribed, setSubscriptionPeriod, collapsed } =
    useCarContext();
  const [savings, setSavings] = useState(0);
  const [theme, setTheme] = useState("light");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Check subscription status from localStorage on component mount
  useEffect(() => {
    const checkSubscription = () => {
      const subscriptionStatus = localStorage.getItem("vipSubscribed");
      if (subscriptionStatus === "true") {
        setIsSubscribed(true);
        setTheme("subscribed");

        // Get saved savings amount if exists
        const savedSavings = localStorage.getItem("vipSavings");
        if (savedSavings) {
          setSavings(parseFloat(savedSavings));
        }
      } else {
        // Ensure we have a clean state if not subscribed
        setIsSubscribed(false);
        setTheme("light");
      }
    };

    checkSubscription();

    // This simulates savings increasing over time for subscribed users
    let interval: number | undefined;
    if (isSubscribed) {
      interval = window.setInterval(() => {
        setSavings((prev) => {
          const newSavings = prev + Math.random() * 5;
          const capped = Math.min(newSavings, 200); // Cap at 200 AED for demo
          localStorage.setItem("vipSavings", capped.toString());
          return capped;
        });
      }, 10000); // Update every 10 seconds for demo
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSubscribed]);

  const handleSubscription = () => {
    setIsSubscribed(true);
    setTheme("subscribed");
    localStorage.setItem("vipSubscribed", "true");
    setSavings(0); // Initialize savings at 0
    localStorage.setItem("vipSavings", "0");
  };

  const confirmCancelSubscription = () => {
    setSubscriptionPeriod(0); // Reset subscription period
    setIsSubscribed(false);
    setTheme("light");
    localStorage.removeItem("vipSubscribed");
    localStorage.removeItem("vipSavings");
    setSavings(0);
    setShowCancelDialog(false);
  };

  const containerClasses =
    theme === "subscribed"
      ? "container mx-auto px-4 pb-5 max-w-7xl min-h-screen"
      : "container mx-auto px-4 pb-5 max-w-7xl min-h-screen";

  return (
    <div
      className={`${containerClasses} relative `}
      // style={{ backgroundImage: "url('/lovable-uploads/burj-khalifa.png')" }}
    >
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {/* Background image */}
        <div
          className="w-full h-full bg-cover transition-[background-position] duration-200"
          style={{
            backgroundImage: "url('/lovable-uploads/burj-khalifa2.png')",
            backgroundPosition: `${collapsed?'-2rem':'4rem'} 30%`,
          }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* Bottom fade */}
          {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#ffff]" /> */}
        </div>
      </div>
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-0" /> */}
      {isSubscribed && (
        <>
          {/* <VIPLogo className="absolute top-0 right-4 w-20 h-20 md:w-24 md:h-24" /> */}
          <div className="absolute -top-2 right-0 z-30">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowCancelDialog(true)}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Cancel Subscription
            </Button>
          </div>
        </>
      )}
      <div className="space-y-8 relative mt-2">
        <Header />
        {isSubscribed && (
          <SavingsTracker isSubscribed={isSubscribed} savings={savings} />
        )}
        <BenefitsSection theme={theme} />
        <SubscriptionSection
          onSubscribe={handleSubscription}
          isSubscribed={isSubscribed}
        />
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel VIP Membership?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your VIP membership? You will lose
              all accumulated savings and benefits immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              className="hover:bg-bgLight"
              onClick={() => setShowCancelDialog(false)}
            >
              Keep Membership
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmCancelSubscription()}
            >
              Yes, Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VIPMembership;
