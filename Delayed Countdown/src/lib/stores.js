import { writable } from "svelte/store";

export const createTimer = (time) => {
  const { subscribe, set } = writable(time);

  const date = new Date(new Date().getTime() + time * 1000);

  let interval = setInterval(() => {
    const time = Math.round((date.getTime() - new Date().getTime()) / 1000);
    set(time);

    if (time === 0) clearInterval(interval);
  }, 1000);

  return {
    subscribe,
    start: (t) => {
      if (interval) clearInterval(interval);

      const newTime = t || time;
      set(newTime);

      const date = new Date(new Date().getTime() + newTime * 1000);
      interval = setInterval(() => {
        const time = Math.round((date.getTime() - new Date().getTime()) / 1000);
        set(time);

        if (time === 0) clearInterval(interval);
      }, 1000);
    },
    pause: () => {
      clearInterval(interval);
      interval = null;
    },
    remove: () => {
      clearInterval(interval);
      interval = null;
    },
  };
};
