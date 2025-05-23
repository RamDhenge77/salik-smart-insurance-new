
// This file contains utility functions to calculate Salik costs

import { getRouteWithTollGates } from '../../../utils/mapsDirections';
import { TOLL_GATES, getTariffType } from '../../../utils/salikData';

// Helper function to get the day of week for a given date
const getDayOfWeek = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

// Helper function to get month name offset from current month
function getMonthName(offset: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + offset);
  return date.toLocaleString('default', { month: 'short' });
}

// Calculate toll for a single trip using the Directions API
const calculateTripToll = async (
  start: string, 
  end: string, 
  time: string, 
  dayOfWeek: string,
  isRamadan: boolean = false,
  apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY"
): Promise<{ 
  totalCost: number; 
  gatesCrossed: number[]; 
  breakdown: Array<{ 
    gateId: number; 
    gateName: string; 
    tariffType: string; 
    rate: number;
    crossingTime?: string;
  }>;
  routeData?: {
    distance: number;
    duration: number;
    directions: google.maps.DirectionsResult | null;
  };
}> => {
  // Parse time string and create a date object for the departure
  const [hours, minutes] = time.split(':').map(Number);
  const departureDate = new Date();
  
  // Set the day of week
  const currentDay = departureDate.getDay();
  const targetDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayOfWeek);
  const daysToAdd = (targetDay - currentDay + 7) % 7;
  departureDate.setDate(departureDate.getDate() + daysToAdd);
  
  // Set the time
  departureDate.setHours(hours, minutes, 0, 0);
  
  // Get route and toll gates crossed
  const routeData = await getRouteWithTollGates(start, end, departureDate, apiKey);
  
  const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
  
  const breakdown = routeData.tollGatesCrossed.map(gateCrossed => {
    const { type, rate } = getTariffType(`${dayOfWeek} ${gateCrossed.crossingTime}`, isWeekend, isRamadan);
    
    return {
      gateId: gateCrossed.id,
      gateName: gateCrossed.name,
      tariffType: type,
      rate,
      crossingTime: gateCrossed.crossingTime
    };
  });
  
  const totalCost = breakdown.reduce((sum, item) => sum + item.rate, 0);
  const gatesCrossed = routeData.tollGatesCrossed.map(gate => gate.id);
  
  return {
    totalCost,
    gatesCrossed,
    breakdown,
    routeData: {
      distance: routeData.distance,
      duration: routeData.duration,
      directions: routeData.directions
    }
  };
};

