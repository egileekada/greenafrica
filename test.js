const value = 2;

const ss = [
  { passengerNumber: 1, ssrCode: "X10" },
  { passengerNumber: 1, ssrCode: "X10" },
];

const cleanedSSRs = ss.filter((_ssr) => {
  const ruleBasis =
    _ssr.ssrCode === "X15" && parseInt(_ssr.passengerNumber) === parseInt(1);
  return !ruleBasis;
});

const SSRItemObj = new Array(value).fill({
  passengerNumber: 1,
  ssrCode: "X15",
});

const newSS = [...cleanedSSRs, ...SSRItemObj];

console.log("new SSRs", newSS);


  // const ruleBasis =
  //   _ssr.ssrCode !== SSRItem?.SSRCode &&
  //   parseInt(_ssr.passengerNumber) === parseInt(passenger?.id);
