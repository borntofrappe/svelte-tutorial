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

const data = getData();

const dataNames = Object.entries(
  data.reduce((acc, curr) => {
    const { name, date, additions, deletions } = curr;
    if (acc[name]) {
      acc[name].push({
        date,
        additions,
        deletions,
      });
    } else {
      acc[name] = [
        {
          date,
          additions,
          deletions,
        },
      ];
    }
    return acc;
  }, {})
).map(([name, commits]) => ({
  name,
  commits: Object.entries(
    commits.reduce((acc, curr) => {
      const { date, additions, deletions } = curr;
      if (acc[date]) {
        acc[date].commits += 1;
        acc[date].additions += additions;
        acc[date].deletions += deletions;
      } else {
        acc[date] = {
          commits: 1,
          additions,
          deletions,
        };
      }
      return acc;
    }, {})
  ).map(([date, d]) => ({
    date,
    ...d,
  })),
}));

const dimensions = {
  width: 1000,
  height: 300,
  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 50,
  },
};

dimensions.boundedWidth =
  dimensions.width - (dimensions.margin.left + dimensions.margin.right);
dimensions.boundedHeight =
  dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

const dates = d3.extent(data, d => d.date);

const xScale = d3
  .scaleTime()
  .domain(dates)
  .range([0, dimensions.boundedWidth]);

const yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(
      dataNames.reduce((acc, curr) => [...acc, ...curr.commits], []),
      d => d.commits
    ),
  ])
  .range([dimensions.boundedHeight, 0])
  .nice();

const areaGenerator = d3
  .area()
  .x(d => xScale(new Date(d.date)))
  .y0(d => yScale(d.commits))
  .y1(dimensions.boundedHeight)
  .curve(d3.curveCatmullRom);

const root = d3.select('main');

dataNames.forEach(({ commits }) => {
  const wrapper = root
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
    .attr('viewBox', [
      -dimensions.margin.left,
      -dimensions.margin.top,
      dimensions.width,
      dimensions.height,
    ]);

  const axisGroup = wrapper.append('g');
  const dataGroup = wrapper.append('g');

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(8)
    .tickSize(0)
    .tickPadding(10)
    .tickFormat(d => d3.timeFormat('%B %-d')(new Date(d)));

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(3)
    .tickSize(0)
    .tickPadding(18);

  const yAxisGroup = axisGroup.append('g').call(yAxis);

  axisGroup
    .append('g')
    .attr('transform', `translate(0 ${dimensions.boundedHeight})`)
    .call(xAxis);

  axisGroup
    .selectAll('text')
    .attr('fill', 'currentColor')
    .attr('font-size', 24);

  axisGroup.selectAll('path').remove();

  yAxisGroup
    .selectAll('g.tick')
    .append('path')
    .attr('d', `M 0 0 h ${dimensions.boundedWidth}`)
    .attr('stroke', 'currentColor')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.25);

  dataGroup
    .append('path')
    .attr('fill', '#fb8532')
    .attr('d', areaGenerator(commits));
});
