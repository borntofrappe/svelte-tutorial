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
      const max = Math.floor(index ** 1.25);
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

const axisGroup = wrapper.append('g');
const dataGroup = wrapper.append('g');
const highlightGroup = wrapper.append('g');

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
  .ticks(8)
  .tickSize(0)
  .tickPadding(10)
  .tickFormat(d => d3.timeFormat('%B %-d')(new Date(d)));

const yAxis = d3
  .axisLeft(yScale)
  .ticks(4)
  .tickSize(0)
  .tickPadding(18);

axisGroup
  .append('g')
  .attr('transform', `translate(0 ${dimensions.boundedHeight})`)
  .call(xAxis);

const yAxisGroup = axisGroup.append('g').call(yAxis);

axisGroup
  .selectAll('text')
  .attr('fill', 'currentColor')
  .attr('font-size', 17);

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

const highlight = {
  isMousedown: false,
  isDragging: false,
  coords: [0, 0],
  draggingCoords: [0, 0, 0],
  isResizing: false,
};

highlightGroup
  .append('rect')
  .attr('opacity', 0.2)
  .attr('height', dimensions.boundedHeight)
  .attr('fill', 'hsl(0, 0%, 14%)');

wrapper
  .append('rect')
  .style('cursor', 'crosshair')
  .attr('width', dimensions.boundedWidth)
  .attr('height', dimensions.boundedHeight)
  .attr('opacity', 0)
  .on('mousedown', event => {
    highlight.isMousedown = true;
    const [x] = d3.pointer(event);
    highlight.coords = [x, x];
    root.select('h1').text(dates.map(date => formatDate(date)).join(' - '));
    highlightGroup.select('rect').attr('width', 0);
  })
  .on('mouseup', () => {
    highlight.isMousedown = false;
    // here you'd consider the subset
  })
  .on('mouseleave', () => {
    highlight.isMousedown = false;
    // here you'd consider the subset
  })
  .on('mousemove', event => {
    if (highlight.isMousedown) {
      const [x] = d3.pointer(event);
      highlight.coords[1] = x;
      const [x0, x1] = d3.extent(highlight.coords);
      highlightGroup.attr('transform', `translate(${x0} 0)`);

      highlightGroup.select('rect').attr('width', x1 - x0);

      const startDate = xScale.invert(x0);
      const endDate = xScale.invert(x1);
      root
        .select('h1')
        .text([startDate, endDate].map(date => formatDate(date)).join(' - '));
    }
  });
