const formatPeriod = (p) => `${p}`.slice(0, 2).padStart(2, 0);

export const formatTime = ({ t, s, m }) =>
  `${formatPeriod(m)}:${formatPeriod(s)}.${formatPeriod(t)}`;

export const getTime = (stopwatch) => {
  let time = stopwatch;
  const t = time % 100;
  time = Math.floor(time / 100);
  const s = time % 60;
  time = Math.floor(time / 60);
  const m = time % 60;

  return { t, s, m };
};
