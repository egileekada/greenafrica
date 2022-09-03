const PaxSSRs = [
  // {
  //   ActionStatusCode: "HK",
  //   ArrivalStation: "LOS",
  //   DepartureStation: "ABV",
  //   PassengerNumber: 0,
  //   PassengerNumberSpecified: true,
  //   SSRCode: "X10",
  //   SSRNumber: 1,
  //   SSRNumberSpecified: true,
  //   SSRDetail: "",
  //   FeeCode: "XBAG10",
  //   Note: "",
  //   SSRValue: 1,
  //   SSRValueSpecified: true,
  //   IsInServiceBundle: false,
  //   IsInServiceBundleSpecified: true,
  //   State: 1,
  //   StateSpecified: true,
  // },
  // {
  //   ActionStatusCode: "HK",
  //   ArrivalStation: "LOS",
  //   DepartureStation: "ABV",
  //   PassengerNumber: 0,
  //   PassengerNumberSpecified: true,
  //   SSRCode: "X15",
  //   SSRNumber: 1,
  //   SSRNumberSpecified: true,
  //   SSRDetail: "",
  //   FeeCode: "XBAG15",
  //   Note: "",
  //   SSRValue: 1,
  //   SSRValueSpecified: true,
  //   IsInServiceBundle: false,
  //   IsInServiceBundleSpecified: true,
  //   State: 1,
  //   StateSpecified: true,
  // },
  {
    ActionStatusCode: "HK",
    ArrivalStation: "LOS",
    DepartureStation: "ABV",
    PassengerNumber: 0,
    PassengerNumberSpecified: true,
    SSRCode: "X15",
    SSRNumber: 2,
    SSRNumberSpecified: true,
    SSRDetail: "",
    FeeCode: "XBAG15",
    Note: "",
    SSRValue: 1,
    SSRValueSpecified: true,
    IsInServiceBundle: false,
    IsInServiceBundleSpecified: true,
    State: 1,
    StateSpecified: true,
  },
  {
    ActionStatusCode: "HK",
    ArrivalStation: "LOS",
    DepartureStation: "ABV",
    PassengerNumber: 0,
    PassengerNumberSpecified: true,
    SSRCode: "X20",
    SSRNumber: 1,
    SSRNumberSpecified: true,
    SSRDetail: "",
    FeeCode: "XBAG20",
    Note: "",
    SSRValue: 1,
    SSRValueSpecified: true,
    IsInServiceBundle: false,
    IsInServiceBundleSpecified: true,
    State: 1,
    StateSpecified: true,
  },
  {
    ActionStatusCode: "HK",
    ArrivalStation: "LOS",
    DepartureStation: "ABV",
    PassengerNumber: 0,
    PassengerNumberSpecified: true,
    SSRCode: "X20",
    SSRNumber: 2,
    SSRNumberSpecified: true,
    SSRDetail: "",
    FeeCode: "XBAG20",
    Note: "",
    SSRValue: 1,
    SSRValueSpecified: true,
    IsInServiceBundle: false,
    IsInServiceBundleSpecified: true,
    State: 1,
    StateSpecified: true,
  },
];

const _SSRsCount = {
  XBAG10: null,
  XBAG15: null,
  XBAG20: null,
};

PaxSSRs?.map((_segSSR) => {
  _SSRsCount[_segSSR?.FeeCode] = PaxSSRs.filter((_segCode) => {
    return _segSSR?.FeeCode === _segCode?.FeeCode;
  }).length;
});

console.log("_SSRsCount", _SSRsCount);
