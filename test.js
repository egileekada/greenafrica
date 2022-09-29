const _selectedSSRs = [
  {
    id: "16644520919410ABVLOS27",
    passengerNumber: 0,
    ssrCode: "X15",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
  {
    id: "16644520919411ABVLOS28",
    passengerNumber: 0,
    ssrCode: "X20",
    schedueIndex: 0,
    ArrivalStation: "ABV",
    DepartureStation: "LOS",
  },
];

const ids = _selectedSSRs.map((ssr) => ssr?.ssrCode.toLowerCase());
const NEW_SSRS = ["x20", "x15", "x10", "vprd", "wchr", "hprd"];

const newArr = NEW_SSRS.filter((ssr) => {
  return !ids.includes(ssr.toLowerCase());
});

console.log("new SSRS", newArr);
// console.log("new SSRS", ids);

// const _newCheckinSSRs = [
//   {
//     id: "1664444129912013",
//     passengerNumber: 0,
//     ssrCode: "X15",
//     schedueIndex: 0,
//     ArrivalStation: "ABV",
//     DepartureStation: "LOS",
//   },
//   {
//     id: "1664444186171a409ac20-746b-465d-98a3-a3a1f2e7a6ba",
//     passengerNumber: 0,
//     ssrCode: "X20",
//     schedueIndex: 0,
//     ArrivalStation: "ABV",
//     DepartureStation: "LOS",
//   },
//   {
//     id: "1664444186171a409ac20-746b-465d-98a3-a3a1f2e7a6ba",
//     passengerNumber: 0,
//     ssrCode: "X20",
//     schedueIndex: 0,
//     ArrivalStation: "ABV",
//     DepartureStation: "LOS",
//   },
// ];

// const extractUniqueDiffrenceById = (array1, array2) => {
//   const getDifference = (array1, array2) => {
//     return array1.filter((object1) => {
//       return !array2.some((object2) => {
//         return object1.id === object2.id;
//       });
//     });
//   };

//   const diff = getDifference(array1, array2);

//   const uniqueIds = new Set();
//   const unique = diff.filter((element) => {
//     const isDuplicate = uniqueIds.has(element.id);
//     uniqueIds.add(element.id);
//     if (!isDuplicate) {
//       return true;
//     }
//     return false;
//   });

//   return unique && unique?.length > 0 ? unique : [];
// };

// const _unique = extractUniqueDiffrenceById(_newCheckinSSRs, _selectedSSRs);
// console.log("unique", _unique);
