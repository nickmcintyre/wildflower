describe('p5.plot', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('Library smoke test', function () {
    it('Should exist', function () {
      expect(plt).to.be.an.instanceOf(Object);
    });
  });
});
