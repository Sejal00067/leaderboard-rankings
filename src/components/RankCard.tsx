
import React from 'react';
import { User } from '../utils/mockData';
import { Trophy, Crown, Medal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface RankCardProps {
  user: User;
  place: 'first' | 'second' | 'third';
}

const RankCard: React.FC<RankCardProps> = ({ user, place }) => {
  // Get gradients and colors based on place
  const getCardStyle = () => {
    switch (place) {
      case 'first':
        return 'bg-gradient-to-b from-amber-300 to-yellow-500 shadow-lg shadow-amber-200/50 border-amber-400';
      case 'second':
        return 'bg-gradient-to-b from-slate-300 to-slate-400 shadow-md shadow-slate-200/50 border-slate-400';
      case 'third':
        return 'bg-gradient-to-b from-amber-700 to-amber-800 shadow-md shadow-amber-700/30 border-amber-700';
      default:
        return '';
    }
  };

  // Get trophy/medal icon based on place
  const getRankIcon = () => {
    switch (place) {
      case 'first':
        return <Crown className="h-6 w-6 text-white absolute -top-3 left-1/2 transform -translate-x-1/2" />;
      case 'second':
        return <Trophy className="h-5 w-5 text-white absolute -top-2 left-1/2 transform -translate-x-1/2" />;
      case 'third':
        return <Medal className="h-5 w-5 text-white absolute -top-2 left-1/2 transform -translate-x-1/2" />;
      default:
        return null;
    }
  };

  // Get user's initial for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div className={`relative rounded-2xl ${getCardStyle()} border p-4 flex flex-col items-center transition-all duration-300 transform hover:scale-105 ${place === 'first' ? 'py-8' : place === 'second' ? 'py-6' : 'py-5'}`}>
      {getRankIcon()}
      
      <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center text-white font-bold text-sm border border-white/30">
        {user.rank}
      </div>
      
      <div className="mb-3">
        <Avatar className={`border-4 border-white/50 shadow-lg ${place === 'first' ? 'h-24 w-24' : place === 'second' ? 'h-20 w-20' : 'h-16 w-16'}`}>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-purple-600 text-white">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <h3 className="text-white font-bold text-center line-clamp-1 mb-1 px-1">
        {user.name}
      </h3>
      
      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-semibold text-sm">
        {user.points.toLocaleString()} pts
      </div>
    </div>
  );
};

export default RankCard;
