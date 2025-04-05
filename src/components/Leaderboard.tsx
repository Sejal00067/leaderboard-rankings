
import React, { useState, useEffect } from 'react';
import RankCard from './RankCard';
import RankItem from './RankItem';
import Pagination from './Pagination';
import { User, generateMockUsers } from '../utils/mockData';
import { Trophy } from 'lucide-react';

const USERS_PER_PAGE = 20;
const TOTAL_USERS = 100;

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((TOTAL_USERS - 3) / USERS_PER_PAGE);

  useEffect(() => {
    // Generate 100 mock users when component mounts
    setUsers(generateMockUsers(TOTAL_USERS));
  }, []);

  // Get top 3 users
  const topThreeUsers = users.slice(0, 3);
  
  // Get current page users (excluding top 3)
  const getCurrentPageUsers = () => {
    const startIndex = 3 + (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  const currentPageUsers = getCurrentPageUsers();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the paginated section
    const element = document.getElementById('paginated-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 rounded-xl bg-white shadow-lg animate-pulse">
          <p className="text-lg font-medium">Loading leaderboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 inline-block text-transparent bg-clip-text">
          Leaderboard Rankings
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <p className="text-gray-600">Top 100 players and their achievements</p>
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
      </div>
      
      <div className="top-ranks sticky top-0 z-20 pt-4 pb-6 px-2 bg-gradient-to-b from-indigo-50 via-purple-50 to-transparent">
        <div className="top-ranks-container relative">
          {topThreeUsers.length >= 3 && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-indigo-200/30 rounded-xl blur-xl"></div>
              <div className="relative z-10 flex justify-center items-end gap-4">
                <RankCard user={topThreeUsers[1]} place="second" />
                <RankCard user={topThreeUsers[0]} place="first" />
                <RankCard user={topThreeUsers[2]} place="third" />
              </div>
            </>
          )}
        </div>
      </div>
      
      <div id="paginated-section" className="space-y-2 mt-4">
        <div className="p-4 mb-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-purple-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">All Rankings</h2>
          <p className="text-sm text-gray-500">Ranks 4-100 shown below</p>
        </div>
        
        {currentPageUsers.map(user => (
          <RankItem key={user.id} user={user} />
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t border-purple-100">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default Leaderboard;
