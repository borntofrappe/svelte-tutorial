// hard coded values
const data = [
    {
      name: 'Apples',
      value: 30,
    },
    {
      name: 'Grapes',
      value: 25,
    },
    {
      name: 'Peaches',
      value: 20,
    },
    {
      name: 'Tomatoes',
      value: 18,
    },
    {
      name: 'Bananas',
      value: 15,
    },
    {
      name: 'Apricots',
      value: 10,
    },
    {
      name: 'Aubergine',
      value: 5,
    },
    {
      name: 'Artichoke',
      value: 2,
    },
    {
      name: 'Almonds',
      value: 1,
    },
  ];

  // color scale used in both visualizations
  const scaleColor = d3.scaleOrdinal(d3.schemeTableau10);

  // pie chart
  const pieChartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  };

  const pieChartWidth = 400;
  const pieChartHeight = 400;

  const pieChart = d3
    .select('section')
    .append('svg')
    .attr(
      'viewBox',
      `0 0 ${pieChartWidth +
        (pieChartMargin.left + pieChartMargin.right)} ${pieChartHeight +
        (pieChartMargin.top + pieChartMargin.bottom)}`
    )
    .attr('width', pieChartWidth)
    .attr('height', pieChartHeight);

  pieChart
    .append('rect')
    .attr('opacity', 0)
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', pieChartWidth + (pieChartMargin.left + pieChartMargin.right))
    .attr('height', pieChartHeight + (pieChartMargin.top + pieChartMargin.bottom))
    .attr('rx', '20')
    .attr('fill', 'hsl(240, 30%, 95%');

  const pieChartGroup = pieChart
    .append('g')
    .attr('transform', `translate(${pieChartMargin.left} ${pieChartMargin.top})`);

  // pie function, based on the individual values of the input array
  const pie = d3.pie().value(d => d.value);

  // arc function, describing a hollow pie, a donut chart
  const arc = d3
    .arc()
    .innerRadius(pieChartWidth / 3)
    .outerRadius(pieChartWidth / 2);

  // starting at the center of the svg include one path for each arc
  const pieChartCenter = pieChartGroup
    .append('g')
    .attr('transform', `translate(${pieChartWidth / 2} ${pieChartHeight / 2})`);

  pieChartCenter
    .selectAll('path.arc')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('d', arc)
    .attr('fill', (d, i) => scaleColor(i));

  // at the center of the pie display the total value
  pieChartCenter
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', pieChartWidth / 8)
    .text(data.reduce((acc, curr) => acc + curr.value, 0))
    .attr('fill', 'hsl(240, 40%, 95%)');

  // row chart for the top 5 values
  const topFive = [
    ...data.sort((a, b) => (a.value < b.value ? 1 : -1)).slice(0, 5),
  ];

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
    .domain([0, d3.max(topFive, d => d.value) * 1.25])
    .range([0, rowChartWidth])
    .nice();

  // vertically consider one band for each item
  const yScale = d3
    .scaleBand()
    .domain(d3.range(topFive.length))
    .range([0, rowChartHeight]);

  // the idea is to fabricate a lollipop chart with a line and a circle leading up to the item's name
  const rowChartGroups = rowChartGroup
    .selectAll('g.row')
    .data(topFive)
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
    .attr('stroke-width', '7');

  const rowChartValue = rowChartGroups
    .append('g')
    .attr('transform', d => `translate(${xScale(d.value)} 0)`);

  rowChartValue
    .append('circle')
    .attr('cx', '0')
    .attr('cy', '0')
    .attr('r', '12')
    .attr('fill', (d, i) => scaleColor(i));
  rowChartValue
    .append('text')
    .attr('x', '25')
    .attr('y', '0')
    .attr('font-size', rowChartWidth / 20)
    .attr('dominant-baseline', 'middle')
    .attr('fill', 'hsl(240, 25%, 95%)')
    .text(d => d.name);
