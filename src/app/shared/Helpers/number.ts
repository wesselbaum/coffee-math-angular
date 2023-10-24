export const parseFloatWithFallback = (
  input: string | number,
  fallback: number
): number => {
  const possibleFloat = parseFloat(`${input}`);
  if (isNaN(possibleFloat)) {
    return fallback;
  }
  return possibleFloat;
};

export const trimFloat = (float: number, decimals: number): number => {
  return parseFloat(float.toFixed(decimals));
};
