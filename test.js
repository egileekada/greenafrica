let paxSSRs = [];

new Array(2).fill(0).map((i, index) => {
  let paxObj = {
    state: 0,
    stateSpecified: true,
    actionStatusCode: "NN",
    arrivalStation: "LOS",
    departureStation: "BAV",
    passengerNumber: index,
    passengerNumberSpecified: true,
    ssrCode: "INFT",
    ssrNumberSpecified: true,
    ssrNumber: 0,
    ssrDetail: "",
    feeCode: "",
    note: "",
    ssrValue: 0,
    ssrValueSpecified: true,
    isInServiceBundle: false,
    isInServiceBundleSpecified: true,
  };
  paxSSRs.push(paxObj);
});

console.log("PaxSSRs", paxSSRs);
