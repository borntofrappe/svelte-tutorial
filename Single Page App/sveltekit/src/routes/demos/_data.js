export const demos = [
  {
    "title": "Strongman",
    "description": "Raise the mallet and fiercely strike the puck!",
    "details": "<p>Strongman, or high striker, is a carnival game in which a mallet is used to test the force through a tower, and usually a bell.</p><p>The design of this particular tower is inspired by <a href='https://dribbble.com/shots/2647080-Body-Temperature-Huffington-Post-Spot-Illustrations'>this design</a> and re-created through SVG syntax. You can find the concept in the <strong>res</strong> folder.</p><p>Notice how the graphic is included in a button. The idea is to have svelte manage the duration of the button press and have the graphics react instantaneously. As the button is then released, the idea is to have Svelte animate the mallet, puck and tower to match.</p>",
    "href": "https://svelte.dev/repl/c234f8c4626440179c710f0c65cabfca",
    "id": 0
  },
  {
    "title": "Markdown Editor",
    "description": "Compose and preview markdown syntax.",
    "details": "<p>The project is meant to provide a helpful environment to write notes and most prominently <code>README.md</code> files.</p><p>The demo leans on <a href='https://marked.js.org/'><code>marked.js</code></a> for the conversion between markdown and markup.",
    "href": "https://codepen.io/borntofrappe/full/VwwyGzR",
    "id": 1
  },
  {
    "title": "Picross",
    "description": "Draw stylized pictures with a pixelated look.",
    "details": "<p>The project is based on a previous experiment with the table element, in which I used JavaScript to plot a series of levels through columns, rows and cells of SVG elements. You can find the experiment <a href='https://codepen.io/borntofrappe/full/MWgEbPz'>live here on codepen</a>.</p>",
    "href": "https://codepen.io/borntofrappe/full/yLLPBMr",
    "id": 2
  },
  {
    "title": "Smart Watch",
    "description": "Check the time, keep a counter and compute basic math.",
    "details": "<p>The project is inspired by a gadget proposed in the pokemon game series, a smart watch with a plethora of applications. I set out to recreate a few of them to highlight the potential of a component-based approach.</p>",
    "href": "https://codepen.io/borntofrappe/full/bGGWMBx",
    "id": 3
  },
  {
    "title": "Infinity Maze",
    "description": "Move within the boundaries of a maze to reach a goalpost.",
    "details": "<p>The project is the fruition of several smaller-scale efforts, developing the game in its different components:</p><ul><li><em>Maze grid</em>: the grid ultimately used for the maze</li><li><em>Maze player</em>: the movement of the square within the boundaries of the larger maze</li><li><em>Maze viewBox</em>: the change in the attribute which ultimately needs to take place in between levels, while the maze is being built with the chosen algorithm.</li><li><em>Maze algorithm</em>: the method producing a random maze following Aldous-Broder algorithm</li></ul>",
    "href": "https://codepen.io/borntofrappe/full/pooeyww",
    "id": 4
  },
  {
    "title": "Key Value Pairs",
    "description": "Add, update, delete and highlight key value pairs.",
    "details": "<p>The project sets up a basic <abbr title='Create Read Update Delete'>CRUD</abbr> application, for a hypothetical shopping list.</p><p>It is possible to modify the data, but also illustrate the items with a couple of basics visualization using <a href='https://d3js.org/'><code>d3.js</code></a>.</p>",
    "href": "https://svelte.dev/repl/2fead853d94049e79805984858db9adb",
    "id": 5
  }
]