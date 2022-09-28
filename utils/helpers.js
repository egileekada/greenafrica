export const extractUniqueDiffrenceById = (array1, array2) => {
  const getDifference = (array1, array2) => {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  };

  const diff = getDifference(array1, array2);

  const uniqueIds = new Set();
  const unique = diff.filter((element) => {
    const isDuplicate = uniqueIds.has(element.id);
    uniqueIds.add(element.id);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });

  return unique && unique?.length > 0 ? unique : [];
};
