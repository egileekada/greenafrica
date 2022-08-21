const SSRItem = {
  SSRCode: "X20",
  InventoryControlled: true,
  InventoryControlledSpecified: true,
  NonInventoryControlled: false,
  NonInventoryControlledSpecified: true,
  SeatDependent: false,
  SeatDependentSpecified: true,
  NonSeatDependent: true,
  NonSeatDependentSpecified: true,
  Available: 100,
  AvailableSpecified: true,
  PassengerNumberList: [0],
  PaxSSRPriceList: [
    {
      PaxFee: {
        ActionStatusCode: "NN",
        FeeCode: "XBAG20",
        FeeDetail: "",
        FeeNumber: 0,
        FeeNumberSpecified: true,
        FeeType: 6,
        FeeTypeSpecified: true,
        FeeOverride: false,
        FeeOverrideSpecified: true,
        FlightReference: "",
        Note: "",
        SSRCode: "",
        SSRNumber: 0,
        SSRNumberSpecified: true,
        PaymentNumber: 0,
        PaymentNumberSpecified: true,
        ServiceCharges: [
          {
            ChargeType: 6,
            ChargeTypeSpecified: true,
            CollectType: 0,
            CollectTypeSpecified: true,
            ChargeCode: "XBAG20",
            TicketCode: "X20",
            CurrencyCode: "NGN",
            Amount: 5000.0,
            AmountSpecified: true,
            ChargeDetail: "XBAG 20KG",
            ForeignCurrencyCode: "NGN",
            ForeignAmount: 5000.0,
            ForeignAmountSpecified: true,
            State: 0,
            StateSpecified: true,
          },
          {
            ChargeType: 5,
            ChargeTypeSpecified: true,
            CollectType: 0,
            CollectTypeSpecified: true,
            ChargeCode: "NG",
            TicketCode: "NG ",
            CurrencyCode: "NGN",
            Amount: 250.0,
            AmountSpecified: true,
            ChargeDetail: "ABV-LOS",
            ForeignCurrencyCode: "NGN",
            ForeignAmount: 250.0,
            ForeignAmountSpecified: true,
            State: 0,
            StateSpecified: true,
          },
        ],
        CreatedDate: "2022-08-20T16:18:09.4858401Z",
        CreatedDateSpecified: true,
        IsProtected: false,
        IsProtectedSpecified: true,
        FeeApplicationType: 3,
        FeeApplicationTypeSpecified: true,
        State: 0,
        StateSpecified: true,
      },
      PassengerNumberList: [0],
    },
  ],
  SSRLegList: [],
};
const totalFare = SSRItem.PaxSSRPriceList.map((_priceList) => {
  const totalServiceCharge = _priceList.PaxFee.ServiceCharges.reduce(
    (accumulator, object) => {
      return accumulator + object.Amount;
    },
    0
  );
  return totalServiceCharge;
});

console.log("totalFare", totalFare);
