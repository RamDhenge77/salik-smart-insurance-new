
import React from 'react';
import { ChampionCard } from '@/data/eco-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ChampionCardsProps {
  champions: ChampionCard[];
}

const ChampionCards = ({ champions }: ChampionCardsProps) => {
  return (
    <div className="eco-card">
      <h3 className="text-xl font-semibold mb-4">Challenge Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {champions.map((champion, index) => (
          <div key={index} className="bg-eco-gray-light rounded-lg p-4 transition-all hover:shadow-md">
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10 mr-3 bg-eco-green">
                <AvatarImage src={champion.warrior.avatarImg} alt={champion.warrior.name} />
                <AvatarFallback className="text-lg">{champion.warrior.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-sm">{champion.title}</h4>
                <p className="text-xs text-eco-gray-dark">{champion.period}</p>
              </div>
              <div className="ml-auto text-2xl">{champion.badge}</div>
            </div>
            
            <div className="border-t border-eco-gray pt-3 mb-3">
              <p className="font-semibold">{champion.warrior.name}</p>
              <div className="flex justify-between text-sm">
                <p>{champion.warrior.co2Saved} kg CO₂</p>
                <p>{champion.warrior.treesPlanted} trees</p>
              </div>
            </div>
            
            {champion.reward && (
              <div className="bg-gradient-to-br from-btn-primary to-themeDark rounded-lg p-3 text-white mt-2">
                <Badge variant="outline" className="bg-white bg-opacity-20 text-white mb-1 border-none">
                  {champion.reward.title}
                </Badge>
                <p className="text-sm font-semibold mb-2">{champion.reward.description}</p>
                {champion.reward.code && (
                  <div className="bg-white bg-opacity-20 rounded p-1 mb-1 text-center">
                    <span className="font-mono font-bold text-xs">{champion.reward.code}</span>
                  </div>
                )}
                {champion.reward.validUntil && (
                  <p className="text-xs text-white text-opacity-80">Valid until: {champion.reward.validUntil}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionCards;
