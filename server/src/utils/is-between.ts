export const isBetween = (value: number, { a, b }: { a: number; b: number }) => {
  return value >= Math.min(a, b) && value <= Math.max(a, b);
};

export const isBetweenHours = (value: number, { a, b }: { a: number; b: number }) => {
  return value >= a || value <= b;
};
