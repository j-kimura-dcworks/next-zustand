import { create } from 'zustand';

type CounterState = {
  count: number;
  // アクション
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () =>
    set((state) => ({
      count: state.count > 0 ? state.count + 1 : state.count,
    })),
  reset: () => set({ count: 0 }),
}));
