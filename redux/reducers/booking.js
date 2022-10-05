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
import { GetSSRAvailabilityForBooking } from "services/bookingService";

const initialState = {
  manageBookingPnr: null,
  testBooking: "tee",
  tripParams: null,
  returnParams: null,
  lowFareAvailabilityLoading: false,
  lowFareAvailabilityResponse: null,
  returnFareAvailabilityLoading: false,
  returnFareAvailabilityResponse: null,
  manageFlightAvailabilityLoading: false,
  manageFlightAvailabilityResponse: null,
  resellLoading: false,
  goTrip: null,
  returnTrip: null,
  tripModified: false,

  cancelBookingSSRLoading: false,
  cancelBookingSSRResponse: null,

  SSRAvailabilityLoading: false,
  SSRAvailabilityResponse: null,

  bookingSessionSSRs: [],
  bookingSessionReturnSSRs: [],

  newBookingSSRs: [],
  newBookingReturnSSRs: [],

  ResellSSRLoading: false,
  ResellSSRResponse: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setManageBookingPnr: (state, { payload }) => {
      state.manageBookingPnr = payload;
    },
    setTripParams: (state, { payload }) => {
      state.tripParams = payload;
    },
    setReturnParams: (state, { payload }) => {
      state.returnParams = payload;
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
    setManageFlightAvailabilityLoading: (state, { payload }) => {
      state.manageFlightAvailabilityLoading = payload;
    },
    setManageFlightAvailabilityResponse: (state, { payload }) => {
      state.manageFlightAvailabilityResponse = payload;
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
    setTripModified: (state, { payload }) => {
      state.tripModified = payload;
    },

    setCancelBookingSSRLoading: (state, { payload }) => {
      state.cancelBookingSSRLoading = payload;
    },
    setCancelBokingSSRResponse: (state, { payload }) => {
      state.cancelBookingSSRResponse = payload;
    },

    setSSRAvailabilityLoading: (state, { payload }) => {
      state.SSRAvailabilityLoading = payload;
    },
    setSSRAvailabilityResponse: (state, { payload }) => {
      state.SSRAvailabilityResponse = payload;
    },
    setBookingSessionSSRs: (state, { payload }) => {
      state.bookingSessionSSRs = payload;
    },
    setBookingSessionReturnSSRs: (state, { payload }) => {
      state.bookingSessionReturnSSRs = payload;
    },

    setNewBookingSSRs: (state, { payload }) => {
      state.newBookingSSRs = payload;
    },
    setNewBookingReturnSSRs: (state, { payload }) => {
      state.newBookingReturnSSRs = payload;
    },

    setResellSSRLoading: (state, { payload }) => {
      state.ResellSSRLoading = payload;
    },
    setResellSSRResponse: (state, { payload }) => {
      state.ResellSSRResponse = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setManageBookingPnr,
  setTripParams,
  setReturnParams,
  setLowFareAvailabilityLoading,
  setLowFareAvailabilityResponse,
  setReturnFareAvailabilityLoading,
  setReturnFareAvailabilityResponse,
  setManageFlightAvailabilityLoading,
  setManageFlightAvailabilityResponse,
  setResellLoading,
  setGoTrip,
  setReturnTrip,
  setTripModified,

  setSSRAvailabilityLoading,
  setSSRAvailabilityResponse,
  setBookingSessionSSRs,
  setBookingSessionReturnSSRs,

  setNewBookingSSRs,
  setNewBookingReturnSSRs,

  setResellSSRLoading,
  setResellSSRResponse,

  setCancelBookingSSRLoading,
  setCancelBokingSSRResponse,
} = bookingSlice.actions;

export const bookingSelector = (state) => state.booking;
export default bookingSlice.reducer;

export const saveTripParams = (payload) => async (dispatch) => {
  dispatch(setTripParams(payload));
};

export const saveReturnParams = (payload) => async (dispatch) => {
  dispatch(setReturnParams(payload));
};

export const _fetchLowFareAvailability =
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
      lowFareTripAvailabilityRequest: {
        bypassCache: false,
        bypassCacheSpecified: true,
        includeTaxesAndFees: true,
        includeTaxesAndFeesSpecified: true,
        groupBydate: false,
        groupBydateSpecified: true,
        parameterSetID: 0,
        parameterSetIDSpecified: true,
        currencyCode: "NGN",
        lowFareAvailabilityRequestList: [
          {
            departureStationList: [departureStation],
            arrivalStationList: [arrivalStation],
            beginDate: format(new Date(currentDate), "yyyy-MM-dd"),
            beginDateSpecified: true,
            endDate: format(addDays(new Date(currentDate), 27), "yyyy-MM-dd"),
            endDateSpecified: true,
          },
        ],
        productClassList: [],
        loyaltyFilter: 0,
        loyaltyFilterSpecified: true,
        flightFilter: 0,
        flightFilterSpecified: true,
        getAllDetails: false,
        getAllDetailsSpecified: true,
        paxCount: 1,
        paxCountSpecified: true,
        paxPriceTypeList: [
          {
            paxType: "ADT",
            paxCount: 1,
            paxCountSpecified: true,
          },
        ],
        maximumConnectingFlights: 20,
        maximumConnectingFlightsSpecified: true,
        // minimumFarePrice: parseInt(minimumFarePrice),
        // taxAmount: parseInt(taxAmount),
        totalAmount: parseInt(minimumFarePrice),
        totalTaxAmount: parseInt(taxAmount),
      },
    };

    try {
      const Response = await GetLowFareAvailability(requestPayload);
      await dispatch(setLowFareAvailabilityResponse(Response.data));
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Fetch Low Fares failed",
      });
    }
    dispatch(setLowFareAvailabilityLoading(false));
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
        beginDate: format(currentDate, "yyyy-MM-dd"),
        beginDateSpecified: true,
        endDate: format(addDays(currentDate, 180), "yyyy-MM-dd"),
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
      notification.error({
        message: "Error",
        description: "Fetch Low Fares failed",
      });
    }
    dispatch(setLowFareAvailabilityLoading(false));
  };

