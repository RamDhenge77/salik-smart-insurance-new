import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { avatarOptions } from "@/data/eco-data";

interface JoinChallengeProps {
  onJoin: (name: string, avatar: string) => void;
  isJoined: boolean;
}

const JoinChallenge = ({ onJoin, isJoined }: JoinChallengeProps) => {
  const [warriorName, setWarriorName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!warriorName.trim()) {
      setError("Please enter your warrior name");
      return;
    }

    if (!selectedAvatar) {
      setError("Please select an avatar");
      return;
    }

    onJoin(warriorName, selectedAvatar);
    toast.success("Welcome to the Green Warrior Challenge!", {
      description: `You've joined as ${warriorName}`,
    });

    setError("");
  };

  if (isJoined) {
    return (
      <div className="eco-card animate-slide-up">
        <div className="text-center">
          <div className="text-4xl mb-2">{selectedAvatar}</div>
          <h3 className="text-xl font-bold mb-2">{warriorName}</h3>
          <p className="text-eco-gray-dark">You're now a Green Warrior!</p>
          <div className="mt-4 p-3 bg-eco-gray-light rounded-lg text-sm">
            <p>
              Your eco-driving stats will be tracked and displayed on the
              leaderboard. Keep driving green to climb the ranks!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eco-card animate-slide-up">
      <h3 className="text-xl font-semibold mb-4">Join the Challenge</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="warriorName"
            className="block text-sm font-medium mb-2"
          >
            Enter Your Warrior Name
          </label>
          <Input
            id="warriorName"
            value={warriorName}
            onChange={(e) => setWarriorName(e.target.value)}
            placeholder="e.g. EcoRider"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Your Avatar
          </label>
          <div className="grid grid-cols-5 gap-2">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(avatar.icon)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                  selectedAvatar === avatar.icon
                    ? "bg-btn-primary text-white"
                    : "bg-eco-gray-light hover:bg-eco-gray"
                }`}
              >
                <span className="text-2xl mb-1">{avatar.icon}</span>
                <span className="text-xs">{avatar.name}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          variant="primary"
          type="submit"
          className="w-full"
        >
          Join the Green Warriors
        </Button>
      </form>
    </div>
  );
};

export default JoinChallenge;
