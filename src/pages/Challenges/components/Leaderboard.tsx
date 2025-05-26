import React from "react";
import { Warrior } from "@/data/eco-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardProps {
  warriors: Warrior[];
}

const Leaderboard = ({ warriors }: LeaderboardProps) => {
  // Add rank to each warrior
  const rankedWarriors = warriors.map((warrior, index) => ({
    ...warrior,
    rank: index + 1,
  }));

  return (
    <div className="eco-card">
      <h3 className="text-xl font-semibold mb-4">Top Green Warriors</h3>
      <div
        className="space-y-3 h-[18.7rem] overflow-auto pr-2
                   [&::-webkit-scrollbar]:w-1
                   [&::-webkit-scrollbar-track]:rounded-full
                 [&::-webkit-scrollbar-track]:bg-gray-100
                   [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-300
                 dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {rankedWarriors.map((warrior) => (
          <div
            key={warrior.id}
            className={`flex items-center p-3 rounded-lg transition-all ${
              warrior.rank && warrior.rank <= 3
                ? "bg-gradient-to-r from-eco-gray-light to-white shine-effect"
                : "bg-eco-gray-light"
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3">
              {warrior.rank === 1 && (
                <span className="text-xl animate-pulse-green">🥇</span>
              )}
              {warrior.rank === 2 && <span className="text-xl">🥈</span>}
              {warrior.rank === 3 && <span className="text-xl">🥉</span>}
              {warrior.rank && warrior.rank > 3 && (
                <span className="text-sm font-bold text-eco-gray-dark">
                  {warrior.rank}
                </span>
              )}
            </div>

            <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
              {warrior.avatar.includes("/lovable-uploads") ? (
                <img src={warrior.avatar} alt={warrior.name} className="p-1" />
              ) : (
                <>
                  <AvatarImage src={warrior.avatarImg} alt={warrior.name} />
                  <AvatarFallback>{warrior.avatar}</AvatarFallback>
                </>
              )}
            </Avatar>

            <div className="flex-grow">
              <p className="font-medium">{warrior.name}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-themeDark">
                {warrior.co2Saved} kg
              </p>
              <p className="text-xs text-eco-gray-dark">
                {warrior.treesPlanted} trees
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
