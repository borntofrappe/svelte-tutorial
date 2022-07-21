import { readable } from "svelte/store";

// set up a readable store to provide the current date at a second's interval
export const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000)

  return () => clearInterval(interval);
});
