export const data = getData();

function getData() {
  const names = [
    'Kelly',
    'jury',
    'Timothy',
    'Eliza',
    'Jeff',
    'Cody',
    'Lani',
    'Annabeth',
    'Tara',
    'Fitz',
  ];

  const randomInt = (max = 100, min = 0) =>
    Math.floor(Math.random() * (max - min)) + min;

  const days = 31;
  const endDate = new Date();
  const data = [];

  for (let day = 0; day < days; day += 1) {
    names.forEach((name, index) => {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - day);
      const max = Math.floor(index ** 1.2);
      const commits = randomInt(max, Math.floor(max / 5));
      for (let commit = 0; commit < commits; commit += 1) {
        const additions = randomInt(commits * 8, commits * 5);
        const deletions = randomInt(commits * 8, commits * 4);
        data.push({
          date,
          name,
          additions,
          deletions,
        });
      }
    });
  }
  return data;
}