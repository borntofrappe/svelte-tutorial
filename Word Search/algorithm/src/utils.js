export const shuffle = (array) => {
  const a = [...array];
  let counter = a.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = a[counter];

    a[counter] = a[index];
    a[index] = temp;
  }

  return a;
};
