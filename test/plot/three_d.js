describe('three_d', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
    plt.p5Utils.setP5Instance(pInst);
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('Plot3D', function () {
    it('Should exist', function () {
      const p = new plt.Plot3D();
      expect(p).to.be.an.instanceOf(plt.Plot3D);
    });
  });
});
