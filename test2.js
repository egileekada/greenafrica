const { CodeFilled } = require("@ant-design/icons");

const cleanedSSRs = ss.filter(
  (_ssr) => {
    console.log("_ssr.ssrCode", _ssr.ssrCode === "X20");
    console.log(
      "parseInt(_ssr.passengerNumber)",
      parseInt(_ssr.passengerNumber) === parseInt(0)
    );
    _ssr.ssrCode === "X20" && parseInt(_ssr.passengerNumber) === parseInt(0);
    console.log(
      "condition",
      _ssr.ssrCode === "X20" && parseInt(_ssr.passengerNumber) === parseInt(0)
    );
    console.log("//////////////");
  }
  // _ssr.ssrCode === "X20" && parseInt(_ssr.passengerNumber) !== parseInt(1) //multiple
  // _ssr.ssrCode === "X20" && parseInt(_ssr.passengerNumber) !== parseInt(0) //single
  // _ssr.ssrCode === "X20" && parseInt(_ssr.passengerNumber) !== parseInt(0) //single
);

// Works for Same CodeFilled,not different code
// const ruleBasis =
//   _ssr.ssrCode === "X20" && parseInt(_ssr.passengerNumber) === parseInt(0);
// console.log("condition", ruleBasis);
// console.log("//////////////");
// return !ruleBasis;

//  Works for Same Code and different code
//  const ruleBasis =
//    _ssr.ssrCode !== "X10" && parseInt(_ssr.passengerNumber) === parseInt(0);
//  console.log("condition", ruleBasis);
//  console.log("//////////////");
//  return ruleBasis;
