const _selectedSSRs = [
  {
    id: "1664362966180d1f0be62-05e5-43e1-bbff-089aca92b1a0",
    passengerNumber: 0,
    ssrCode: "X10",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "1664362966180477c8e91-082d-45ea-b140-be33ce5333af",
    passengerNumber: 0,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "16643629661808b81b2c0-fc76-448a-b99d-312ad2c85ef9",
    passengerNumber: 0,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "1664362966180c68860cd-db3a-4a64-9f3c-6581703a4bdf",
    passengerNumber: 1,
    ssrCode: "X10",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436296618041c5e2c6-94bd-4401-a07b-912db20e0fe0",
    passengerNumber: 1,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "1664362966180fbb4a206-7cb2-409c-a609-6e677bbc66bb",
    passengerNumber: 1,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "1664362966180c674090f-2d5c-4313-bd66-801dec50c52a",
    passengerNumber: 1,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
];

const _newCheckinSSRs = [
  {
    id: "16643629661808b81b2c0-fc76-448a-b99d-312ad2c85ef9",
    passengerNumber: 0,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "1664362966180fbb4a206-7cb2-409c-a609-6e677bbc66bb",
    passengerNumber: 1,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "1664362966180c674090f-2d5c-4313-bd66-801dec50c52a",
    passengerNumber: 1,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436297224597df842b-4fa2-464d-b9f2-9cbcae276322",
    passengerNumber: 0,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436297224597df842b-4fa2-464d-b9f2-9cbcae276322",
    passengerNumber: 0,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436297841345ddf917-f402-48ce-b80f-979f70a0069d",
    passengerNumber: 0,
    ssrCode: "X10",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436297841345ddf917-f402-48ce-b80f-979f70a0069d",
    passengerNumber: 0,
    ssrCode: "X10",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436300065855e27397-1ec6-41e9-8f20-3fe4b94f972b",
    passengerNumber: 1,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436300065855e27397-1ec6-41e9-8f20-3fe4b94f972b",
    passengerNumber: 1,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436300261439a121a3-572f-4ccb-b6ba-be73784c1295",
    passengerNumber: 1,
    ssrCode: "X10",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "166436300261439a121a3-572f-4ccb-b6ba-be73784c1295",
    passengerNumber: 1,
    ssrCode: "X10",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
];

const extractUniqueDiffrenceById = (array1, array2) => {
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

const _unique = extractUniqueDiffrenceById(_newCheckinSSRs, _selectedSSRs);
console.log("unique", _unique);
