import { create } from 'zustand';

interface BgState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useBgStore = create<BgState>((set) => ({
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
}));
