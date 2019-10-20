# Infinity Maze

## Goal

Create an entertaining game in which a square moves within the boundaries of a maze to reach a goal, in an endless set of levels.

## Notes

This project is the fruition of several smaller-scale efforts, developing the game in its different components. You find the building components in the different sub-folders:

-   Maze grid: the grid ultimately used for the maze. Consider how the stroke is used alongside the viewBox attribute to avoid any cropping and have the maze literally nested inside the wrapping SVG element.

-   Maze player: the movement of the square within the boundaries of the larger maze. Ultimately the square needs to respect a more constrained set of boundaries, but this already gives an idea of how the player is meant to move in the maze.
