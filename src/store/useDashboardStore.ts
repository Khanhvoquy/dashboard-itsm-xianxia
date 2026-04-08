import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DashboardState } from '@/types';

interface DashboardActions {
  setSelectedUser: (userId: string | null) => void;
  setDateRange: (start: string, end: string) => void;
  setLang: (lang: 'vi' | 'en') => void;
  reset: () => void;
}

const initialState: DashboardState = {
  selectedUser: null,
  dateRange: {
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
  theme: 'xianxia',
  lang: 'vi',
};

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSelectedUser: (userId) => set({ selectedUser: userId }),
      
      setDateRange: (start, end) => 
        set((state) => ({
          ...state,
          dateRange: { start, end },
        })),
      
      setLang: (lang) => set({ lang }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'xianxia-dashboard-storage',
      partialize: (state) => ({
        lang: state.lang,
        selectedUser: state.selectedUser,
      }),
    }
  )
);

// Selectors for optimized re-renders
export const selectSelectedUser = (state: { selectedUser: string | null }) => 
  state.selectedUser;

export const selectDateRange = (state: { dateRange: { start: string; end: string } }) => 
  state.dateRange;

export const selectLang = (state: { lang: 'vi' | 'en' }) => 
  state.lang;
