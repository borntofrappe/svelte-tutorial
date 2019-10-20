# Infinity Maze

## Goal

Create an entertaining game in which a square moves within the boundaries of a maze to reach a goal, in an endless set of levels.

## Notes

This project is the fruition of several smaller-scale efforts, developing the game in its different components. You find the building components in the different sub-folders:

-   Maze grid: the grid ultimately used for the maze. Consider how the stroke is used alongside the viewBox attribute to avoid any cropping and have the maze literally nested inside the wrapping SVG element.

-   Maze player: the movement of the square within the boundaries of the larger maze. Ultimately the square needs to respect a more constrained set of boundaries, but this already gives an idea of how the player is meant to move in the maze.

-   Maze viewBox: the change in the attribute which ultimately needs to take place in between levels, while the maze is being built with the chosen algorithm. Use the buttons to reposition the player and zoom in/out the SVG element. The idea is to ultimately animate the change to be smooth over time, but already the code provides a window into how the maze might be built while the square is overlaid covers the entire viewpoint. Hit zoom and before zooming out hit reposition to see how the player changes its location in the grid, seemingly without changing its x and y coordinate.
