import { parseFloatWithFallback, trimFloat } from './number.helper';

describe('number helper', () => {
  it('should parseFloat', () => {
    expect(parseFloatWithFallback('1', 0)).toEqual(1);
    expect(parseFloatWithFallback('1.1', 0)).toEqual(1.1);
    expect(parseFloatWithFallback('1,1', 0)).toEqual(1.1);
    expect(parseFloatWithFallback('1,1a', 0)).toEqual(1.1);
    expect(parseFloatWithFallback('A', 0)).toEqual(0);
  });

  it('should trim float', () => {
    expect(trimFloat(1.23456789, 2)).toEqual(1.23);
    expect(trimFloat(1.558, 2)).toEqual(1.56);
  });
});
