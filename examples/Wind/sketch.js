let wind
let plot

function preload() {
  wind = loadTable('wind.csv', 'csv', 'header')
}

function setup() {
  createCanvas(400, 400)
  plot = createPlot(wind)
}

function draw() {
  plot.title('Galveston offshore wind speed at 100m')
  plot.xlabel('Hour of Year')
  plot.ylabel('Wind Speed (m/s)')

  plot.line({ x: 'Hour', y: 'Speed' })
}
