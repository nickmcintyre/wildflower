const scaleXContinuous = (props) => {
  const {
    width,
    majorTicks,
    minorTicks,
  } = props;
  const numXTicks = majorTicks * (minorTicks + 1);
  const dx = width / (numXTicks + 2);
  return { numXTicks, dx };
};

const scaleYContinuous = (props) => {
  const {
    height,
    majorTicks,
    minorTicks,
  } = props;
  const numYTicks = majorTicks * (minorTicks + 1);
  const dy = height / (numYTicks + 2);
  return { numYTicks, dy };
};

export {
  scaleXContinuous,
  scaleYContinuous,
};
