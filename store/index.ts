import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Referral {
  username: string;
  _id: string;
}

export interface Task {
  description: string;
  rewardPoint: number;
  link: string;
  _id: string;
  claimed: boolean;
}

interface User {
  email: string;
  password: string;
  pointsEarned: number;
  referralCode: string;
  referralEarnings: number;
  referrals: Referral[];
  totalUptime: string;
  username: string;
  _id: string;
  completedTasks: Task[];
}

export interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: <User>{},
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'tile-choice',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;

