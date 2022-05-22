/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';
import { sortIndices, range } from '../utils';

/**
 * A class to describe a layer of data.
 */
export default class DataLayer {
  constructor(x, y, data) {
    this.raw = { x, y, data };
    this.sorted = {};
    this._sort();
  }

  _sort() {
    let x;
    let y;
    if (this.raw.data instanceof p5.Table) {
      x = this.raw.data.getColumn(this.raw.x);
      y = this.raw.data.getColumn(this.raw.y);
    } else if (this.raw.data instanceof Object) {
      x = this.raw.data[this.raw.x];
      y = this.raw.data[this.raw.y];
    } else {
      x = this.raw.x;
      y = this.raw.y;
    }
    const indices = sortIndices(x);
    this.sorted.x = indices.map((i) => x[i]);
    this.sorted.y = indices.map((i) => y[i]);
    this.sorted.xRange = range(this.sorted.x);
    this.sorted.yRange = range(this.sorted.y);
  }

  equals(x, y) {
    return x === this.raw.x && y === this.raw.y;
  }
}
