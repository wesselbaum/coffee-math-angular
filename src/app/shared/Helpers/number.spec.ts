import { parseFloatWithFallback } from './number.helper';

describe('whatever', () => {
  it('should do something', () => {
    expect(parseFloatWithFallback('1', -1)).toEqual(1);
  });
});
