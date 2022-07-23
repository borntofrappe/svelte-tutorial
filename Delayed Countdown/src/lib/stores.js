import { readable } from "svelte/store";

export const createTimer = (time) => {
  const timer = readable(time, function start(set) {
    const date = new Date(new Date().getTime() + time * 1000);
    const interval = setInterval(() => {
      const time = Math.round((date.getTime() - new Date().getTime()) / 1000);
      set(time);

      if (time === 0) clearInterval(interval);
    }, 1000);

    return function stop() {
      clearInterval(interval);
    };
  });
  return timer;
};
