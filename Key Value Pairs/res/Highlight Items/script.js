// hard coded values
const dataset = [
  { name: 'Apples', value: 40 },
  { name: 'Grapes', value: 20 },
  { name: 'Peaches', value: 15 },
  { name: 'Tomatoes', value: 10 },
  { name: 'Bananas', value: 7 },
  { name: 'Apricots', value: 6 },
  { name: 'Aubergine', value: 5 },
  { name: 'Artichoke', value: 2 },
  { name: 'Almonds', value: 1 },
];

// data highlighting the biggest values and a catch-all category
const categories = 5;
const sortedDataset = [...dataset.sort((a, b) => b.value - a.value)];
const data = [
  ...sortedDataset.slice(0, categories - 1),
  {
    name: 'Other',
    value: sortedDataset
      .slice(categories - 1)
      .reduce((acc, curr) => acc + curr.value, 0),
  },
];

// color scale used in both visualizations
const scaleColor = d3.scaleOrdinal(d3.schemeTableau10);

// PIE CHART
const pieChartMargin = 90;

const pieChartWidth = 400;
const pieChartHeight = 400;

const pieChart = d3
  .select('section')
  .append('svg')
  .attr(
    'viewBox',
    `0 0 ${pieChartWidth + (pieChartMargin + pieChartMargin)} ${pieChartHeight +
      (pieChartMargin + pieChartMargin)}`
  )
  .attr('width', pieChartWidth)
  .attr('height', pieChartHeight);

const pieChartGroup = pieChart
  .append('g')
  .attr('transform', `translate(${pieChartMargin} ${pieChartMargin})`);

// pie function, based on the individual values of the input array
const pie = d3
  .pie()
  .value(d => d.value)
  .sort(null);
const pieData = pie([...data]);

// arc function, describing a hollow pie, a donut chart
const arc = d3
  .arc()
  .innerRadius(pieChartWidth / 3)
  .outerRadius(pieChartWidth / 2);

const arcLabels = d3
  .arc()
  .innerRadius(pieChartWidth / 2 + pieChartMargin / 2)
  .outerRadius(pieChartWidth / 2 + pieChartMargin / 2);

// starting at the center of the svg include one path for each arc
const pieChartCenter = pieChartGroup
  .append('g')
  .attr('transform', `translate(${pieChartWidth / 2} ${pieChartHeight / 2})`);

pieChartCenter
  .selectAll('path.arc')
  .data(pieData)
  .enter()
  .append('path')
  .attr('class', 'arc')
  .attr('d', arc)
  .attr('fill', (d, i) => scaleColor(i));

pieChartCenter
  .selectAll('text.label')
  .data(pieData)
  .enter()
  .append('text')
  .attr('class', 'label')
  .attr('transform', d => {
    const [x, y] = arcLabels.centroid(d);
    return `translate(${x} ${y})`;
  })
  .text(d => d.data.name)
  .attr('fill', 'currentColor')
  .style('text-transform', 'capitalize')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'middle');

// at the center of the pie display the total value
pieChartTotal = pieChartCenter
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'middle')
  .attr('fill', 'hsl(240, 40%, 95%)')

pieChartTotal
  .append('tspan')
  .attr('font-size', 68)
  .text(data.reduce((acc, curr) => acc + curr.value, 0))

pieChartTotal
  .append('tspan')
  .attr('x', 0)
  .attr('dy', 58)
  .attr('font-size', 24)
  .text('Items');

// ROW CHART
const rowChartMargin = {
  top: 30,
  right: 50,
  bottom: 30,
  left: 50,
};

const rowChartWidth = 400;
const rowChartHeight = 400;

const rowChart = d3
  .select('section')
  .append('svg')
  .attr(
    'viewBox',
    `0 0 ${rowChartWidth +
      (rowChartMargin.left + rowChartMargin.right)} ${rowChartHeight +
      (rowChartMargin.top + rowChartMargin.bottom)}`
  )
  .attr('width', rowChartWidth)
  .attr('height', rowChartHeight);

const rowChartGroup = rowChart
  .append('g')
  .attr('transform', `translate(${rowChartMargin.left} ${rowChartMargin.top})`);

// horizontally consider the values
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.value) * 1.25])
  .range([0, rowChartWidth])
  .nice();

// vertically consider one band for each item
const yScale = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, rowChartHeight]);

// the idea is to fabricate a lollipop chart with a line and a circle leading up to the item's name
const rowChartGroups = rowChartGroup
  .selectAll('g.row')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'row')
  .attr(
    'transform',
    (d, i) => `translate(0 ${yScale(i) + yScale.bandwidth() / 2})`
  );

rowChartGroups
  .append('path')
  .attr('d', d => `M 0 0 h ${xScale(d.value)}`)
  .attr('fill', 'none')
  .attr('stroke', (d, i) => scaleColor(i))
  .attr('stroke-linecap', 'round')
  .attr('stroke-width', '4');

const rowChartValue = rowChartGroups
  .append('g')
  .attr('transform', d => `translate(${xScale(d.value)} 0)`);

rowChartValue
  .append('circle')
  .attr('cx', '0')
  .attr('cy', '0')
  .attr('r', '8')
  .attr('fill', (d, i) => scaleColor(i));

rowChartValue
  .append('text')
  .attr('x', '25')
  .attr('y', '0')
  .attr('font-size', rowChartWidth / 20)
  .attr('dominant-baseline', 'middle')
  .attr('fill', 'hsl(240, 25%, 95%)')
  .text(d => d.name);
