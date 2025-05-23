import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LocationInput from "./LocationInput";
import TimePicker from "./TimePicker";
import FrequencySelector from "./FrequencySelector";
import CostResults from "./CostResults";
import { calculateMonthlyCost } from "./salikCalculator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SalikCostEstimator = () => {
  // Form state
  const [homeLocation, setHomeLocation] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("08:00");
  const [returnTime, setReturnTime] = useState("18:00");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(5);

  const [saturdayLocation, setSaturdayLocation] = useState("");
  const [saturdayTime, setSaturdayTime] = useState("10:00");
  const [sundayLocation, setSundayLocation] = useState("");
  const [sundayTime, setSundayTime] = useState("10:00");

  const [isRamadan, setIsRamadan] = useState(false);

  // Loading state
  const [isCalculating, setIsCalculating] = useState(false);

  // Results state
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    monthlyCost: 0,
    historicalData: [],
    gateInsights: [],
    detailedCalculation: {
      weekdayTrips: {
        morning: {
          cost: 0,
          breakdown: [],
        },
        evening: {
          cost: 0,
          breakdown: [],
        },
        dailyCost: 0,
        weeklyCost: 0,
        monthlyCost: 0,
      },
      weekendTrips: {
        saturday: {
          cost: 0,
          breakdown: [],
        },
        sunday: {
          cost: 0,
          breakdown: [],
        },
        weekendCost: 0,
        monthlyCost: 0,
      },
    },
  });

  const handleCalculate = async () => {
    // Validate required fields
    if (!homeLocation || !workLocation) {
      toast.error("Please enter both home and work locations");
      return;
    }

    if (!saturdayLocation) {
      setSaturdayLocation(workLocation); // Default to work location
    }

    if (!sundayLocation) {
      setSundayLocation(workLocation); // Default to work location
    }

    // Show loading state
    setIsCalculating(true);

    try {
      // Calculate the cost
      const calculationResults = await calculateMonthlyCost(
        homeLocation,
        workLocation,
        departureTime,
        returnTime,
        workDaysPerWeek,
        saturdayLocation || workLocation,
        saturdayTime,
        sundayLocation || workLocation,
        sundayTime,
        isRamadan
      );

      setResults(calculationResults);
      setShowResults(true);

      // Scroll to results
      setTimeout(() => {
        document
          .getElementById("results-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("Error calculating costs. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setShowResults(false);
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Salik Cost Estimator
        </h1>
        <p className="text-gray-600">
          Plan your budget by estimating your monthly Salik toll expenses based
          on your commute patterns.
        </p>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="commute" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="commute">Work Commute</TabsTrigger>
            <TabsTrigger value="weekend">Weekend Travel</TabsTrigger>
          </TabsList>

          <TabsContent value="commute" className="animate-slide-in">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Work Commute Details</CardTitle>
                <CardDescription>
                  Enter your typical weekday commute information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <LocationInput
                      id="home-location"
                      label="Where do you live?"
                      value={homeLocation}
                      onChange={setHomeLocation}
                      placeholder="Enter home location..."
                    />
                  </div>

                  <div>
                    <LocationInput
                      id="work-location"
                      label="Where do you work?"
                      value={workLocation}
                      onChange={setWorkLocation}
                      placeholder="Enter work location..."
                    />
                  </div>

                  <div>
                    <TimePicker
                      id="departure-time"
                      label="At what time do you leave for work?"
                      value={departureTime}
                      onChange={setDepartureTime}
                    />
                  </div>

                  <div>
                    <TimePicker
                      id="return-time"
                      label="At what time do you leave office to return home?"
                      value={returnTime}
                      onChange={setReturnTime}
                    />
                  </div>

                  <div>
                    <FrequencySelector
                      id="work-days"
                      label="How many days a week do you go to work?"
                      value={workDaysPerWeek}
                      onChange={setWorkDaysPerWeek}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ramadan-mode"
                      checked={isRamadan}
                      onCheckedChange={setIsRamadan}
                    />
                    <Label htmlFor="ramadan-mode">
                      Calculate for Ramadan period (fixed rates)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekend" className="animate-slide-in">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Weekend Travel Details</CardTitle>
                <CardDescription>
                  Enter your typical weekend travel information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Saturday</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <LocationInput
                      id="saturday-location"
                      label="Where do you usually go on Saturdays?"
                      value={saturdayLocation}
                      onChange={setSaturdayLocation}
                      placeholder="Enter Saturday destination..."
                    />
                  </div>

                  <div>
                    <TimePicker
                      id="saturday-time"
                      label="At what time do you leave?"
                      value={saturdayTime}
                      onChange={setSaturdayTime}
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium">Sunday</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <LocationInput
                      id="sunday-location"
                      label="Where do you usually go on Sundays?"
                      value={sundayLocation}
                      onChange={setSundayLocation}
                      placeholder="Enter Sunday destination..."
                    />
                  </div>

                  <div>
                    <TimePicker
                      id="sunday-time"
                      label="At what time do you leave?"
                      value={sundayTime}
                      onChange={setSundayTime}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center mb-8">
        <Button
          variant="primary"
          onClick={handleCalculate}
        //   className="px-8 py-6 text-lg bg-salik-blue hover:bg-salik-darkblue"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Calculating...
            </>
          ) : (
            "Calculate Estimated Cost"
          )}
        </Button>
      </div>

      {showResults && (
        <div id="results-section" className="mt-12 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Results</h2>
            <Button variant="outline" onClick={resetForm}>
              Try with a different schedule
            </Button>
          </div>

          <CostResults
            monthlyCost={results.monthlyCost}
            historicalData={results.historicalData}
            gateInsights={results.gateInsights}
            detailedCalculation={results.detailedCalculation}
          />

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-themeDark">
            <h3 className="font-medium mb-2">Salik Toll Rates</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Peak Hours (6:00 AM – 10:00 AM & 4:00 PM – 8:00 PM): AED 6 per
                crossing.
              </li>
              <li>
                Off-Peak Hours (10:00 AM – 4:00 PM & 8:00 PM – 1:00 AM): AED 4
                per crossing.
              </li>
              <li>Late Night (1:00 AM – 6:00 AM 7 days a week): No tariff.</li>
              <li>
                Sundays (excluding public holidays and events): AED 4 including
                peak and off-peak hours, excluding late night hours.
              </li>
              <li>During Ramadan: Fixed rate applies.</li>
            </ul>
            <p className="text-gray-600 italic mt-4">
              Estimates assume normal traffic patterns. Actual tolls may vary
              based on route changes, special events, or construction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalikCostEstimator;
