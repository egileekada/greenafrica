const arr = [
  {
    passengerNumber: 0,
    ssrCode: "X15",
  },
  {
    passengerNumber: 0,
    ssrCode: "X15",
  },
  {
    passengerNumber: 0,
    ssrCode: "X20",
  },
  {
    passengerNumber: 0,
    ssrCode: "X10",
  },
  {
    passengerNumber: 0,
    ssrCode: "X10",
  },
];

const _p = [];
const typeArr = [];

arr.map((_ar) => {
  let typeCount = 0;
  if (typeArr.includes(_ar.ssrCode)) {
    typeArr.push(_ar.ssrCode);
    typeCount = typeArr.filter((_type) => _type === _ar.ssrCode).length;
  } else {
    typeCount = 1;
    typeArr.push(_ar.ssrCode);
  }

  let newObj = {
    passengerNumber: _ar?.passengerNumber,
    ssrCode: _ar.ssrCode,
    ssrNumber: typeCount,
  };
  _p.push(newObj);
});

console.log("_paylo", _p);
// console.log(" typeArr", typeArr);
