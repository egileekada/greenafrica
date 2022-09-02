const ssrs = [
  { passengerNumber: 0, ssrCode: "X15", schedueIndex: 0 },
  { passengerNumber: 0, ssrCode: "X15", schedueIndex: 0 },
  { passengerNumber: 0, ssrCode: "X15", schedueIndex: 1 },
  { passengerNumber: 0, ssrCode: "X10", schedueIndex: 0 },
  { passengerNumber: 0, ssrCode: "WCHR", schedueIndex: 0 },
  { passengerNumber: 1, ssrCode: "WCHR", schedueIndex: 0 },
];
const RetrunSSRs = [
  { passengerNumber: 0, ssrCode: "X10", schedueIndex: 1 },
  { passengerNumber: 0, ssrCode: "X10", schedueIndex: 1 },
  { passengerNumber: 0, ssrCode: "X10", schedueIndex: 1 },
];

[...ssrs, ...RetrunSSRs].map((_item) => {
  // console.log("_item", _item);
});

// let __FOUND = ssrs.filter(function (ssr) {
//   if (ssr.ssrCode === "WCHR") return true;
// });

// if (__FOUND.length > 0) {
//   __FOUND.map((_item) => {
//     const newObj = {
//       ..._item,
//       schedueIndex: 1,
//     };
//     RetrunSSRs.push(newObj);
//   });
// }

// // const newReturn = [
// //   ...RetrunSSRs,
// //   {
// //     ...ssrs[__FOUND],
// //     schedueIndex: 1,
// //   },
// // ];

// // console.log("return", newReturn);
// console.log("r RetrunSSR", RetrunSSRs);

const _sessionSSRs = [];
const _sessionReturnSSRs = [];

const ALL_SSRS = [..._sessionSSRs, ..._sessionReturnSSRs];

console.log("ALL_SSRS", ALL_SSRS);

[].map((_item) => {
  console.log("ALL_SSRS", ALL_SSRS);
});
