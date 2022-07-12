let wind;
let timeSeries;
let barChart;

function preload() {
  wind = loadTable('wind/2008.csv', 'csv', 'header');
}

function setup() {
  createCanvas(900, 500);

  wind.parseDates('Time');
  wind.inferTypes();
  timeSeries = createPlot(wind);
  timeSeries.size(900, 250);

  barChart = createPlot(wind);
  barChart.size(900, 250);
  barChart.position(0, 250);

  const description = `The first plot shows a noisy time series of wind speed
  with a clear spike. The second plot shows a right-skewed distribution of wind
  speed. A pair of hurricane symbols rotate, one above the time series' spike and
  the other above the distribution's tail.`;
  describe(description);
}

function draw() {
  timeSeries.title('2008 Galveston offshore wind speed at 100m');
  timeSeries.xlabel('Date');
  timeSeries.ylabel('Wind speed (m/s)');
  timeSeries.line({ x: 'Time', y: 'Speed' });
  timeSeries.render();

  barChart.title('Distribution of speed');
  barChart.xlabel('Wind speed (m/s)');
  barChart.ylabel('Number of Hours');
  barChart.bar({ x: 'Speed' });
  barChart.render();

  hurricane(600, 30);
  hurricane(750, 415);
}

function hurricane(x, y) {
  push();
  translate(x, y);
  stroke('red');
  strokeWeight(5);
  fill('white');
  const r = 10;
  circle(0, 0, 2 * r);
  const angle = -frameCount / 10;
  rotate(angle);
  line(0, -r, 1.5 * r, -r);
  line(0, r, -1.5 * r, r);
  pop();
}