export const _returnLowFareAvailability =
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
      lowFareTripAvailabilityRequest: {
        bypassCache: false,
        bypassCacheSpecified: true,
        includeTaxesAndFees: true,
        includeTaxesAndFeesSpecified: true,
        groupBydate: false,
        groupBydateSpecified: true,
        parameterSetID: 0,
        parameterSetIDSpecified: true,
        currencyCode: "NGN",
        lowFareAvailabilityRequestList: [
          {
            departureStationList: [arrivalStation],
            arrivalStationList: [departureStation],
            beginDate: format(new Date(currentDate), "yyyy-MM-dd"),
            beginDateSpecified: true,
            endDate: format(addDays(new Date(currentDate), 27), "yyyy-MM-dd"),
            endDateSpecified: true,
          },
        ],
        productClassList: [],
        loyaltyFilter: 0,
        loyaltyFilterSpecified: true,
        flightFilter: 0,
        flightFilterSpecified: true,
        getAllDetails: false,
        getAllDetailsSpecified: true,
        paxCount: 1,
        paxCountSpecified: true,
        paxPriceTypeList: [
          {
            paxType: "ADT",
            paxCount: 1,
            paxCountSpecified: true,
          },
        ],
        maximumConnectingFlights: 20,
        maximumConnectingFlightsSpecified: true,
        // minimumFarePrice: parseInt(minimumFarePrice),
        // taxAmount: parseInt(taxAmount),
        totalAmount: parseInt(minimumFarePrice),
        totalTaxAmount: parseInt(taxAmount),
      },
    };

    try {
      const Response = await GetLowFareAvailability(requestPayload);
      await dispatch(setReturnFareAvailabilityResponse(Response.data));
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Fetch Return Low Fares failed",
      });
    }
    dispatch(setReturnFareAvailabilityLoading(false));
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
    dispatch(setManageFlightAvailabilityLoading(true));

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
      // const flightAvalaibilty = await GetAvailabilityRequest(requestPayload);
      const availabilityResponse = flightAvalaibilty.data;
      await dispatch(
        setManageFlightAvailabilityResponse(
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
    dispatch(setManageFlightAvailabilityLoading(false));
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

export const FetchSSRAvailability = () => async (dispatch, getState) => {
  dispatch(setSSRAvailabilityLoading(true));

  const currentSession = getState().session;
  const _bookingResponse = currentSession?.bookingResponse;
  let _segmentKeyList = [];

  if (_bookingResponse) {
    const JOURNEYS = _bookingResponse?.Booking?.Journeys;

    if (JOURNEYS && JOURNEYS?.length > 0) {
      JOURNEYS.map((_sessionJourney) => {
        let newObj = {
          carrierCode:
            _sessionJourney?.Segments[0]?.FlightDesignator?.CarrierCode,
          flightNumber:
            _sessionJourney?.Segments[0]?.FlightDesignator?.FlightNumber,
          opSuffix: "",
          departureDate: _sessionJourney?.Segments[0]?.STD,
          departureDateSpecified: true,
          arrivalStation: _sessionJourney?.Segments[0]?.ArrivalStation,
          departureStation: _sessionJourney?.Segments[0]?.DepartureStation,
        };

        _segmentKeyList.push(newObj);
      });
      let requestPayload = {
        header: {
          signature: currentSession?.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: true,
          contractVersion: 0,
        },
        getSsrAvailabilityForBookingRequestDto: {
          getSsrAvailabilityForBookingRequest: {
            ssrAvailabilityForBookingRequest: {
              segmentKeyList: [..._segmentKeyList],
              PassengerNumberList: [0],
              inventoryControlled: true,
              inventoryControlledSpecified: true,
              nonInventoryControlled: true,
              nonInventoryControlledSpecified: true,
              seatDependent: true,
              seatDependentSpecified: true,
              nonSeatDependent: true,
              nonSeatDependentSpecified: true,
              currencyCode: "NGN",
              ssrAvailabilityMode: 0,
              ssrAvailabilityModeSpecified: true,
              feePricingMode: 0,
              feePricingModeSpecified: true,
            },
          },
        },
      };
      try {
        const SSRAvailabilityResponse = await GetSSRAvailabilityForBooking(
          requestPayload
        );
        await dispatch(
          setSSRAvailabilityResponse(SSRAvailabilityResponse.data)
        );
      } catch (err) {
        // notification.error({
        //   message: "Error",
        //   description: "Fetch SSR Failed",
        // });
      }
    }
  } else {
    notification.error({
      message: "Error",
      description:
        "Fetch Additional Services Failed,Please go back and fill-in relevant details",
    });
  }

  dispatch(setSSRAvailabilityLoading(false));
};

export const ReSellSSROption =
  (payload, returnPayload = []) =>
  async (dispatch, getState) => {
    dispatch(setResellSSRLoading(true));
    dispatch(setBookingSessionSSRs(payload));
    dispatch(setBookingSessionReturnSSRs(returnPayload));
    const currentSession = getState().session;
    const segmentSSRRequests = [];
    const _bookingResponse = currentSession?.bookingResponse;

    let JourneyOneSSRs = [];
    let JourneyTwoSSRs = [];

    payload.length > 0
      ? payload.map((_ssr) => {
          let newObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            departureStation: _ssr?.DepartureStation,
            arrivalStation: _ssr?.ArrivalStation,
            passengerNumber: _ssr?.passengerNumber,
            passengerNumberSpecified: true,
            ssrCode: _ssr?.ssrCode,
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
          JourneyOneSSRs.push(newObj);
        })
      : null;

    returnPayload.length > 0
      ? returnPayload.map((_ssr) => {
          let newObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            departureStation: _ssr?.DepartureStation,
            arrivalStation: _ssr?.ArrivalStation,
            passengerNumber: _ssr?.passengerNumber,
            passengerNumberSpecified: true,
            ssrCode: _ssr?.ssrCode,
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
          JourneyTwoSSRs.push(newObj);
        })
      : null;

    if (_bookingResponse) {
      const JOURNEYS = _bookingResponse?.Booking?.Journeys;
      JOURNEYS.map((_journey, _index) => {
        let _segment = {
          flightDesignator: {
            carrierCode: _journey?.Segments[0].FlightDesignator?.CarrierCode,
            flightNumber: _journey?.Segments[0].FlightDesignator?.FlightNumber,
            opSuffix: "",
          },
          std: _journey?.Segments[0]?.STD,
          stdSpecified: true,
          departureStation: _journey?.Segments[0]?.DepartureStation,
          arrivalStation: _journey?.Segments[0]?.ArrivalStation,
          paxSSRs: _index === 0 ? [...JourneyOneSSRs] : [...JourneyTwoSSRs],
        };
        segmentSSRRequests.push(_segment);
      });
    }

    try {
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
      window.location.assign(`/bookings/confirm`);
      // console.log("ssr sell success");
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Sell Services failed",
      });
    }

    dispatch(setResellSSRLoading(false));
  };

