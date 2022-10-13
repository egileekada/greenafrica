export const extractUniqueDiffrenceById = (array1, array2) => {
  const getDifference = (array1, array2) => {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  };

  const diff = getDifference(array1, array2);

  // console.log("diff is::", diff);

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

export const _extractUniqueDiffrenceById = (array1, array2, newArr = []) => {
  const getDifference = (array1, array2) => {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  };

  const diff = getDifference(array1, array2);

  // console.log("diff is ", diff);
  // console.log("new Arr", newArr);

  const uniqueIds = new Set();
  const unique = diff.filter((element) => {
    const isDuplicate = uniqueIds.has(element.id);
    uniqueIds.add(element.id);
    if (newArr.includes(element.ssrCode.toLowerCase())) {
      return true;
    }
    if (isDuplicate) {
      return true;
    }
    return false;
  });

  return unique && unique?.length > 0 ? unique : [];
};

export const _extractDiffrenceById = (array1, array2) => {
  const getDifference = (array1, array2) => {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  };

  const diff = getDifference(array1, array2);

  return diff;
};
