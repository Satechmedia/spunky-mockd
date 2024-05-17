export const dataSorter = <T extends Record<string, any>>(
  obj: T | null,
): T | null => {
  if (obj === null) {
    return null;
  }
  const keys = Object.keys(obj);

  const sortedKeys = keys.sort((a, b) => {
    const isANumeric = !isNaN(Number(a));
    const isBNumeric = !isNaN(Number(b));

    if (isANumeric && isBNumeric) {
      return Number(a) - Number(b);
    } else if (isANumeric) {
      return -1;
    } else if (isBNumeric) {
      return 1;
    } else {
      const aSpecial = a.startsWith('_');
      const bSpecial = b.startsWith('_');

      if (aSpecial && bSpecial) {
        return a.localeCompare(b);
      } else if (aSpecial) {
        return -1;
      } else if (bSpecial) {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    }
  });

  // Create a new object with keys in sorted order
  const sortedObj = {} as T;
  sortedKeys.forEach((key) => {
    (sortedObj as Record<string, any>)[key] = obj[key];
  });

  return sortedObj;
};

