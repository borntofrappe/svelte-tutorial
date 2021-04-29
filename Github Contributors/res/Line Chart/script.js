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

  const days = 45;
  const endDate = new Date();
  const data = [];

  for (let day = 0; day < days; day += 1) {
    names.forEach((name, index) => {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - day);
      const max = Math.floor((index + 1 + Math.abs(day - days / 2)) ** 0.5);
      const commits = randomInt(max, max / 10);
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

const dataDays = Object.entries(
  data.reduce((acc, curr) => {
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
}));

const dates = d3.extent(dataDays, d => new Date(d.date));
const formatDate = d3.timeFormat('%b %-d, %Y');
const root = d3.select('main');
root.append('h1').text(dates.map(date => formatDate(date)).join(' - '));
root
  .append('p')
  .text('Contributions to master, excluding merge commits and bot accounts');

const dimensions = {
  width: 1000,
  height: 300,
  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40,
  },
};

dimensions.boundedWidth =
  dimensions.width - (dimensions.margin.left + dimensions.margin.right);
dimensions.boundedHeight =
  dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

const wrapper = root
  .append('section')
  .append('svg')
  .attr('width', dimensions.width)
  .attr('height', dimensions.height)
  .attr('viewBox', [
    -dimensions.margin.left,
    -dimensions.margin.top,
    dimensions.width,
    dimensions.height,
  ]);

const xScale = d3
  .scaleTime()
  .domain(dates)
  .range([0, dimensions.boundedWidth]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataDays, d => d.commits)])
  .range([dimensions.boundedHeight, 0])
  .nice();

const xAxis = d3
  .axisBottom(xScale)
  .ticks(10)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat(d => d3.timeFormat('%B %-d')(new Date(d)));
const yAxis = d3
  .axisLeft(yScale)
  .ticks(4)
  .tickSize(0)
  .tickPadding(18);

const axisGroup = wrapper.append('g');
const dataGroup = wrapper.append('g');

axisGroup
  .append('g')
  .attr('transform', `translate(0 ${dimensions.boundedHeight})`)
  .call(xAxis);

const yAxisGroup = axisGroup.append('g').call(yAxis);

axisGroup
  .selectAll('text')
  .attr('fill', 'currentColor')
  .attr('font-size', 19);

axisGroup.selectAll('path').remove();

yAxisGroup
  .selectAll('g.tick')
  .append('path')
  .attr('d', `M 0 0 h ${dimensions.boundedWidth}`)
  .attr('stroke', 'currentColor')
  .attr('stroke-width', 0.5)
  .attr('opacity', 0.25);

const areaGenerator = d3
  .area()
  .x(d => xScale(new Date(d.date)))
  .y0(d => yScale(d.commits))
  .y1(dimensions.boundedHeight)
  .curve(d3.curveCatmullRom);

dataGroup
  .append('path')
  .attr('fill', '#28a74577')
  .attr('d', areaGenerator(dataDays));
