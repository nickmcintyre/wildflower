describe('two_d', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
    plt.p5Utils.setP5Instance(pInst);
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('Plot2D', function () {
    it('Should exist', function () {
      const p = new plt.Plot2D();
      expect(p).to.be.an.instanceOf(plt.Plot2D);
    });
  });
});
