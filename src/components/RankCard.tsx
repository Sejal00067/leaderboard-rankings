
import React from 'react';
import { User } from '../utils/mockData';
import { Trophy } from 'lucide-react';

interface RankCardProps {
  user: User;
  place: 'first' | 'second' | 'third';
}

const RankCard: React.FC<RankCardProps> = ({ user, place }) => {
  const placeClasses = {
    first: 'first-place',
    second: 'second-place',
    third: 'third-place'
  };

  const positionClasses = {
    first: 'rank-position-1',
    second: 'rank-position-2',
    third: 'rank-position-3'
  };

  return (
    <div className={`rank-card ${placeClasses[place]}`}>
      <div className={`rank-position ${positionClasses[place]}`}>
        {user.rank}
      </div>
      <img 
        src={user.avatar} 
        alt={`${user.name}'s avatar`} 
        className="rank-avatar" 
      />
      <h3 className="rank-name">{user.name}</h3>
      <p className="rank-points">{user.points} pts</p>
      {place === 'first' && (
        <Trophy size={24} color="white" className="mt-2" />
      )}
    </div>
  );
};

export default RankCard;
