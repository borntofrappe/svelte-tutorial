import { writable } from "svelte/store";

const createStopwatch = () => {
  const { subscribe, set, update } = writable(0);
  let interval;
  let elapsed = 0;

  return {
    subscribe,
    start: () => {
      if (interval) clearInterval(interval);
      const startDate = new Date() - elapsed;

      interval = setInterval(() => {
        set(new Date() - startDate);
      }, 10);
    },
    pause: () => {
      clearInterval(interval);
      interval = null;

      update((n) => {
        elapsed = n;
        return n;
      });
    },

    stop: () => {
      clearInterval(interval);
      interval = null;

      elapsed = 0;
      set(0);
    },
  };
};

export const stopwatch = createStopwatch();
