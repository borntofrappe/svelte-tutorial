import { writable } from "svelte/store";
import { formatTime, getTime } from "./utils";

const createStopwatch = () => {
  const { subscribe, set, update } = writable(0);
  let interval;
  let elapsed = 0;

  return {
    subscribe,
    start: () => {
      if (interval) clearInterval(interval);
      const startDate = new Date() - elapsed * 10;

      interval = setInterval(() => {
        set(Math.floor((new Date() - startDate) / 10));
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

const createLaps = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (stopwatch) => {
      update((laps) => {
        const number = (laps.length + 1).toString().padStart(2, 0);

        const total = formatTime(getTime(stopwatch));

        const increment =
          laps.length > 0
            ? formatTime(getTime(stopwatch - laps[0].stopwatch))
            : total;

        return [
          {
            stopwatch,
            number,
            increment,
            total,
          },
          ...laps,
        ];
      });
    },
    clear: () => {
      set([]);
    },
  };
};

export const laps = createLaps();
