describe('geometry', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
    plt.p5Utils.setP5Instance(pInst);
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('Line2D', function () {
    it('Should exist', function () {
      const l = new plt.Line2D();
      expect(l).to.be.an.instanceOf(plt.Line2D);
    });
  });

  describe('Arrow2D', function () {
    it('Should exist', function () {
      const a = new plt.Arrow2D();
      expect(a).to.be.an.instanceOf(plt.Arrow2D);
    });
  });

  describe('Vector2D', function () {
    it('Should exist', function () {
      const v = new plt.Vector2D();
      expect(v).to.be.an.instanceOf(plt.Vector2D);
    });
  });

  describe('DoubleArrow2D', function () {
    it('Should exist', function () {
      const a = new plt.DoubleArrow2D();
      expect(a).to.be.an.instanceOf(plt.DoubleArrow2D);
    });
  });

  describe('Line3D', function () {
    it('Should exist', function () {
      const l = new plt.Line3D();
      expect(l).to.be.an.instanceOf(plt.Line3D);
    });
  });

  describe('Arrow3D', function () {
    it('Should exist', function () {
      const a = new plt.Arrow3D();
      expect(a).to.be.an.instanceOf(plt.Arrow3D);
    });
  });

  describe('Vector3D', function () {
    it('Should exist', function () {
      const v = new plt.Vector3D();
      expect(v).to.be.an.instanceOf(plt.Vector3D);
    });
  });

  describe('DoubleArrow3D', function () {
    it('Should exist', function () {
      const a = new plt.DoubleArrow3D();
      expect(a).to.be.an.instanceOf(plt.DoubleArrow3D);
    });
  });

  describe('Surface2D', function () {
    it('Should exist', function () {
      const s = new plt.Surface2D();
      expect(s).to.be.an.instanceOf(plt.Surface2D);
    });
  });

  describe('Surface3D', function () {
    it('Should exist', function () {
      const s = new plt.Surface3D();
      expect(s).to.be.an.instanceOf(plt.Surface3D);
    });
  });

  describe('Volume', function () {
    it('Should exist', function () {
      const v = new plt.Volume();
      expect(v).to.be.an.instanceOf(plt.Volume);
    });
  });
});
