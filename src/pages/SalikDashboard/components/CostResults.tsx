import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HistoricalData {
  month: string;
  actual: number;
  estimated?: number;
}

interface GateInsight {
  id: number;
  name: string;
  count: number;
  cost: number;
  change: "increase" | "decrease" | "same";
  estimated: number;
  actual: number;
}

interface TripBreakdown {
  gateId: number;
  gateName: string;
  tariffType: string;
  rate: number;
  crossingTime?: string;
}

interface RouteData {
  distance: number;
  duration: number;
}

interface TripData {
  cost: number;
  breakdown: TripBreakdown[];
  routeData?: RouteData;
}

interface WeekdayTrips {
  morning: TripData;
  evening: TripData;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
}

interface WeekendTrips {
  saturday: TripData;
  sunday: TripData;
  weekendCost: number;
  monthlyCost: number;
}

interface DetailedCalculation {
  weekdayTrips: WeekdayTrips;
  weekendTrips: WeekendTrips;
}

interface CostResultsProps {
  monthlyCost: number;
  historicalData: HistoricalData[];
  gateInsights: GateInsight[];
  detailedCalculation: DetailedCalculation;
}

// Helper function to format distance and duration
const formatDistance = (meters: number): string => {
  if (!meters) return "N/A";
  return meters < 1000 ? `${meters}m` : `${(meters / 1000).toFixed(1)}km`;
};

