# Github Contributors

## Notes

The goal of this repository is to replicate one of the visualizations Github proposes in the insight section of public repository, and specifically the one dedicated to contributors.

The visualization is composed of two main areas: a line chart highlighting the number of commits for the entire repository and a series of components detailing the same metric for each and every contributor.

### res

In the `res` folder I dedicate a couple of projects to the building blocks of the application:

- `Contributor` describes the design of the component for individual contributors.

- `Data Contributions` tries to create the data ultimately necessary for the visualization.

  `data` is built to be an array of objects detailing a name, date, as well as a number of additions and deletions.

  ```js
  /*
  name,
  date,
  additions,
  deletions
  */
  ```

  The idea is to have each object represent a commit. Ultimately, the line chart(s) will consider the number of commits based on the date. In the specific demo, the data considers the different names to reproduce the component for each contributor.

- `Line Chart` leans on D3 to map the contributions by date and commits.

  When recreating the visualization for the different contributors, the chart should be modified in color, `#fb8532`, and also in termsof vertical scale, from 0 up to the maximum number of commits recorded by one contributor.
