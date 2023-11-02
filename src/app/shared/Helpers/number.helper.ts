export const parseFloatWithFallback = (
  input: string | number,
  fallback: number
): number => {
  const preparedInput = `${input}`.replace(',', '.');
  const possibleFloat = parseFloat(`${preparedInput}`);
  if (isNaN(possibleFloat)) {
    return fallback;
  }
  return possibleFloat;
};

export const trimFloat = (float: number, decimals: number): number => {
  return parseFloat(float.toFixed(decimals));
};
