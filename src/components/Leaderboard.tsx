
import React, { useState, useEffect } from 'react';
import RankCard from './RankCard';
import RankItem from './RankItem';
import Pagination from './Pagination';
import { User, generateMockUsers } from '../utils/mockData';

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
    return <div className="leaderboard-container">Loading leaderboard data...</div>;
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Leaderboard Rankings</h1>
        <p className="leaderboard-subtitle">Top 100 players and their scores</p>
      </div>
      
      <div className="top-ranks">
        <div className="top-ranks-container">
          {topThreeUsers.length >= 3 && (
            <>
              <RankCard user={topThreeUsers[1]} place="second" />
              <RankCard user={topThreeUsers[0]} place="first" />
              <RankCard user={topThreeUsers[2]} place="third" />
            </>
          )}
        </div>
      </div>
      
      <div id="paginated-section" className="ranks-list">
        {currentPageUsers.map(user => (
          <RankItem key={user.id} user={user} />
        ))}
      </div>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Leaderboard;
