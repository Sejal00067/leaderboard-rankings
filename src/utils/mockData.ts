
import { faker } from "@faker-js/faker";

export interface User {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar: string;
}

export const generateMockUsers = (count: number): User[] => {
  // Create users with random data
  const users = Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    points: faker.number.int({ min: 100, max: 10000 }),
    rank: i + 1,
    avatar: faker.image.avatar(),
  }));

  // Sort users by points in descending order
  users.sort((a, b) => b.points - a.points);
  
  // Update ranks after sorting
  users.forEach((user, index) => {
    user.rank = index + 1;
  });
  
  return users;
};
