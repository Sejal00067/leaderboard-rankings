
import React from 'react';
import { User } from '../utils/mockData';
import { Award, ArrowUp, ArrowDown, Medal, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface RankItemProps {
  user: User;
}

const RankItem: React.FC<RankItemProps> = ({ user }) => {
  // Determine if the user's rank has improved or declined (randomly for demo)
  const rankChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

  // Define color classes for different rank ranges
  const getRankColor = (rank: number) => {
    if (rank <= 10) return "text-amber-500 font-bold";
    if (rank <= 30) return "text-indigo-500 font-bold";
    if (rank <= 50) return "text-emerald-500 font-bold";
    return "text-slate-600 font-bold";
  };

  // Get user's initial for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  // Random background color for avatar fallback
  const getBgColor = () => {
    const colors = [
      "bg-amber-500", "bg-violet-500", "bg-emerald-500", 
      "bg-pink-500", "bg-blue-500", "bg-orange-500"
    ];
    return colors[user.id.charCodeAt(0) % colors.length];
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 mb-3">
      {/* Rank position with decoration based on rank */}
      <div className={`relative w-12 h-12 flex items-center justify-center rounded-full ${getRankColor(user.rank)} bg-slate-100 shrink-0`}>
        <span className="text-lg">{user.rank}</span>
        {user.rank <= 10 && <Star className="absolute -top-2 -right-2 w-5 h-5 text-amber-400" />}
      </div>

      {/* Avatar with fallback */}
      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className={`${getBgColor()} text-white`}>
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>

      {/* User info */}
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-slate-900">{user.name}</span>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Medal className="w-3.5 h-3.5" />
          <span>Rank #{user.rank}</span>
          {rankChange > 0 && (
            <span className="flex items-center text-emerald-500">
              <ArrowUp className="w-3.5 h-3.5" /> 
              <span className="ml-0.5">Improved</span>
            </span>
          )}
          {rankChange < 0 && (
            <span className="flex items-center text-rose-500">
              <ArrowDown className="w-3.5 h-3.5" />
              <span className="ml-0.5">Dropped</span>
            </span>
          )}
        </div>
      </div>

      {/* Points with badge */}
      <div className="flex items-center gap-1.5">
        <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-full font-bold">
          {user.points.toLocaleString()} pts
        </div>
        {user.rank <= 3 && <Award className="w-6 h-6 text-amber-400" />}
      </div>
    </div>
  );
};

export default RankItem;
