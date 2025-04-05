
import React from 'react';
import { User } from '../utils/mockData';

interface RankItemProps {
  user: User;
}

const RankItem: React.FC<RankItemProps> = ({ user }) => {
  return (
    <div className="rank-item">
      <div className="rank-item-position">{user.rank}</div>
      <img 
        src={user.avatar} 
        alt={`${user.name}'s avatar`} 
        className="rank-item-avatar" 
      />
      <div className="rank-item-name">{user.name}</div>
      <div className="rank-item-points">{user.points} pts</div>
    </div>
  );
};

export default RankItem;
