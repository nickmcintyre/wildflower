describe('two_d', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
    plt.p5Utils.setP5Instance(pInst);
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('Axes2D', function () {
    it('Should exist', function () {
      const a = new plt.Axes2D();
      expect(a).to.be.an.instanceOf(plt.Axes2D);
    });
  });

  describe('Axes3D', function () {
    it('Should exist', function () {
      const a = new plt.Axes3D();
      expect(a).to.be.an.instanceOf(plt.Axes3D);
    });
  });

  describe('NumberPlane', function () {
    it('Should exist', function () {
      const p = new plt.NumberPlane();
      expect(p).to.be.an.instanceOf(plt.NumberPlane);
    });
  });

  describe('ComplexPlane', function () {
    it('Should exist', function () {
      const p = new plt.ComplexPlane();
      expect(p).to.be.an.instanceOf(plt.ComplexPlane);
    });
  });
});
