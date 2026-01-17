import { create } from 'zustand';

interface JourneyState {
  currentWeek: number | null;
  setCurrentWeek: (week: number) => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  currentWeek: null,
  setCurrentWeek: (week) => set({ currentWeek: week }),
}));
