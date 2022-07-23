import { sineOut, backOut } from "svelte/easing";

export const scaleCSS = (node, { duration = 200, delay = 0 }) => ({
  duration,
  delay,
  css: (t) => `transform: scale(${sineOut(t)})`,
});

export const scaleJS = (node, { duration = 200, delay = 0 }) => ({
  duration,
  delay,
  tick: (t) => {
    node.style.transform = `scale(${sineOut(t)})`;
  },
});

export const jiggleCSS = (node, { duration = 1000, delay = 0 }) => ({
  duration,
  delay,
  css: (t) => {
    const scale = 1 + backOut(1 - t);
    const angle = Math.sin(t * 3.14 * 2) * 30;
    return `transform: scale(${scale}) rotate(${angle}deg)`;
  },
});

export const jiggleJS = (node, { duration = 1000, delay = 0 }) => {
  return {
    duration,
    delay,
    tick: (t) => {
      const scale = 1 + backOut(1 - t) * 0.75;
      const angle = Math.sin(t * 3.14 * 2) * 30;
      node.style.transform = `scale(${scale}) rotate(${angle}deg)`;
    },
  };
};
