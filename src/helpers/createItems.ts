export const createItems = (amount: number) => {
  return Array.from({ length: amount }).map((_, idx) => idx);
};
