export const getRandomLetter = (a = "a", z = "z") => {
  const start = a.charCodeAt();
  const end = z.charCodeAt() + 1;

  return String.fromCharCode(Math.floor(Math.random() * (end - start)) + start);
};
