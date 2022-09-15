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
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
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
} = bookingSlice.actions;
export const bookingSelector = (state) => state.booking;
export default bookingSlice.reducer;

export const saveTripParams = (payload) => async (dispatch) => {
  dispatch(setTripParams(payload));
};

export const saveReturnParams = (payload) => async (dispatch) => {
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

    const JourneyOneSSRsExSeat =
      currentSession?.bookingResponse?.Booking?.Journeys[0].Segments[0].PaxSSRs;

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
      paxSSRs: [...JourneyTwoSSRsExSeat],
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
