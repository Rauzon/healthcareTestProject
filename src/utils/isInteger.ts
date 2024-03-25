export const isInteger = (input: string): boolean => {
  const num = Number(input);

  return Number.isInteger(num);
};
