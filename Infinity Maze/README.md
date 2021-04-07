# [Infinity Maze](https://codepen.io/borntofrappe/full/pooeyww)

## Notes

This project is the fruition of several smaller-scale efforts, developing the game in its different components. You find the building components in the `res` folder:

- `Maze grid`: the grid ultimately used for the maze. Consider how the stroke is used alongside the viewBox attribute to avoid any cropping and have the maze literally nested inside the wrapping SVG element.

- `Maze player`: the movement of the square within the boundaries of the larger maze. Ultimately the square needs to respect a more constrained set of boundaries, but this already gives an idea of how the player is meant to move in the maze.

- `Maze viewBox`: the change in the attribute which ultimately needs to take place in between levels, while the maze is being built with the chosen algorithm. Use the buttons to reposition the player and zoom in/out the SVG element. The idea is to ultimately animate the change to be smooth over time, but already the code provides a window into how the maze might be built while the square is overlaid covers the entire viewpoint. Hit zoom and before zooming out hit reposition to see how the player changes its location in the grid, seemingly without changing its x and y coordinate.

- `Maze algorithm`: the algorithm producing a random maze following Aldous-Broder approach. The idea is to use the then algorithm to further constrain the movement of the player. Aldous Broder provide an unbiased approach, albeit an algorithm with serious efficiency issues. I would like to update the code to use something more refined, like a recursive backtracker algorithm, but for the time being it provides a good enough solution for the maze, especially considering its relatively small size. It is certainly an improvement over the binary tree or sidewinder algorithm which I've developed in past projects.

- `Game UI`: the layout picked for the game, with the maze surrounded by four buttons. I decided to create a separate project to focus on CSS grid property, and ultimately use the same property value pairs in the global stylesheet. This frees the `.svelte` files to focus on the markup and JavaScript. I find it also more sensible to have the rules governing the position of the elements to be in the global scope.

- `Maze promise`: the JavaScript code allowing to incorporate a completely random maze. Algorithms like Aldous-Broder take time to develop and with this project I set out to return a promise with the desired data structure. This is picked up by `App.svelte` to then display the cells with and without the appropriate gates.