export const CancelSSRs = () => async (dispatch, getState) => {
  dispatch(setCancelBookingSSRLoading(true));
  const currentSession = getState().session;
  const _segmentKeyList = [];
  const _bookingResponse = currentSession?.bookingResponse;
  const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

  if (_bookingResponse && currentSession?.signature) {
    const JOURNEYS = _bookingResponse?.Booking?.Journeys;
    JOURNEYS.map((_journey, _index) => {
      let newObj = {
        flightDesignator: {
          carrierCode: _journey?.Segments[0]?.FlightDesignator?.CarrierCode,
          flightNumber: _journey?.Segments[0]?.FlightDesignator?.FlightNumber,
          opSuffix: "",
        },
        std: _journey?.Segments[0]?.STD,
        stdSpecified: true,
        arrivalStation: _journey?.Segments[0]?.ArrivalStation,
        departureStation: _journey?.Segments[0]?.DepartureStation,
        paxSSRs: [
          ..._journey?.Segments[0]?.PaxSSRs.filter((ssrItem) =>
            ALLOWED__SSRS.includes(ssrItem?.SSRCode)
          ),
        ],
      };

      _segmentKeyList.push(newObj);
    });

    try {
      const cancelSSRRequest = {
        signature: currentSession.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: true,
        contractVersion: 0,
        cancelRequestData: {
          cancelBy: 2,
          cancelBySpecified: true,
          cancelSSR: {
            SSRRequest: {
              segmentSSRRequests: [..._segmentKeyList],
              currencyCode: "NGN",
              cancelFirstSSR: false,
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
      };
      await CancelSSR(cancelSSRRequest);
    } catch (err) {
      // notification.error({
      //   message: "Error",
      //   description: "Cancel Services failed",
      // });
    }
  }

  dispatch(setCancelBookingSSRLoading(false));
};
