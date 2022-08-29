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
    passengerNumber: 1,
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
  {
    passengerNumber: 1,
    ssrCode: "X10",
  },
  {
    passengerNumber: 1,
    ssrCode: "X10",
  },
];

const _p = [];
const typeArr = [];

arr.map((_ar) => {
  let typeCount = 0;
  let _id = _ar.ssrCode + _ar.passengerNumber;
  if (typeArr.includes(_id)) {
    typeArr.push(_id);
    typeCount = typeArr.filter((_type) => _type === _id).length;
  } else {
    typeCount = 1;
    typeArr.push(_id);
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
