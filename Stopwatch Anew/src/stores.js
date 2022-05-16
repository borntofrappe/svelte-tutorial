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

const createLaps = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (stopwatch) => {
      update((lps) => {
        const number = (lps.length + 1).toString().padStart(2, 0);

        const total = formatTime(getTime(stopwatch));

        let increment;
        if (lps.length > 0) {
          increment = formatTime(getTime(stopwatch - lps[0].stopwatch));
        } else {
          increment = total;
        }

        return [
          {
            stopwatch,
            number,
            increment,
            total,
          },
          ...lps,
        ];
      });
    },
    clear: () => {
      set([]);
    },
  };
};

export const laps = createLaps();
