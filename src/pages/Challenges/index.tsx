import React, { useState } from "react";
import Header from "./components/Header";
import EcoLineChart from "./components/EcoLineChart";
import JoinChallenge from "./components/JoinChallenge";
import Leaderboard from "./components/Leaderboard";
import ChampionCards from "./components/ChampionCards";
import SavingsMeters from "./components/SavingsMeters";
import { monthlyData, leaderboardData, championsData } from "@/data/eco-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChallengesPage = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
  });

  const handleJoinChallenge = (name: string, avatar: string) => {
    setUserData({ name, avatar });
    setIsJoined(true);
  };

  // Get the latest month's data for the meters
  const latestData = monthlyData[monthlyData.length - 1];
  const maxCO2 = Math.max(...monthlyData.map((d) => d.topCO2Saved)) * 1.2; // 20% buffer
  const maxTrees = Math.max(...monthlyData.map((d) => d.topTreesSaved)) * 1.2; // 20% buffer

  return (
    <div className="min-h-screen bg-eco-gray-light">
      <div className="container mx-auto py-8 px-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SavingsMeters
              co2Saved={latestData.userCO2Saved}
              treesPlanted={latestData.userTreesSaved}
              maxCO2={maxCO2}
              maxTrees={maxTrees}
            />

            <Tabs defaultValue="co2" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="co2">CO₂ Saved</TabsTrigger>
                <TabsTrigger value="trees">Trees Saved</TabsTrigger>
              </TabsList>
              <TabsContent value="co2">
                <EcoLineChart
                  data={monthlyData}
                  dataKey="CO2Saved"
                  title="CO₂ Saved Month-on-Month"
                  unit="kg"
                />
              </TabsContent>
              <TabsContent value="trees">
                <EcoLineChart
                  data={monthlyData}
                  dataKey="TreesSaved"
                  title="Trees Saved Month-on-Month"
                  unit="trees"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <JoinChallenge onJoin={handleJoinChallenge} isJoined={isJoined} />
            <Leaderboard warriors={leaderboardData} />
          </div>
        </div>

        <ChampionCards champions={championsData} />
      </div>
    </div>
  );
};

export default ChallengesPage;
