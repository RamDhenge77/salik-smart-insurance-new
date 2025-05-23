
import React from "react";
import BenefitTile from "./BenefitTile";
import { BadgeDollarSign, ShieldCheck, Ambulance, ChartLine } from "lucide-react";

interface BenefitsSectionProps {
  theme?: string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ theme = "light" }) => {
  const benefits = [
    {
      title: "Premium Cashback",
      description:
        "Get exclusive cashback on every spend across Salik services. Credited directly to your Salik Wallet.",
      icon: BadgeDollarSign,
    },
    {
      title: "Priority Access",
      description:
        "Skip the queue with priority booking and dedicated VIP support on all services.",
      icon: ShieldCheck,
    },
    {
      title: "Premium Roadside Assistance",
      description: "24/7 premium roadside assistance, just one tap away whenever you need help.",
      icon: Ambulance,
    },
    {
      title: "VIP Savings Tracker",
      description: "Real-time tracking of your membership savings, with detailed monthly reports.",
      icon: ChartLine,
    },
  ];

  const headerClass = "text-3xl font-bold mb-8 text-center text-gray-800";

  return (
    <div className="mb-16">
      <h2 className={headerClass}>
        <span className={theme === "subscribed" ? "text-amber-500" : "text-blue-600"}>Exclusive</span> VIP Benefits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <BenefitTile
            key={benefit.title}
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
