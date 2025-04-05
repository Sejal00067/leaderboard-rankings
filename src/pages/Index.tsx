
import React from 'react';
import Leaderboard from '../components/Leaderboard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      <div className="relative">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Index;
