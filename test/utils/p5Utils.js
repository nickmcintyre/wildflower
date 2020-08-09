describe('p5Utils', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
    plt.p5Utils.setP5Instance(pInst);
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('setP5Instance()', function () {
    it('Should set the p5 instance', function () {
      expect(plt.p5Utils.p5Instance).to.equal(pInst);
    });
  });

  describe('checkP5()', function() {
    it('Should detect p5 in the environment', function () {
      expect(plt.p5Utils.checkP5()).to.equal(true);
    });
  });
});
