let wind;
let timeSeries;
let barChart;

function preload() {
  wind = loadTable('wind.csv', 'csv', 'header');
}

function setup() {
  createCanvas(900, 500);

  timeSeries = createPlot(wind);
  timeSeries.size(900, 250);

  barChart = createPlot(wind);
  barChart.size(900, 250);
  barChart.position(0, 250);
}

function draw() {
  timeSeries.title('2008 Galveston offshore wind speed at 100m');
  timeSeries.xlabel('Hour of Year');
  timeSeries.ylabel('Wind Speed (m/s)');
  timeSeries.line({ x: 'Hour', y: 'Speed' });
  timeSeries.render();

  barChart.title('Wind speed distribution');
  barChart.xlabel('Wind Speed (m/s)');
  barChart.ylabel('Number of Hours');
  barChart.bar({ x: 'Speed' });
  barChart.render();

  hurricane(600, 30);
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