const formatDuration = (seconds: number): string => {
  if (!seconds) return "N/A";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const CostResults = ({
  monthlyCost,
  historicalData,
  gateInsights,
  detailedCalculation,
}: CostResultsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-fade-in">
      <Card className="col-span-1 md:col-span-2 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Monthly Estimated Salik Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center">
            <div className="text-5xl font-bold text-themeDark">
              AED {monthlyCost.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Cost Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={historicalData}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                label={{ value: "AED", angle: -90, position: "insideLeft" }}
              />
              <Tooltip formatter={(value) => [`AED ${value}`, "Amount"]} />
              <Legend />
              <Bar
                dataKey="actual"
                name="Actual Spend"
                fill="#607d8b"
                radius={[4, 4, 0, 0]}
                className="animate-bar-grow"
              />
              <Bar
                dataKey="estimated"
                name="Estimated"
                fill="#1e88e5"
                radius={[4, 4, 0, 0]}
                className="animate-bar-grow"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Gate-Level Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-64 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gate</TableHead>
                  <TableHead>Trips</TableHead>
                  <TableHead>Estimated</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Deviation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gateInsights.map((gate) => (
                  <TableRow key={gate.id}>
                    <TableCell>{gate.name}</TableCell>
                    <TableCell>{gate.count}</TableCell>
                    <TableCell>AED {gate.estimated}</TableCell>
                    <TableCell>AED {gate.actual}</TableCell>
                    <TableCell>
                      <span
                        className={`text-sm font-medium ${
                          gate.change === "increase"
                            ? "text-red-500"
                            : gate.change === "decrease"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        {gate.change === "increase"
                          ? `↑ AED ${(gate.actual - gate.estimated).toFixed(2)}`
                          : gate.change === "decrease"
                          ? `↓ AED ${(gate.estimated - gate.actual).toFixed(2)}`
                          : "―"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Detailed Cost Calculation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Weekday Calculation */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Weekday Commute</h3>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-medium">Morning Trip</h4>
                  {detailedCalculation.weekdayTrips.morning.routeData && (
                    <div className="text-sm text-gray-600">
                      Distance:{" "}
                      {formatDistance(
                        detailedCalculation.weekdayTrips.morning.routeData
                          .distance
                      )}{" "}
                      | Duration:{" "}
                      {formatDuration(
                        detailedCalculation.weekdayTrips.morning.routeData
                          .duration
                      )}
                    </div>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toll Gate</TableHead>
                      <TableHead>Crossing Time</TableHead>
                      <TableHead>Rate Type</TableHead>
                      <TableHead>Rate (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedCalculation.weekdayTrips.morning.breakdown.map(
                      (item, i) => (
                        <TableRow key={`morning-${item.gateId}-${i}`}>
                          <TableCell>{item.gateName}</TableCell>
                          <TableCell>{item.crossingTime || "N/A"}</TableCell>
                          <TableCell>{item.tariffType}</TableCell>
                          <TableCell>{item.rate}</TableCell>
                        </TableRow>
                      )
                    )}
                    {detailedCalculation.weekdayTrips.morning.breakdown
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No toll gates on route
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-medium">Evening Return Trip</h4>
                  {detailedCalculation.weekdayTrips.evening.routeData && (
                    <div className="text-sm text-gray-600">
                      Distance:{" "}
                      {formatDistance(
                        detailedCalculation.weekdayTrips.evening.routeData
                          .distance
                      )}{" "}
                      | Duration:{" "}
                      {formatDuration(
                        detailedCalculation.weekdayTrips.evening.routeData
                          .duration
                      )}
                    </div>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toll Gate</TableHead>
                      <TableHead>Crossing Time</TableHead>
                      <TableHead>Rate Type</TableHead>
                      <TableHead>Rate (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedCalculation.weekdayTrips.evening.breakdown.map(
                      (item, i) => (
                        <TableRow key={`evening-${item.gateId}-${i}`}>
                          <TableCell>{item.gateName}</TableCell>
                          <TableCell>{item.crossingTime || "N/A"}</TableCell>
                          <TableCell>{item.tariffType}</TableCell>
                          <TableCell>{item.rate}</TableCell>
                        </TableRow>
                      )
                    )}
                    {detailedCalculation.weekdayTrips.evening.breakdown
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No toll gates on route
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <div>Daily Cost:</div>
                  <div className="text-right font-medium">
                    AED {detailedCalculation.weekdayTrips.dailyCost}
                  </div>
                  <div>
                    Weekly Cost (for{" "}
                    {detailedCalculation.weekdayTrips.weeklyCost /
                      detailedCalculation.weekdayTrips.dailyCost}{" "}
                    days):
                  </div>
                  <div className="text-right font-medium">
                    AED {detailedCalculation.weekdayTrips.weeklyCost}
                  </div>
                  <div>Monthly Cost (4.3 weeks):</div>
                  <div className="text-right font-medium">
                    AED{" "}
                    {detailedCalculation.weekdayTrips.monthlyCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Weekend Calculation */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Weekend Travel</h3>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-medium">Saturday Trip</h4>
                  {detailedCalculation.weekendTrips.saturday.routeData && (
                    <div className="text-sm text-gray-600">
                      Distance:{" "}
                      {formatDistance(
                        detailedCalculation.weekendTrips.saturday.routeData
                          .distance
                      )}{" "}
                      | Duration:{" "}
                      {formatDuration(
                        detailedCalculation.weekendTrips.saturday.routeData
                          .duration
                      )}
                    </div>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toll Gate</TableHead>
                      <TableHead>Crossing Time</TableHead>
                      <TableHead>Rate Type</TableHead>
                      <TableHead>Rate (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedCalculation.weekendTrips.saturday.breakdown.map(
                      (item, i) => (
                        <TableRow key={`saturday-${item.gateId}-${i}`}>
                          <TableCell>{item.gateName}</TableCell>
                          <TableCell>{item.crossingTime || "N/A"}</TableCell>
                          <TableCell>{item.tariffType}</TableCell>
                          <TableCell>{item.rate}</TableCell>
                        </TableRow>
                      )
                    )}
                    {detailedCalculation.weekendTrips.saturday.breakdown
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No toll gates on route
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-medium">Sunday Trip</h4>
                  {detailedCalculation.weekendTrips.sunday.routeData && (
                    <div className="text-sm text-gray-600">
                      Distance:{" "}
                      {formatDistance(
                        detailedCalculation.weekendTrips.sunday.routeData
                          .distance
                      )}{" "}
                      | Duration:{" "}
                      {formatDuration(
                        detailedCalculation.weekendTrips.sunday.routeData
                          .duration
                      )}
                    </div>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toll Gate</TableHead>
                      <TableHead>Crossing Time</TableHead>
                      <TableHead>Rate Type</TableHead>
                      <TableHead>Rate (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedCalculation.weekendTrips.sunday.breakdown.map(
                      (item, i) => (
                        <TableRow key={`sunday-${item.gateId}-${i}`}>
                          <TableCell>{item.gateName}</TableCell>
                          <TableCell>{item.crossingTime || "N/A"}</TableCell>
                          <TableCell>{item.tariffType}</TableCell>
                          <TableCell>{item.rate}</TableCell>
                        </TableRow>
                      )
                    )}
                    {detailedCalculation.weekendTrips.sunday.breakdown
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No toll gates on route
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <div>Weekend Cost (per weekend):</div>
                  <div className="text-right font-medium">
                    AED {detailedCalculation.weekendTrips.weekendCost}
                  </div>
                  <div>Monthly Weekend Cost (4.3 weekends):</div>
                  <div className="text-right font-medium">
                    AED{" "}
                    {detailedCalculation.weekendTrips.monthlyCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Monthly Cost */}
            <div className="bg-themeDark text-white p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-lg">Total Monthly Cost:</div>
                <div className="text-right text-lg font-bold">
                  AED {monthlyCost.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostResults;
