export const sortIndices = (array) => {
  const mapped = array.map((value, i) => ({ i, value }));
  mapped.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  return mapped.map((v) => v.i);
};

export const min = (array) => Math.min(...array);

export const max = (array) => Math.max(...array);

export const range = (array) => ({ min: min(array), max: max(array) });
