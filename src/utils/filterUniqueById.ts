export const filterUniqueById = <T extends { id: string }>(
  arr: T[],
): T[] => {
  const existingIds = new Set();

  return arr.filter(item => {
    if (existingIds.has(item.id)) {
      return false;
    }

    existingIds.add(item.id);

    return true;
  });
};
