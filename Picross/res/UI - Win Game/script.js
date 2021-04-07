// hard coded value for the selected and completed level
const level = ['ooxoo', 'ooxoo', 'xxxxx', 'oxxxo', 'oxoxo'];

/*
include the level through an svg element highlighting the different parts
o - fill
x - empty spaces

*/
const width = 100;
const height = 100;
const columns = level[0].length;
const rows = level.length;

const markup = `
<section>
    <div>
        <h1>Star</h1>
        <svg viewBox="0 0 ${width} ${height}" width="200" height="200">
            <defs>
                <rect id="foreground" fill="hsl(0, 0%, 5%)" x="0" y="0" width="${width /
                  columns}" height="${height / rows}"></rect>
                <rect id="background" fill="hsl(0, 0%, 100%)" x="0" y="0" width="${width /
                  level.length}" height="${height / rows}"></rect>
            </defs>
            ${level
              .map((string, y) =>
                [...string]
                  .map((letter, x) =>
                    letter === 'o'
                      ? `<use href="#foreground" x="${(x * width) /
                          columns}" y="${(y * height) / rows}"></use>`
                      : ''
                  )
                  .join('')
              )
              .join('')}
        </svg>
    </div>
    <button>Select new level</button>
</section>
`;

document.body.innerHTML = markup;
