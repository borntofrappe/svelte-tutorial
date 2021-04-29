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
  ];
  
  const randomInt = (max = 100, min = 0) =>
    Math.floor(Math.random() * (max - min)) + min;

  const days = 100;
  const endDate = new Date();
  const data = [];

  for (let day = 0; day < days; day += 1) {
    names.forEach((name, index) => {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - day);
      const commits = randomInt((index + 1) ** 0.5);
      for (let commit = 0; commit < commits; commit += 1) {
        const additions = randomInt(commits * 10, commits * 7);
        const deletions = randomInt(commits * 9, commits * 6);
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

const data = getData();
const dataNames = Object.entries(
  data.reduce((acc, curr) => {
    const { name, additions, deletions } = curr;
    if (acc[name]) {
      acc[name].commits += 1;
      acc[name].additions += additions;
      acc[name].deletions += deletions;
    } else {
      acc[name] = {
        commits: 1,
        additions,
        deletions,
      };
    }
    return acc;
  }, {})
)
  .map(([name, d]) => ({
    name,
    ...d,
  }))
  .sort((a, b) => (a.commits < b.commits ? 1 : -1));

const root = document.querySelector('#root');
root.innerHTML = dataNames
  .map(
    ({ name, commits, additions, deletions }, i) => `
    <article>
      <svg class="picture" viewBox="0 0 100 100" width="1em" height="1em">
        <use href="#profile-pic" />
      </svg>

      <h2>${name}</h2>
      <p class="position">
        <span class="visually-hidden">Contributor number</span>
        <span>#${i + 1}</span>
      </p>
      <p class="history">
        <span>${commits} commits</span>
        <span class="addition">${additions} ++</span>
        <span class="deletion">${deletions} --</span>
      </p>
      <svg class="viz" viewBox="0 0 400 200" width="400" height="200"></svg>
    </article>
  `
  )
  .join('');
