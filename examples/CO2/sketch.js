let year = [2017, 2018, 2019, 2020, 2021]
let co2 = [406.76, 408.72, 411.66, 414.24, 416.45]
let plot

function setup() {
  createCanvas(400, 400)

  plot = createPlot({ year, co2 })
}

function draw() {
  plot.title('Atmospheric Carbon Dioxide at Mauna Loa Observatory')
  plot.xlabel('Year')
  plot.ylabel('CO2 Concentration (ppm)')
  plot.line({ x: 'year', y: 'co2' })
  plot.point({ x: 'year', y: 'co2' })
}
