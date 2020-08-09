describe('number_line', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
    plt.p5Utils.setP5Instance(pInst);
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('NumberLine2D', function () {
    it('Should exist', function () {
      const n = new plt.NumberLine2D();
      expect(n).to.be.an.instanceOf(plt.NumberLine2D);
    });
  });

  describe('NumberLine3D', function () {
    it('Should exist', function () {
      const n = new plt.NumberLine3D();
      expect(n).to.be.an.instanceOf(plt.NumberLine3D);
    });
  });
});
