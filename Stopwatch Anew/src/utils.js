const formatPeriod = (p) => `${p}`.slice(0, 2).padStart(2, 0);

export const formatTime = ({ ms, s, m }) =>
  `${formatPeriod(m)}:${formatPeriod(s)}.${formatPeriod(ms)}`;

export const getTime = (stopwatch) => {
  let time = stopwatch;
  const ms = time % 1000;
  time = Math.floor(time / 1000);
  const s = time % 60;
  time = Math.floor(time / 60);
  const m = time % 60;

  return { ms, s, m };
};
