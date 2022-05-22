// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';

p5.Table.prototype.asNum = function (column) {
  this.rows.forEach((row) => {
    const num = row.getNum(column);
    row.setNum(column, num);
  });
};

p5.Table.prototype.asString = function (column) {
  this.rows.forEach((row) => {
    const str = row.getString(column);
    row.setString(column, str);
  });
};

p5.Table.prototype.inferType = function () {
  this.columns.forEach((column) => {
    try {
      this.asNum(column);
    } catch (error) {
      // pass silently
    }
  });
};
