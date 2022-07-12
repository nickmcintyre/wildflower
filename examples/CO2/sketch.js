const data = {
  year: [2017, 2018, 2019, 2020, 2021],
  co2: [406.76, 408.72, 411.66, 414.24, 416.45],
};
let plot;

function setup() {
  createCanvas(400, 400);

  plot = createPlot(data);
  plot.configure({ majorTicks: 4 });

  noLoop();

  describe('A line plot of carbon dioxide versus time showing a strong positive association.');
}

function draw() {
  plot.title('Atmospheric Carbon Dioxide at Mauna Loa Observatory');
  plot.xlabel('Year');
  plot.ylabel('CO2 (ppm)');
  plot.line({ x: 'year', y: 'co2' });
  plot.point({ x: 'year', y: 'co2' });
  plot.render();
}
