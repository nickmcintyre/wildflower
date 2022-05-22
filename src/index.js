/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';
import { pointGeom, lineGeom, squareGeom } from './geom';
import { drawAxes, drawGrid } from './guide';
import { drawTitle, drawXLabel, drawYLabel } from './annotation/labels';
import * as PALETTE from './theme/palettes';
import DataLayer from './data';
import './table';

p5.prototype._plotData = {
  plots: [],
};

/**
 * A class to describe a plot.
 */
class Plot {
  constructor(pInst, raw) {
    // Data
    this.data = {
      raw,
      sorted: [],
    };
    this.label = { x: '', y: '' };
    // Position and dimension
    this.x = 0;
    this.y = 0;
    this.width = pInst.width;
    this.height = pInst.height;
    // Renderers
    this.renderers = {
      annotations: pInst.createGraphics(this.width, this.height),
      layers: pInst.createGraphics(this.width, this.height),
    };
    pInst._plotData.plots.push(this);
    // Color
    this.layerPalette = PALETTE.layers.colorblind;
    this.numLayers = 0;
    // Axes styles
    const padding = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };
    this.styleProps = {
      pg: this.renderers.layers,
      padding,
      x: this.x + padding.left,
      y: this.y + this.height - padding.top,
      width: this.width - padding.left - padding.right,
      height: this.height - padding.top - padding.bottom,
      majorTicks: 5,
      minorTicks: 4,
      tickSize: 4,
      fontColor: PALETTE.annotations.default.fontColor,
      axesColor: PALETTE.annotations.default.axesColor,
      gridColor: PALETTE.annotations.default.gridColor,
      backgroundColor: PALETTE.annotations.default.backgroundColor,
    };
    this.annotationOps = [];
    this.layerOps = [];
  }

  _wrangle() {
    if (this.data.raw instanceof p5.Table) {
      this.data.raw.inferType();
    }
  }

  _preprocess(x, y) {
    let sortedData = false;
    this.data.sorted.forEach((layer) => {
      if (layer.equals(x, y)) {
        sortedData = layer.sorted;
      }
    });
    if (!sortedData) {
      const layer = new DataLayer(x, y, this.data.raw);
      this.data.sorted.push(layer);
      sortedData = layer.sorted;
    }
    return [
      sortedData.x,
      sortedData.y,
      sortedData.xRange,
      sortedData.yRange,
    ];
  }

  position(x, y) {
    this.x = x;
    this.y = y;
  }

  theme(name) {
    if (typeof name === 'string') {
      this.layerPalette = PALETTE[name];
    } else if (name instanceof Object) {
      //
    }
  }

  _annotations() {
    this.xlabel();
    this.ylabel();
    this.gridLines();
    this.axes();
    this.background();
  }

  background(color) {
    if (color) {
      this.styleProps.backgroundColor = color;
    }
    const op = {
      f: this.renderers.annotations.background,
      props: this.styleProps.backgroundColor,
    };
    this.annotationOps.unshift(op);
  }

  gridLines(color) {
    if (color) {
      this.styleProps.gridColor = color;
    }
    const props = {
      pg: this.renderers.annotations,
      x: this.styleProps.x,
      y: this.styleProps.y,
      width: this.styleProps.width,
      height: this.styleProps.height,
      majorTicks: this.styleProps.majorTicks,
      minorTicks: this.styleProps.minorTicks,
      gridColor: this.styleProps.gridColor,
    };
    const op = { f: drawGrid, props };
    this.annotationOps.unshift(op);
  }

  axes() {
    const op = { f: drawAxes, props: this.styleProps };
    this.annotationOps.unshift(op);
  }

  title(name) {
    const props = {
      pg: this.renderers.annotations,
      padding: this.styleProps.padding.top,
      name,
      color: this.styleProps.fontColor,
    };
    const op = { f: drawTitle, props };
    this.annotationOps.push(op);
  }

  xlabel(name) {
    this.label.x = name || this.label.x;
    const props = {
      pg: this.renderers.annotations,
      ox: this.styleProps.x,
      oy: this.styleProps.y,
      width: this.styleProps.width,
      name: this.label.x,
      color: this.styleProps.fontColor,
    };
    const op = { f: drawXLabel, props };
    this.annotationOps.push(op);
  }

  ylabel(name) {
    this.label.y = name || this.label.y;
    const props = {
      pg: this.renderers.annotations,
      ox: this.styleProps.x,
      oy: this.styleProps.y,
      height: this.styleProps.height,
      name: this.label.y,
      color: this.styleProps.fontColor,
    };
    const op = { f: drawYLabel, props };
    this.annotationOps.push(op);
  }

  fill(color) {
    const op = { f: this.renderers.layers.fill, props: color };
    this.layerOps.push(op);
  }

  stroke(color) {
    const op = { f: this.renderers.layers.stroke, props: color };
    this.layerOps.push(op);
  }

  strokeWeight(weight) {
    const op = { f: this.renderers.layers.strokeWeight, props: weight };
    this.layerOps.push(op);
  }

  point(...args) {
    let x;
    let y;
    let xRange;
    let yRange;
    let size;
    if (
      args[0] instanceof Array
      && args[1] instanceof Array
      && args[0].length === args[1].length
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0], args[1]);
      size = args[2] || 10;
    } else if (
      this.data.raw instanceof p5.Table
      && typeof args[0] === 'object'
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0].x, args[0].y);
      this.label.x = args[0].x;
      this.label.y = args[0].y;
      size = args[0].size || 10;
    } else if (
      this.data.raw instanceof Object
      && typeof args[0] === 'object'
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0].x, args[0].y);
      this.label.x = args[0].x;
      this.label.y = args[0].y;
      size = args[0].size || 10;
    }
    const props = {
      pg: this.renderers.layers,
      x,
      y,
      xRange,
      yRange,
      size,
      color: this.layerPalette[this.numLayers],
      ox: this.styleProps.x,
      oy: this.styleProps.y,
      width: this.styleProps.width,
      height: this.styleProps.height,
      majorTicks: this.styleProps.majorTicks,
      minorTicks: this.styleProps.minorTicks,
    };
    const op = { f: pointGeom, props };
    this.layerOps.push(op);
    this.numLayers += 1;
  }

  square(...args) {
    let x;
    let y;
    let xRange;
    let yRange;
    let size;
    if (
      args[0] instanceof Array
      && args[1] instanceof Array
      && args[0].length === args[1].length
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0], args[1]);
      size = args[2] || 10;
    } else if (
      this.data.raw instanceof p5.Table
      && typeof args[0] === 'object'
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0].x, args[0].y);
      this.label.x = args[0].x;
      this.label.y = args[0].y;
      size = args[0].size || 10;
    } else if (
      this.data.raw instanceof Object
      && typeof args[0] === 'object'
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0].x, args[0].y);
      this.label.x = args[0].x;
      this.label.y = args[0].y;
      size = args[0].size || 10;
    }
    const props = {
      pg: this.renderers.layers,
      x,
      y,
      xRange,
      yRange,
      size,
      color: this.layerPalette[this.numLayers],
      ox: this.styleProps.x,
      oy: this.styleProps.y,
      width: this.styleProps.width,
      height: this.styleProps.height,
      majorTicks: this.styleProps.majorTicks,
      minorTicks: this.styleProps.minorTicks,
    };
    const op = { f: squareGeom, props };
    this.layerOps.push(op);
    this.numLayers += 1;
  }

  line(...args) {
    let x;
    let y;
    let xRange;
    let yRange;
    if (
      args[0] instanceof Array
      && args[1] instanceof Array
      && args[0].length === args[1].length
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0], args[1]);
    } else if (
      this.data.raw instanceof p5.Table
      && typeof args[0] === 'object'
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0].x, args[0].y);
      this.label.x = args[0].x;
      this.label.y = args[0].y;
    } else if (
      this.data.raw instanceof Object
      && typeof args[0] === 'object'
    ) {
      [x, y, xRange, yRange] = this._preprocess(args[0].x, args[0].y);
      this.label.x = args[0].x;
      this.label.y = args[0].y;
    }
    const props = {
      pg: this.renderers.layers,
      x,
      y,
      color: this.layerPalette[this.numLayers],
      ox: this.styleProps.x,
      oy: this.styleProps.y,
      width: this.styleProps.width,
      height: this.styleProps.height,
      majorTicks: this.styleProps.majorTicks,
      minorTicks: this.styleProps.minorTicks,
      xRange,
      yRange,
    };
    const op = { f: lineGeom, props };
    this.layerOps.push(op);
    this.numLayers += 1;
  }
}

// Registered methods

p5.prototype.createPlot = function (data) {
  return new Plot(this, data);
};

p5.prototype._drawPlots = function () {
  this._plotData.plots.forEach((plot) => {
    plot._annotations();
    plot.annotationOps.forEach((op) => op.f(op.props));
    plot.layerOps.forEach((op) => op.f(op.props));
    this.image(plot.renderers.annotations, plot.x, plot.y, plot.width, plot.height);
    this.image(plot.renderers.layers, plot.x, plot.y, plot.width, plot.height);
    plot.annotationOps = [];
    plot.layerOps = [];
    plot.numLayers = 0;
  });
};

p5.prototype.registerMethod('post', p5.prototype._drawPlots);

p5.prototype._removeFigures = function () {
  this._plotData.plots.forEach((fig) => fig.pg.remove());
  this._plotData.plots = [];
};

p5.prototype.registerMethod('remove', p5.prototype._removeFigures);
