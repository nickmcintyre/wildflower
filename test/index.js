/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
describe('wildflower', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('createPlot()', function () {
    it('Should be a function', function () {
      expect(pInst.createPlot).to.be.an.instanceOf(Function);
    });
  });
});
