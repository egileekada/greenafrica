import { createSlice } from "@reduxjs/toolkit";
import {
  GetLowFareAvailability,
  GetAvailability,
  BookingSell,
  CancelSSR,
} from "services/bookingService";
import { notification } from "antd";
import { PURGE } from "redux-persist";
import format from "date-fns/format";
import addDays from "date-fns/addDays";

const initialState = {
  creditPnr: null,
  creditGoTrip: null,
  creditReturnTrip: null,
  creditTripParams: null,
  creditReturnParams: null,
  lowFareAvailabilityLoading: false,
  lowFareAvailabilityResponse: null,
  returnFareAvailabilityLoading: false,
  returnFareAvailabilityResponse: null,
  creditFlightAvailabilityLoading: false,
  creditFlightAvailabilityResponse: null,
  resellLoading: false,
  goTrip: null,
  returnTrip: null,
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCreditPnr: (state, { payload }) => {
      state.creditPnr = payload;
    },
    setCreditGoTrip: (state, { payload }) => {
      state.creditGoTrip = payload;
    },
    setCreditReturnTrip: (state, { payload }) => {
      state.creditReturnTrip = payload;
    },
    setTripParams: (state, { payload }) => {
      state.creditTripParams = payload;
    },
    setReturnParams: (state, { payload }) => {
      state.creditReturnParams = payload;
    },
    setLowFareAvailabilityLoading: (state, { payload }) => {
      state.lowFareAvailabilityLoading = payload;
    },
    setLowFareAvailabilityResponse: (state, { payload }) => {
      state.lowFareAvailabilityResponse = payload;
    },
    setReturnFareAvailabilityLoading: (state, { payload }) => {
      state.returnFareAvailabilityLoading = payload;
    },
    setReturnFareAvailabilityResponse: (state, { payload }) => {
      state.returnFareAvailabilityResponse = payload;
    },
    setCreditFlightAvailabilityLoading: (state, { payload }) => {
      state.creditFlightAvailabilityLoading = payload;
    },
    setCreditFlightAvailabilityResponse: (state, { payload }) => {
      state.creditFlightAvailabilityResponse = payload;
    },
    setResellLoading: (state, { payload }) => {
      state.resellLoading = payload;
    },
    setGoTrip: (state, { payload }) => {
      state.goTrip = payload;
    },
    setReturnTrip: (state, { payload }) => {
      state.returnTrip = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setCreditPnr,
  setCreditGoTrip,
  setCreditReturnTrip,
  setTripParams,
  setReturnParams,
  setLowFareAvailabilityLoading,
  setLowFareAvailabilityResponse,
  setReturnFareAvailabilityLoading,
  setReturnFareAvailabilityResponse,
  setCreditFlightAvailabilityLoading,
  setCreditFlightAvailabilityResponse,
  setResellLoading,
  setGoTrip,
  setReturnTrip,
} = creditSlice.actions;

export const creditSelector = (state) => state.credit;
export default creditSlice.reducer;

export const saveCreditTripParams = (payload) => async (dispatch) => {
  dispatch(setTripParams(payload));
};

export const saveCreditReturnParams = (payload) => async (dispatch) => {
  dispatch(setReturnParams(payload));
};

export const fetchLowFareAvailability =
  (payload) => async (dispatch, getState) => {
    const currentState = getState().session;
    dispatch(setLowFareAvailabilityLoading(true));

    const {
      departureStation,
      arrivalStation,
      currentDate,
      taxAmount,
      minimumFarePrice,
    } = payload;

    const requestPayload = {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: true,
      contractVersion: 0,
      AvailabilityRequest: {
        DepartureStation: departureStation,
        ArrivalStation: arrivalStation,
        beginDate: format(new Date(currentDate), "yyyy-MM-dd"),
        beginDateSpecified: true,
        endDate: format(addDays(new Date(currentDate), 180), "yyyy-MM-dd"),
        endDateSpecified: true,
        CarrierCode: "Q9",
        FlightType: 5,
        FlightTypeSpecified: true,
        PaxCount:
          currentState?.bookingResponse?.Booking?.Passengers?.length || 1,
        PaxCountSpecified: true,
        Dow: 10,
        DowSpecified: true,
        CurrencyCode: "NGN",
        DisplayCurrencyCode: "NGN",
        AvailabilityType: 0,
        AvailabilityTypeSpecified: true,
        MaximumConnectingFlights: 0,
        MaximumConnectingFlightsSpecified: true,
        AvailabilityFilter: 0,
        AvailabilityFilterSpecified: true,
        FareClassControl: 0,
        MaximumFarePrice: 0,
        SSRCollectionsMode: 0,
        FareClassControlSpecified: true,
        MinimumFarePriceSpecified: true,
        MaximumFarePriceSpecified: true,
        SSRCollectionsModeSpecified: true,
        InboundOutbound: 0,
        InboundOutboundSpecified: true,
        NightsStay: 0,
        NightsStaySpecified: true,
        IncludeAllotmentsSpecified: true,
        IncludeAllotments: false,
        IncludeTaxesAndFees: true,
        FareRuleFilter: 0,
        LoyaltyFilter: 0,
        IncludeTaxesAndFeesSpecified: true,
        FareRuleFilterSpecified: true,
        LoyaltyFilterSpecified: true,
        ServiceBundleControl: 0,
        BookingStatus: 0,
        ServiceBundleControlSpecified: true,
        BookingStatusSpecified: true,
        MinimumFarePrice: minimumFarePrice,
        taxAmount: taxAmount,
      },
    };

    try {
      const Response = await GetLowFareAvailability(requestPayload);
      await dispatch(setLowFareAvailabilityResponse(Response.data));
    } catch (err) {
      await dispatch(setLowFareAvailabilityResponse([]));
      dispatch(setLowFareAvailabilityLoading(false));

      notification.error({
        message: "Error",
        description: "Fetch Low Fares failed",
      });
    }
    dispatch(setLowFareAvailabilityLoading(false));
  };

export const returnLowFareAvailability =
  (payload) => async (dispatch, getState) => {
    const currentState = getState().session;
    dispatch(setReturnFareAvailabilityLoading(true));

    const {
      departureStation,
      arrivalStation,
      currentDate,
      taxAmount,
      minimumFarePrice,
    } = payload;

    const requestPayload = {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: true,
      contractVersion: 0,
      AvailabilityRequest: {
        DepartureStation: arrivalStation,
        ArrivalStation: departureStation,
        // beginDate: format(currentDate, "yyyy-MM-dd"),
        beginDate: format(new Date(currentDate), "yyyy-MM-dd"),
        beginDateSpecified: true,
        // endDate: format(addDays(currentDate, 180), "yyyy-MM-dd"),
        endDate: format(addDays(new Date(currentDate), 27), "yyyy-MM-dd"),
        endDateSpecified: true,
        CarrierCode: "Q9",
        FlightType: 5,
        FlightTypeSpecified: true,
        PaxCount:
          currentState?.bookingResponse?.Booking?.Passengers?.length || 1,
        PaxCountSpecified: true,
        Dow: 10,
        DowSpecified: true,
        CurrencyCode: "NGN",
        DisplayCurrencyCode: "NGN",
        AvailabilityType: 0,
        AvailabilityTypeSpecified: true,
        MaximumConnectingFlights: 0,
        MaximumConnectingFlightsSpecified: true,
        AvailabilityFilter: 0,
        AvailabilityFilterSpecified: true,
        FareClassControl: 0,
        MinimumFarePrice: minimumFarePrice,
        MaximumFarePrice: 0,
        SSRCollectionsMode: 0,
        FareClassControlSpecified: true,
        MinimumFarePriceSpecified: true,
        MaximumFarePriceSpecified: true,
        SSRCollectionsModeSpecified: true,
        InboundOutbound: 0,
        InboundOutboundSpecified: true,
        NightsStay: 0,
        NightsStaySpecified: true,
        IncludeAllotmentsSpecified: true,
        IncludeAllotments: false,
        IncludeTaxesAndFees: true,
        FareRuleFilter: 0,
        LoyaltyFilter: 0,
        IncludeTaxesAndFeesSpecified: true,
        FareRuleFilterSpecified: true,
        LoyaltyFilterSpecified: true,
        ServiceBundleControl: 0,
        BookingStatus: 0,
        ServiceBundleControlSpecified: true,
        BookingStatusSpecified: true,
        taxAmount: taxAmount,
      },
    };

    try {
      const Response = await GetLowFareAvailability(requestPayload);
      await dispatch(setReturnFareAvailabilityResponse(Response.data));
    } catch (err) {
      await dispatch(setReturnFareAvailabilityResponse([]));
      dispatch(setReturnFareAvailabilityLoading(false));
      notification.error({
        message: "Error",
        description: "Fetch Return Low Fares failed",
      });
    }
    dispatch(setReturnFareAvailabilityLoading(false));
  };

export const fetchFlightAvailability =
  (tripPayload, returnPayload = {}) =>
  async (dispatch, getState) => {
    const currentState = getState().session;
    dispatch(setCreditFlightAvailabilityLoading(true));

    const {
      departureStation,
      arrivalStation,
      beginDate,
      endDate,
      isRoundTrip,
      totalPaxCount,
      minimumFarePrice,
      taxAmount,
    } = tripPayload;

    const availabilityRequest = [];

    if (isRoundTrip) {
      let _departureRequest = {
        departureStation: departureStation,
        arrivalStation: arrivalStation,
        beginDate: beginDate,
        beginDateSpecified: true,
        endDate: endDate,
        endDateSpecified: true,
        carrierCode: "Q9",
        flightNumber: "",
        flightType: 5,
        flightTypeSpecified: true,
        paxCount: totalPaxCount,
        paxCountSpecified: true,
        dow: 10,
        dowSpecified: true,
        currencyCode: "NGN",
        displayCurrencyCode: "NGN",
        discountCode: "",
        promotionCode: "",
        availabilityType: 0,
        availabilityTypeSpecified: true,
        sourceOrganization: "",
        maximumConnectingFlights: 0,
        maximumConnectingFlightsSpecified: true,
        availabilityFilter: 0,
        availabilityFilterSpecified: true,
        fareClassControl: 1,
        fareClassControlSpecified: true,
        minimumFarePrice: parseInt(minimumFarePrice),
        minimumFarePriceSpecified: true,
        maximumFarePrice: 0,
        maximumFarePriceSpecified: true,
        productClassCode: "",
        ssrCollectionsMode: 0,
        inboundOutbound: 0,
        nightsStay: 0,
        includeAllotments: true,
        includeTaxesAndFees: true,
        includeTaxesAndFeesSpecified: true,
        paxResidentCountry: "",
        baggagePricingSystemCode: "",
        taxAmount: parseInt(taxAmount),
      };
      let _returnRequest = {
        departureStation: returnPayload?.departureStation,
        arrivalStation: returnPayload?.arrivalStation,
        beginDate: returnPayload?.returnDate,
        beginDateSpecified: true,
        endDate: returnPayload?.returnDate,
        endDateSpecified: true,
        carrierCode: "Q9",
        flightNumber: "",
        flightType: 5,
        flightTypeSpecified: true,
        paxCount: returnPayload?.totalPaxCount,
        paxCountSpecified: true,
        dow: 10,
        dowSpecified: true,
        currencyCode: "NGN",
        displayCurrencyCode: "NGN",
        discountCode: "",
        promotionCode: "",
        availabilityType: 0,
        availabilityTypeSpecified: true,
        sourceOrganization: "",
        maximumConnectingFlights: 0,
        maximumConnectingFlightsSpecified: true,
        availabilityFilter: 0,
        availabilityFilterSpecified: true,
        fareClassControl: 1,
        fareClassControlSpecified: true,
        minimumFarePrice: parseInt(returnPayload?.minimumFarePrice),
        minimumFarePriceSpecified: true,
        maximumFarePrice: 0,
        maximumFarePriceSpecified: true,
        productClassCode: "",
        ssrCollectionsMode: 0,
        inboundOutbound: 0,
        nightsStay: 0,
        includeAllotments: true,
        includeTaxesAndFees: true,
        includeTaxesAndFeesSpecified: true,
        paxResidentCountry: "",
        baggagePricingSystemCode: "",
        taxAmount: parseInt(returnPayload?.taxAmount),
      };
      availabilityRequest.push(_departureRequest);
      availabilityRequest.push(_returnRequest);
    } else {
      let _singleAvailabilityRequest = {
        departureStation: departureStation,
        arrivalStation: arrivalStation,
        beginDate: beginDate,
        beginDateSpecified: true,
        endDate: endDate,
        endDateSpecified: true,
        carrierCode: "Q9",
        flightNumber: "",
        flightType: 5,
        flightTypeSpecified: true,
        paxCount: totalPaxCount,
        paxCountSpecified: true,
        dow: 10,
        dowSpecified: true,
        currencyCode: "NGN",
        displayCurrencyCode: "NGN",
        discountCode: "",
        promotionCode: "",
        availabilityType: 0,
        availabilityTypeSpecified: true,
        sourceOrganization: "",
        maximumConnectingFlights: 0,
        maximumConnectingFlightsSpecified: true,
        availabilityFilter: 0,
        availabilityFilterSpecified: true,
        fareClassControl: 1,
        fareClassControlSpecified: true,
        minimumFarePrice: parseInt(minimumFarePrice),
        minimumFarePriceSpecified: true,
        maximumFarePrice: 0,
        maximumFarePriceSpecified: true,
        productClassCode: "",
        ssrCollectionsMode: 0,
        inboundOutbound: 0,
        nightsStay: 0,
        includeAllotments: true,
        includeTaxesAndFees: true,
        includeTaxesAndFeesSpecified: true,
        paxResidentCountry: "",
        baggagePricingSystemCode: "",
        taxAmount: parseInt(taxAmount),
      };
      availabilityRequest.push(_singleAvailabilityRequest);
    }

    const requestPayload = {
      header: {
        signature: currentState.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: false,
        contractVersion: 0,
      },
      getAvailabilityRequest: {
        tripAvailabilityRequest: {
          availabilityRequests: [...availabilityRequest],
        },
      },
    };

    try {
      const flightAvalaibilty = await GetAvailability(requestPayload);
      const availabilityResponse = flightAvalaibilty.data;
      await dispatch(
        setCreditFlightAvailabilityResponse(
          availabilityResponse?.GetTripAvailabilityResponse
        )
      );
    } catch (err) {
      // notification.error({
      //   message: "Error",
      //   description: "Fetch Flights rt failed",
      // });
      console.log("er", err.response);
    }
    dispatch(setCreditFlightAvailabilityLoading(false));
  };

export const ResellNewJourney = () => async (dispatch, getState) => {
  dispatch(setResellLoading(true));
  const currentSession = getState().session;
  const currentBooking = getState().booking;

  const paxPriceTypes = [];
  const _serviceBundleList = [];

  const ADULT_COUNT =
    currentSession?.bookingResponse?.Booking?.Passengers.filter((_pax) => {
      return _pax?.PassengerTypeInfo?.PaxType.toLowerCase() === "adt";
    }).length;

  const CHILD_COUNT =
    currentSession?.bookingResponse?.Booking?.Passengers.filter((_pax) => {
      return _pax?.PassengerTypeInfo?.PaxType.toLowerCase() === "chd";
    }).length;

  const totalPaxCount =
    currentSession?.bookingResponse?.Booking?.Passengers?.length;

  if (ADULT_COUNT > 0) {
    const _newPType = {
      paxType: "ADT",
      paxDiscountCode: "",
      paxCount: ADULT_COUNT,
      paxCountSpecified: true,
    };
    paxPriceTypes.push(_newPType);
  }

  if (CHILD_COUNT > 0) {
    const _newPType = {
      paxType: "CHD",
      paxDiscountCode: "",
      paxCount: CHILD_COUNT,
      paxCountSpecified: true,
    };
    paxPriceTypes.push(_newPType);
  }

  const _journeySellKeys = [];
  // SSR RELATED
  let JourneyOneSegmentSSRRequest = null;
  let JourneyTwoSegmentSSRRequest = null;
  let JourneyOne = null;
  let JourneyTwo = null;
  // SSR RELATED

  if (currentBooking?.goTrip) {
    let newObj = {
      JourneySellKey: currentBooking?.goTrip?.journey?.JourneySellKey,
      FareSellKey: currentBooking?.goTrip?.fare?.FareSellKey,
      standbyPriorityCode: "",
      packageIndicator: "",
    };
    _journeySellKeys.push(newObj);
    _serviceBundleList.push(currentBooking?.goTrip?.fare?.RuleNumber);

    const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

    const JourneyOneSSRsExSeat =
      currentSession?.bookingResponse?.Booking?.Journeys[0].Segments[0].PaxSSRs.filter(
        (ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode)
      );

    JourneyOneSegmentSSRRequest = {
      flightDesignator: {
        carrierCode:
          currentBooking?.goTrip?.segment?.FlightDesignator?.CarrierCode,
        flightNumber:
          currentBooking?.goTrip?.segment?.FlightDesignator?.FlightNumber,
        opSuffix: "",
      },
      std: currentBooking?.goTrip?.segment?.STD,
      stdSpecified: true,
      departureStation: currentBooking?.goTrip?.segment?.DepartureStation,
      arrivalStation: currentBooking?.goTrip?.segment?.ArrivalStation,
      paxSSRs: [...JourneyOneSSRsExSeat],
    };
    JourneyOne = {
      ...currentSession?.bookingResponse?.Booking?.Journeys[0],
      State: 0,
    };
  }

  if (currentBooking?.returnTrip) {
    let newObj = {
      JourneySellKey: currentBooking?.returnTrip?.journey?.JourneySellKey,
      FareSellKey: currentBooking?.returnTrip?.fare?.FareSellKey,
      standbyPriorityCode: "",
      packageIndicator: "",
    };
    _journeySellKeys.push(newObj);
    _serviceBundleList.push(currentBooking?.returnTrip?.fare?.RuleNumber);

    const JourneyTwoSSRsExSeat =
      currentSession?.bookingResponse?.Booking?.Journeys[1].Segments[0].PaxSSRs;

    JourneyTwoSegmentSSRRequest = {
      flightDesignator: {
        carrierCode:
          currentBooking?.returnTrip?.segment?.FlightDesignator?.CarrierCode,
        flightNumber:
          currentBooking?.returnTrip?.segment?.FlightDesignator?.FlightNumber,
        opSuffix: "",
      },
      std: currentBooking?.returnTrip?.segment?.STD,
      stdSpecified: true,
      departureStation: currentBooking?.returnTrip?.segment?.DepartureStation,
      arrivalStation: currentBooking?.returnTrip?.segment?.ArrivalStation,
      paxSSRs: [
        ...JourneyTwoSSRsExSeat.filter((ssrItem) =>
          ALLOWED__SSRS.includes(ssrItem?.SSRCode)
        ),
      ],
    };

    JourneyTwo = {
      ...currentSession?.bookingResponse?.Booking?.Journeys[1],
      State: 0,
    };
  }

  const requestPayload = {
    header: {
      signature: currentSession.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
    sellRequestDto: {
      sellRequest: {
        sellRequestData: {
          sellBy: 0,
          sellBySpecified: true,
          sellJourneyByKeyRequest: {
            sellJourneyByKeyRequestData: {
              actionStatusCode: "NN",
              journeySellKeys: [..._journeySellKeys],
              paxPriceType: [...paxPriceTypes],
              currencyCode: "NGN",
              paxCount: totalPaxCount,
              paxCountSpecified: true,
              loyaltyFilter: 0,
              loyaltyFilterSpecified: true,
              isAllotmentMarketFare: false,
              isAllotmentMarketFareSpecified: true,
              preventOverLap: false,
              preventOverLapSpecified: true,
              replaceAllPassengersOnUpdate: false,
              replaceAllPassengersOnUpdateSpecified: true,
              serviceBundleList: [..._serviceBundleList],
              applyServiceBundle: 1,
              applyServiceBundleSpecified: true,
            },
          },
        },
      },
    },
  };

  try {
    await BookingSell(requestPayload);
    try {
      const segmentSSRRequests = [];

      JourneyOneSegmentSSRRequest &&
        segmentSSRRequests.push(JourneyOneSegmentSSRRequest);
      JourneyTwoSegmentSSRRequest &&
        segmentSSRRequests.push(JourneyTwoSegmentSSRRequest);
      const sellSSRRequest = {
        header: {
          signature: currentSession.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: false,
          contractVersion: 0,
        },
        sellRequestDto: {
          sellRequest: {
            sellRequestData: {
              sellBy: 2,
              sellBySpecified: true,
              sellSSR: {
                ssrRequest: {
                  segmentSSRRequests: [...segmentSSRRequests],
                  currencyCode: "NGN",
                  cancelFirstSSR: true,
                  cancelFirstSSRSpecified: true,
                  ssrFeeForceWaiveOnSell: false,
                  ssrFeeForceWaiveOnSellSpecified: true,
                  sellSSRMode: 0,
                  sellSSRModeSpecified: true,
                  feePricingMode: 0,
                  feePricingModeSpecified: true,
                },
              },
            },
          },
        },
      };
      await BookingSell(sellSSRRequest);
      const _journeys = [];

      JourneyOne && _journeys.push(JourneyOne);
      JourneyTwo && _journeys.push(JourneyTwo);
      const cancelSSRRequest = {
        signature: currentSession.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: true,
        contractVersion: 0,
        cancelRequestData: {
          cancelBy: 0,
          cancelBySpecified: true,
          cancelJourney: {
            cancelJourneyRequest: {
              journeys: [..._journeys],
              waivePenaltyFee: false,
              waivePenaltyFeeSpecified: true,
              waiveSpoilageFee: false,
              waiveSpoilageFeeSpecified: true,
              preventReprice: false,
              preventRepriceSpecified: true,
              forceRefareForItineraryIntegrity: false,
              forceRefareForItineraryIntegritySpecified: true,
              recordLocator:
                currentSession?.bookingResponse?.Booking?.RecordLocator,
            },
          },
        },
      };
      try {
        await CancelSSR(cancelSSRRequest);
        dispatch(setGoTrip(null));
        dispatch(setReturnTrip(null));
        window.location.assign(`/bookings/confirm`);
      } catch (err) {
        notification.error({
          message: "Error",
          description: "Cancel Sell Services failed",
        });
      }
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Sell Services failed",
      });
    }
  } catch (err) {
    const errText =
      err?.response?.data?.BookingUpdateResponseData?.Error?.ErrorText;
    notification.error({
      message: "Error",
      description: errText ? errText : "Sell Request failed",
    });
  }

  dispatch(setResellLoading(false));
};