// Calculate monthly cost estimate
export const calculateMonthlyCost = async (
  homeLocation: string,
  workLocation: string,
  departureTime: string,
  returnTime: string,
  workDaysPerWeek: number,
  saturdayLocation: string,
  saturdayTime: string,
  sundayLocation: string,
  sundayTime: string,
  isRamadan: boolean = false,
  apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY"
): Promise<{
  monthlyCost: number;
  historicalData: Array<{ month: string; actual: number; estimated?: number }>;
  gateInsights: Array<{ 
    id: number;
    name: string; 
    count: number; 
    cost: number; 
    change: "increase" | "decrease" | "same";
    estimated: number;
    actual: number;
  }>;
  detailedCalculation: {
    weekdayTrips: {
      morning: {
        cost: number;
        breakdown: Array<{ gateId: number; gateName: string; tariffType: string; rate: number; crossingTime?: string }>;
        routeData?: {
          distance: number;
          duration: number;
        };
      };
      evening: {
        cost: number;
        breakdown: Array<{ gateId: number; gateName: string; tariffType: string; rate: number; crossingTime?: string }>;
        routeData?: {
          distance: number;
          duration: number;
        };
      };
      dailyCost: number;
      weeklyCost: number;
      monthlyCost: number;
    };
    weekendTrips: {
      saturday: {
        cost: number;
        breakdown: Array<{ gateId: number; gateName: string; tariffType: string; rate: number; crossingTime?: string }>;
        routeData?: {
          distance: number;
          duration: number;
        };
      };
      sunday: {
        cost: number;
        breakdown: Array<{ gateId: number; gateName: string; tariffType: string; rate: number; crossingTime?: string }>;
        routeData?: {
          distance: number;
          duration: number;
        };
      };
      weekendCost: number;
      monthlyCost: number;
    };
  }
}> => {
  // Calculate workday commute cost
  const morningCommute = await calculateTripToll(
    homeLocation, 
    workLocation, 
    departureTime, 
    "Monday", // Use Monday as a representative workday
    isRamadan,
    apiKey
  );
  
  const eveningCommute = await calculateTripToll(
    workLocation, 
    homeLocation, 
    returnTime, 
    "Monday", // Use Monday as a representative workday
    isRamadan,
    apiKey
  );
  
  // Daily work commute cost (both ways)
  const dailyWorkCommuteCost = morningCommute.totalCost + eveningCommute.totalCost;
  
  // Weekly work commute cost
  const weeklyWorkCommuteCost = dailyWorkCommuteCost * workDaysPerWeek;
  
  // Weekend costs
  const saturdayTrip = await calculateTripToll(
    homeLocation, 
    saturdayLocation, 
    saturdayTime, 
    "Saturday",
    isRamadan,
    apiKey
  );
  
  const sundayTrip = await calculateTripToll(
    homeLocation, 
    sundayLocation, 
    sundayTime, 
    "Sunday",
    isRamadan,
    apiKey
  );
  
  const weekendCost = saturdayTrip.totalCost + sundayTrip.totalCost;
  
  // Monthly cost estimate (4.3 weeks per month on average)
  const monthlyWorkCommuteCost = weeklyWorkCommuteCost * 4.3;
  const monthlyWeekendCost = weekendCost * 4.3;
  const totalMonthlyCost = monthlyWorkCommuteCost + monthlyWeekendCost;
  
  // Create detailed calculation object
  const detailedCalculation = {
    weekdayTrips: {
      morning: {
        cost: morningCommute.totalCost,
        breakdown: morningCommute.breakdown,
        routeData: morningCommute.routeData ? {
          distance: morningCommute.routeData.distance,
          duration: morningCommute.routeData.duration
        } : undefined
      },
      evening: {
        cost: eveningCommute.totalCost,
        breakdown: eveningCommute.breakdown,
        routeData: eveningCommute.routeData ? {
          distance: eveningCommute.routeData.distance,
          duration: eveningCommute.routeData.duration
        } : undefined
      },
      dailyCost: dailyWorkCommuteCost,
      weeklyCost: weeklyWorkCommuteCost,
      monthlyCost: monthlyWorkCommuteCost
    },
    weekendTrips: {
      saturday: {
        cost: saturdayTrip.totalCost,
        breakdown: saturdayTrip.breakdown,
        routeData: saturdayTrip.routeData ? {
          distance: saturdayTrip.routeData.distance,
          duration: saturdayTrip.routeData.duration
        } : undefined
      },
      sunday: {
        cost: sundayTrip.totalCost,
        breakdown: sundayTrip.breakdown,
        routeData: sundayTrip.routeData ? {
          distance: sundayTrip.routeData.distance,
          duration: sundayTrip.routeData.duration
        } : undefined
      },
      weekendCost: weekendCost,
      monthlyCost: monthlyWeekendCost
    }
  };
  
  // Generate historical data
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const months = [
    getMonthName(-3), 
    getMonthName(-2), 
    getMonthName(-1), 
    currentMonth
  ];
  
  // Create historical data with random variations around the estimate
  const historicalData = [
    { month: months[0], actual: Math.round(totalMonthlyCost * (0.9 + Math.random() * 0.2)) },
    { month: months[1], actual: Math.round(totalMonthlyCost * (0.9 + Math.random() * 0.2)) },
    { month: months[2], actual: Math.round(totalMonthlyCost * (0.9 + Math.random() * 0.2)) },
    { month: months[3], actual: 0, estimated: Math.round(totalMonthlyCost) }
  ];
  
  // Generate gate insights
  const allGatesCrossed = [
    ...morningCommute.gatesCrossed,
    ...eveningCommute.gatesCrossed,
    ...saturdayTrip.gatesCrossed,
    ...sundayTrip.gatesCrossed
  ];
  
  // Count frequency of each gate
  const gateCounts = allGatesCrossed.reduce((acc, gateId) => {
    acc[gateId] = (acc[gateId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const gateInsights = Object.entries(gateCounts).map(([gateId, count]) => {
    const gate = TOLL_GATES.find(g => g.id === Number(gateId));
    const avgRate = [...morningCommute.breakdown, ...eveningCommute.breakdown]
      .filter(b => b.gateId === Number(gateId))
      .reduce((sum, b) => sum + b.rate, 0) / 2 || 4; // Default to 4 if no breakdown data
    
    const monthlyCost = count * avgRate * 4.3; // Monthly cost
    const actualCost = monthlyCost * (0.9 + Math.random() * 0.2); // Simulate actual cost
    
    // Fix the type error by ensuring change is one of the allowed values
    const changeValue = actualCost > monthlyCost 
      ? "increase" as const
      : actualCost < monthlyCost 
        ? "decrease" as const
        : "same" as const;
    
    return {
      id: Number(gateId),
      name: gate?.name || `Gate ${gateId}`,
      count: Math.round(count * 4.3), // Monthly trips
      cost: Math.round(monthlyCost), // Monthly estimated cost
      estimated: Math.round(monthlyCost),
      actual: Math.round(actualCost),
      change: changeValue
    };
  });
  
  return {
    monthlyCost: Math.round(totalMonthlyCost),
    historicalData,
    gateInsights,
    detailedCalculation
  };
};
