import { createSlice } from "@reduxjs/toolkit";
import { Logon } from "services/sessionService";
import { PURGE } from "redux-persist";

import {
  GetLowFareAvailability,
  GetAvailabilityRequest,
  BookingSell,
  BookingCancel,
  UpdatePassengers,
  UpdateContacts,
  AddPaymentToBooking,
  BookingCommit,
  GetBooking,
  GetBookingFromState,
  GetSeatAvailabilityForBooking,
  AssignSeats,
  GetSSRAvailabilityForBooking,
  CheckInPassengers,
} from "services/bookingService";
import { notification } from "antd";
import { setPromoWidgetVisible } from "./general";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { bookingResponse, sessionStateResponse } from "./data";

const initialState = {
  isLoading: false,
  signature: null,
  sessionLoading: false,
  lowFareAvailabilityLoading: false,
  lowFareAvailabilityResponse: null,
  returnFareAvailabilityLoading: false,
  returnFareAvailabilityResponse: null,
  flightAvailabilityLoading: false,
  flightParams: null,
  availabilityResponse: null,
  selectedSessionJourney: null,
  selectedSessionFare: null,
  selectedSessionReturnFare: null,
  sellFlightLoading: false,
  sellResponse: null,
  sellInfantLoading: false,
  sellInfantResponse: null,
  sessionPassengers: null,
  sessionInfants: null,
  sessionContact: null,
  sessionSSRs: [],
  sessionReturnSSRs: [],
  updatePassengersLoading: false,
  passengersResponse: null,
  updateContactsLoading: false,
  contactsResponse: null,
  paymentBookingLoading: false,
  paymentBookingResponse: null,
  bookingCommitLoading: false,
  bookingCommitResponse: null,
  bookingResponseLoading: false,
  bookingResponse: null,
  bookingResponse: bookingResponse,
  seatAvailability: null,
  seatResponseLoading: true,
  SSRAvailabilityLoading: false,
  SSRAvailabilityResponse: null,
  sellSSRLoading: false,
  sellSSRResponse: null,
  assignSeatResponse: null,
  bookingState: null,
  sessionStateLoading: false,
  sessionStateResponse: null,
  // sessionStateResponse: sessionStateResponse,
  seats: [],
  checkInSelection: [],
  selectedPassengers: [],
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    saveClientSignature: (state, { payload }) => {
      state.signature = payload;
    },
    setSessionLoading: (state, { payload }) => {
      state.sessionLoading = payload;
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

    setFlightParams: (state, { payload }) => {
      state.flightParams = {
        ...payload,
      };
    },
    setFlightAvailabilityLoading: (state, { payload }) => {
      state.flightAvailabilityLoading = payload;
    },
    setAvailabilityResponse: (state, { payload }) => {
      state.availabilityResponse = {
        ...payload,
      };
    },
    setSelectedSessionJourney: (state, { payload }) => {
      state.selectedSessionJourney = payload;
    },
    setSelectedSessionFare: (state, { payload }) => {
      state.selectedSessionFare = payload;
    },
    setSelectedSessionReturnFare: (state, { payload }) => {
      state.selectedSessionReturnFare = payload;
    },

    setSellFlightLoading: (state, { payload }) => {
      state.sellFlightLoading = payload;
    },
    setSellResponse: (state, { payload }) => {
      state.sellResponse = payload;
    },
    setSellInfantLoading: (state, { payload }) => {
      state.sellInfantLoading = payload;
    },
    setSellInfantResponse: (state, { payload }) => {
      state.sellInfantResponse = payload;
    },
    setSessionPassengers: (state, { payload }) => {
      state.sessionPassengers = [...payload];
    },
    setSessionInfants: (state, { payload }) => {
      state.sessionInfants = [...payload];
    },
    setSessionSSRs: (state, { payload }) => {
      state.sessionSSRs = payload;
    },
    setSessionReturnSSRs: (state, { payload }) => {
      state.sessionReturnSSRs = payload;
    },
    setUpdatePassengersLoading: (state, { payload }) => {
      state.updatePassengersLoading = payload;
    },
    setUpdatePassengersResponse: (state, { payload }) => {
      state.passengersResponse = {
        ...payload,
      };
    },
    setUpdateContactsLoading: (state, { payload }) => {
      state.updateContactsLoading = payload;
    },
    setUpdateContactsResponse: (state, { payload }) => {
      state.contactsResponse = {
        ...payload,
      };
    },
    setPaymentBookingLoading: (state, { payload }) => {
      state.paymentBookingLoading = payload;
    },
    setPaymentBookingResponse: (state, { payload }) => {
      state.paymentBookingResponse = {
        ...payload,
      };
    },
    setBookingCommitLoading: (state, { payload }) => {
      state.bookingCommitLoading = payload;
    },
    setBookingCommitResponse: (state, { payload }) => {
      state.bookingCommitResponse = payload;
    },
    setBookingResponseLoading: (state, { payload }) => {
      state.bookingResponseLoading = payload;
    },
    setBookingResponse: (state, { payload }) => {
      state.bookingResponse = payload;
    },
    setBookingState: (state, { payload }) => {
      state.bookingState = payload;
    },
    setSSRAvailabilityLoading: (state, { payload }) => {
      state.SSRAvailabilityLoading = payload;
    },
    setSSRAvailabilityResponse: (state, { payload }) => {
      state.SSRAvailabilityResponse = payload;
    },
    setSSRLoading: (state, { payload }) => {
      state.sellSSRLoading = payload;
    },
    setSSRResponse: (state, { payload }) => {
      state.sellSSRResponse = payload;
    },
    setSessionContact: (state, { payload }) => {
      state.sessionContact = payload;
    },

    setSeatResponseLoading: (state, { payload }) => {
      state.seatResponseLoading = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setSeatAvailabilityResponse: (state, { payload }) => {
      state.seatAvailability = payload;
    },
    setAssignSeatResponse: (state, { payload }) => {
      state.assignSeatResponse = payload;
    },

    setSSRResponse: (state, { payload }) => {
      state.sellSSRResponse = payload;
    },

    setSessionStateLoading: (state, { payload }) => {
      state.sessionStateLoading = payload;
    },
    setSessionStateResponse: (state, { payload }) => {
      state.sessionStateResponse = payload;
    },
    setSeats: (state, { payload }) => {
      const hasItem = state.seats.some(
        (l) =>
          l.arrivalStation === payload.arrivalStation &&
          l.passengerNumbers[0] === payload.passengerNumbers[0]
      );

      if (hasItem) {
        return {
          ...state,
          seats: state.seats.map((el) => {
            if (
              el.arrivalStation === payload.arrivalStation &&
              el.passengerNumbers[0] === payload.passengerNumbers[0]
            ) {
              return {
                ...el,
                ...payload,
              };
            }
            return el;
          }),
        };
      } else {
        return {
          ...state,
          seats: state.seats.concat(payload),
        };
      }
    },
    resetSeat: (state) => {
      state.seats = [];
    },
    setCheckInSelection: (state, { payload }) => {
      state.checkInSelection = payload;
    },
    addSeatToCheckInSelection: (state, { payload }) => {
      const hasItem = state?.checkInSelection[
        payload.ticketIndex
      ]?.checkInPaxRequestList.some(
        (l) => l.passengerID === parseInt(payload.passengerNumber)
      );

      if (hasItem) {
        return {
          ...state,
          checkInSelection: state.checkInSelection.map((item, index) => {
            if (index === payload.ticketIndex) {
              return {
                ...item,
                checkInPaxRequestList: item.checkInPaxRequestList.map((el) => {
                  if (el.passengerID === parseInt(payload.passengerNumber)) {
                    return {
                      ...el,
                      seatNo: payload.SeatDesignator,
                    };
                  }
                  return el;
                }),
              };
            }
            return item;
          }),
        };
      }
    },
    setSelectedPassengers: (state, { payload }) => {
      return {
        ...state,
        selectedPassengers: state.selectedPassengers.concat(payload),
      };
    },
    resetSelectedPassengers: (state) => {
      state.selectedPassengers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState); // THIS LINE
  },
});

export const {
  saveClientSignature,
  setSessionLoading,
  setFlightParams,
  setFlightAvailabilityLoading,
  setAvailabilityResponse,

  setReturnFareAvailabilityLoading,
  setReturnFareAvailabilityResponse,

  setSellFlightLoading,
  setSelectedSessionJourney,
  setSelectedSessionFare,
  setSelectedSessionReturnFare,
  setSellResponse,
  setSellInfantLoading,
  setSellInfantResponse,
  setSessionPassengers,
  setSessionInfants,
  setSessionContact,
  setSessionSSRs,
  setSessionReturnSSRs,
  setUpdatePassengersLoading,
  setUpdatePassengersResponse,
  setUpdateContactsLoading,
  setUpdateContactsResponse,
  setPaymentBookingLoading,
  setPaymentBookingResponse,
  setBookingCommitLoading,
  setBookingCommitResponse,
  setBookingResponseLoading,
  setBookingResponse,
  setSeatResponseLoading,
  setSeatAvailabilityResponse,
  setLowFareAvailabilityLoading,
  setLowFareAvailabilityResponse,
  setLoading,
  setSSRAvailabilityLoading,
  setSSRAvailabilityResponse,
  setSSRLoading,
  setSSRResponse,
  setAssignSeatResponse,
  setBookingState,
  setSessionStateLoading,
  setSessionStateResponse,
  setSeats,
  resetSeat,
  resetSelectedPassengers,
  setCheckInSelection,
  addSeatToCheckInSelection,
  setSelectedPassengers,
} = sessionSlice.actions;
export const sessionSelector = (state) => state.session;
export default sessionSlice.reducer;

export const startSession = () => async (dispatch) => {
  dispatch(setSessionLoading(true));

  try {
    const payload = {
      logonRequestData: {
        domainCode: "",
        agentName: "",
        password: "",
        locationCode: "",
        roleCode: "",
        terminalInfo: "",
        clientName: "",
      },
    };
    const sessionCredentials = await Logon(payload);
    const clientSignature = sessionCredentials.data.signature;
    window.localStorage.setItem("clientSignature", clientSignature);
    dispatch(saveClientSignature(clientSignature));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Signature creation failed",
    });
  }

  dispatch(setSessionLoading(false));
};

export const killSession = (payload) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const payload = {
      logonRequestData: {
        domainCode: "string",
        agentName: "string",
        password: "string",
        locationCode: "string",
        roleCode: "string",
        terminalInfo: "string",
        clientName: "string",
      },
    };
    const sessionCredentials = await Logon(payload);
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Agent Registration failed",
    });
  }

  dispatch(setLoading(false));
};

export const setFlightRequest = (payload) => async (dispatch) => {
  await dispatch(setFlightParams(payload));
  // await dispatch(fetchFlightAvailability(payload));
};

export const _fetchLowFareAvailability = (payload) => async (dispatch) => {
  dispatch(setLowFareAvailabilityLoading(true));

  const { departureStation, arrivalStation, signature, currentDate } = payload;

  const requestPayload = {
    signature: signature,
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
          beginDate: format(currentDate, "yyyy-MM-dd"),
          beginDateSpecified: true,
          endDate: format(addDays(currentDate, 27), "yyyy-MM-dd"),
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
    },
  };

  try {
    const Response = await GetLowFareAvailability(requestPayload);
    await dispatch(setLowFareAvailabilityResponse(Response.data));
  } catch (err) {
    // notification.error({
    //   message: "Error",
    //   description: "Fetch Low Fares failed",
    // });
  }
  dispatch(setLowFareAvailabilityLoading(false));
};

export const fetchLowFareAvailability = (payload) => async (dispatch) => {
  dispatch(setLowFareAvailabilityLoading(true));

  const { departureStation, arrivalStation, signature, currentDate, ADT, CHD } =
    payload;

  const totalPaxCount = parseInt(ADT) + parseInt(CHD);

  const requestPayload = {
    signature: signature,
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
      PaxCount: totalPaxCount,
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
      MinimumFarePrice: 0,
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
      taxAmount: 0,
    },
  };

  try {
    const Response = await GetLowFareAvailability(requestPayload);
    await dispatch(setLowFareAvailabilityResponse(Response.data));
  } catch (err) {
    // notification.error({
    //   message: "Error",
    //   description: "Fetch Low Fares failed",
    // });
  }
  dispatch(setLowFareAvailabilityLoading(false));
};

export const _returnLowFareAvailability = (payload) => async (dispatch) => {
  dispatch(setReturnFareAvailabilityLoading(true));

  const { departureStation, arrivalStation, signature, currentDate } = payload;

  const requestPayload = {
    signature: signature,
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
          beginDate: format(currentDate, "yyyy-MM-dd"),
          beginDateSpecified: true,
          endDate: format(addDays(currentDate, 27), "yyyy-MM-dd"),
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
    },
  };

  try {
    const Response = await GetLowFareAvailability(requestPayload);
    await dispatch(setReturnFareAvailabilityResponse(Response.data));
  } catch (err) {
    // notification.error({
    //   message: "Error",
    //   description: "Fetch Return Low Fares failed",
    // });
  }
  dispatch(setReturnFareAvailabilityLoading(false));
};

export const returnLowFareAvailability = (payload) => async (dispatch) => {
  dispatch(setReturnFareAvailabilityLoading(true));

  const { departureStation, arrivalStation, signature, currentDate, ADT, CHD } =
    payload;
  const totalPaxCount = parseInt(ADT) + parseInt(CHD);

  const requestPayload = {
    signature: signature,
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
      PaxCount: totalPaxCount,
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
      MinimumFarePrice: 0,
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
      taxAmount: 0,
    },
  };
  try {
    const Response = await GetLowFareAvailability(requestPayload);
    await dispatch(setReturnFareAvailabilityResponse(Response.data));
  } catch (err) {
    // notification.error({
    //   message: "Error",
    //   description: "Fetch Return Low Fares failed",
    // });
  }
  dispatch(setReturnFareAvailabilityLoading(false));
};

export const fetchFlightAvailability = (payload) => async (dispatch) => {
  dispatch(setFlightAvailabilityLoading(true));

  const {
    departureStation,
    arrivalStation,
    beginDate,
    endDate,
    returnDate,
    signature,
    ADT,
    CHD,
    isRoundTrip,
    promoCode,
  } = payload;

  const totalPaxCount = parseInt(ADT) + parseInt(CHD);

  const availabilityRequest = [];

  if (isRoundTrip === 1) {
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
      promotionCode: promoCode && promoCode.length > 0 ? promoCode : "",
      availabilityType: 0,
      availabilityTypeSpecified: true,
      sourceOrganization: "",
      maximumConnectingFlights: 0,
      maximumConnectingFlightsSpecified: true,
      availabilityFilter: 0,
      availabilityFilterSpecified: true,
      fareClassControl: 1,
      fareClassControlSpecified: true,
      minimumFarePrice: 0,
      minimumFarePriceSpecified: true,
      maximumFarePrice: 0,
      maximumFarePriceSpecified: true,
      productClassCode: "",
      ssrCollectionsMode: 0,
      ssrCollectionsModeSpecified: true,
      inboundOutbound: 0,
      inboundOutboundSpecified: true,
      nightsStay: 0,
      nightsStaySpecified: true,
      includeAllotments: true,
      includeAllotmentsSpecified: true,
      includeTaxesAndFees: true,
      includeTaxesAndFeesSpecified: true,
      paxResidentCountry: "",
      baggagePricingSystemCode: "",
    };
    let _returnRequest = {
      departureStation: arrivalStation,
      arrivalStation: departureStation,
      beginDate: returnDate,
      beginDateSpecified: true,
      endDate: returnDate,
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
      promotionCode: promoCode && promoCode.length > 0 ? promoCode : "",
      availabilityType: 0,
      availabilityTypeSpecified: true,
      sourceOrganization: "",
      maximumConnectingFlights: 0,
      maximumConnectingFlightsSpecified: true,
      availabilityFilter: 0,
      availabilityFilterSpecified: true,
      fareClassControl: 1,
      fareClassControlSpecified: true,
      minimumFarePrice: 0,
      minimumFarePriceSpecified: true,
      maximumFarePrice: 0,
      maximumFarePriceSpecified: true,
      productClassCode: "",
      ssrCollectionsMode: 0,
      ssrCollectionsModeSpecified: true,
      inboundOutbound: 0,
      inboundOutboundSpecified: true,
      nightsStay: 0,
      nightsStaySpecified: true,
      includeAllotments: true,
      includeAllotmentsSpecified: true,
      includeTaxesAndFees: true,
      includeTaxesAndFeesSpecified: true,
      paxResidentCountry: "",
      baggagePricingSystemCode: "",
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
      promotionCode: promoCode && promoCode.length > 0 ? promoCode : "",
      availabilityType: 0,
      availabilityTypeSpecified: true,
      sourceOrganization: "",
      maximumConnectingFlights: 0,
      maximumConnectingFlightsSpecified: true,
      availabilityFilter: 0,
      availabilityFilterSpecified: true,
      fareClassControl: 1,
      fareClassControlSpecified: true,
      minimumFarePrice: 0,
      minimumFarePriceSpecified: true,
      maximumFarePrice: 0,
      maximumFarePriceSpecified: true,
      productClassCode: "",
      ssrCollectionsMode: 0,
      ssrCollectionsModeSpecified: true,
      inboundOutbound: 0,
      inboundOutboundSpecified: true,
      nightsStay: 0,
      nightsStaySpecified: true,
      includeAllotments: true,
      includeAllotmentsSpecified: true,
      includeTaxesAndFees: true,
      includeTaxesAndFeesSpecified: true,
      paxResidentCountry: "",
      baggagePricingSystemCode: "",
    };
    availabilityRequest.push(_singleAvailabilityRequest);
  }

  const requestPayload = {
    header: {
      signature: signature,
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
    const flightAvalaibilty = await GetAvailabilityRequest(requestPayload);
    const availabilityResponse = flightAvalaibilty.data;
    await dispatch(setAvailabilityResponse(availabilityResponse));
  } catch (err) {
    const errMsg = err?.response?.data?.Error?.ErrorText;
    const PROMO_ERROR = "PssPromoCodeNotFoundException";
    errMsg &&
      errMsg.toLowerCase() === PROMO_ERROR.toLowerCase() &&
      dispatch(setPromoWidgetVisible(true));
    // notification.error({
    //   message: "Error",
    //   description: "Fetch Flights failed",
    // });
  }
  dispatch(setFlightAvailabilityLoading(false));
};

export const saveSellRequest = (payload) => async (dispatch, getState) => {
  dispatch(setSellFlightLoading(true));
  const currentState = getState().session;

  const paxPriceTypes = [];
  const flightParams = currentState.flightParams;
  const ADULT_COUNT = parseInt(flightParams?.ADT);
  const CHILD_COUNT = parseInt(flightParams?.CHD);
  const INFANT_COUNT = parseInt(flightParams?.INF);
  const totalPaxCount = ADULT_COUNT + CHILD_COUNT;
  let infantPayload = {};

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

  if (INFANT_COUNT > 0) {
    let paxSSRs = [];

    new Array(INFANT_COUNT).fill(0).map((i, index) => {
      let paxObj = {
        state: 0,
        stateSpecified: true,
        actionStatusCode: "NN",
        arrivalStation: flightParams?.arrivalStation,
        departureStation: flightParams?.departureStation,
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

    infantPayload = {
      header: {
        signature: currentState.signature,
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
                segmentSSRRequests: [
                  {
                    flightDesignator: {
                      carrierCode: payload.segmentCarrierCode,
                      flightNumber: payload.segmentFlightNumber,
                      opSuffix: "",
                    },
                    std: payload.segmentStd,
                    stdSpecified: true,
                    departureStation: payload.departureStation,
                    arrivalStation: payload.arrivalStation,
                    paxSSRs: [...paxSSRs],
                  },
                ],
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
        },
      },
    };
  }

  const requestPayload = {
    header: {
      signature: currentState.signature,
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
              journeySellKeys: [
                {
                  JourneySellKey: payload.sellKey,
                  FareSellKey: payload.fareKey,
                  standbyPriorityCode: "",
                  packageIndicator: "",
                },
              ],
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
              serviceBundleList: [payload?.RuleNumber],
              applyServiceBundle: 1,
              applyServiceBundleSpecified: true,
            },
          },
        },
      },
    },
  };

  try {
    const sellResponse = await BookingSell(requestPayload);
    // await dispatch(setSellResponse(sellResponse.data));
    if (INFANT_COUNT > 0) {
      dispatch(setSellInfantLoading(true));
      try {
        const sellInfantResponse = await BookingSell(infantPayload);
        await dispatch(setSellResponse(sellResponse.data));
        await dispatch(setSellInfantResponse(sellInfantResponse.data));
        await dispatch(FetchStateFromServer());
      } catch (err) {
        notification.error({
          message: "Error",
          description: "Error booking Infant",
        });
      }
      dispatch(setSellInfantLoading(false));
    } else {
      await dispatch(setSellResponse(sellResponse.data));
    }
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Sell Request failed",
    });
  }
  dispatch(setSellFlightLoading(false));
};

export const saveMultipleSellRequest =
  (payload) => async (dispatch, getState) => {
    dispatch(setSellFlightLoading(true));
    const currentState = getState().session;

    const paxPriceTypes = [];
    const _serviceBundleList = [];
    const flightParams = currentState.flightParams;
    const ADULT_COUNT = parseInt(flightParams?.ADT);
    const CHILD_COUNT = parseInt(flightParams?.CHD);
    const INFANT_COUNT = parseInt(flightParams?.INF);
    const totalPaxCount = ADULT_COUNT + CHILD_COUNT;
    let infantPayload = {};

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

    if (INFANT_COUNT > 0) {
      let _segmentSSRRequests = [];

      payload.map((_sessionJourney) => {
        let paxSSRs = [];
        new Array(INFANT_COUNT).fill(0).map((i, index) => {
          let paxObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            arrivalStation: _sessionJourney?.arrivalStation,
            departureStation: _sessionJourney?.departureStation,
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

        let newObj = {
          flightDesignator: {
            carrierCode: _sessionJourney?.FlightDesignator?.CarrierCode,
            flightNumber: _sessionJourney?.segmentFlightNumber,
            opSuffix: "",
          },
          std: _sessionJourney?.segmentStd,
          stdSpecified: true,
          departureStation: _sessionJourney?.departureStation,
          arrivalStation: _sessionJourney?.arrivalStation,
          paxSSRs: [...paxSSRs],
        };
        _segmentSSRRequests.push(newObj);
      });

      infantPayload = {
        header: {
          signature: currentState.signature,
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
                  segmentSSRRequests: [..._segmentSSRRequests],
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
          },
        },
      };
    }

    const _journeySellKeys = [];

    payload.map((_sessionJourney) => {
      let newObj = {
        JourneySellKey: _sessionJourney?.sellKey,
        FareSellKey: _sessionJourney?.fareKey,
        standbyPriorityCode: "",
        packageIndicator: "",
      };
      _journeySellKeys.push(newObj);
      _serviceBundleList.push(_sessionJourney?.RuleNumber);
    });

    const requestPayload = {
      header: {
        signature: currentState.signature,
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
      const sellResponse = await BookingSell(requestPayload);
      await dispatch(setSellResponse(sellResponse.data));
      if (INFANT_COUNT > 0) {
        dispatch(setSellInfantLoading(true));
        try {
          const sellInfantResponse = await BookingSell(infantPayload);
          await dispatch(setSellInfantResponse(sellInfantResponse.data));
          await dispatch(FetchStateFromServer());
        } catch (err) {
          notification.error({
            message: "Error",
            description: "Sell Infant Request error",
          });
        }
        dispatch(setSellInfantLoading(false));
      }
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Sell Request failed",
      });
    }

    dispatch(setSellFlightLoading(false));
  };

export const updatePassengersDetails =
  (payload) => async (dispatch, getState) => {
    dispatch(setUpdatePassengersLoading(true));
    const currentState = getState().session;
    let requestPayload = {};

    if (parseInt(currentState.flightParams.INF) > 0) {
      const _Main = [];
      const _Infants = [];
      payload.map((item) => {
        if (item?.type === "INF") {
          _Infants.push(item);
        } else {
          _Main.push(item);
        }
      });
      dispatch(setSessionPassengers(_Main));
      dispatch(setSessionInfants(_Main));
      let _passengers = [];
      let updatedPassengers = [];
      _Main.map((_passenger, _i) => {
        let passengerObj = {
          state: 0,
          customerNumber: "",
          passengerNumber: parseInt(_i),
          passengerNumberSpecified: true,
          familyNumber: 0,
          paxDiscountCode: "",
          names: [
            {
              firstName: _passenger.firstName,
              middleName: "",
              lastName: _passenger.lastName,
              suffix: "",
              title: _passenger.title,
              state: 0,
            },
          ],
          passengerID: 0,
          pseudoPassenger: false,
          passengerTypeInfos: [
            {
              state: 0,
              stateSpecified: true,
              dob: _passenger?.dob || "9999-12-31T00:00:00Z",
              dobSpecified: true,
              paxType: _passenger.type,
            },
          ],
        };
        _passengers.push(passengerObj);
      });
      _passengers.map((item) => {
        if (_Infants.length > 0) {
          const INFANT_TO_BE_ATTACHED = _Infants.shift();
          const infantObj = {
            dob: INFANT_TO_BE_ATTACHED?.dob,
            dobSpecified: true,
            gender: 0,
            nationality: "",
            residentCountry: "",
            names: [
              {
                firstName: INFANT_TO_BE_ATTACHED.firstName,
                middleName: "",
                lastName: INFANT_TO_BE_ATTACHED.lastName,
                suffix: "",
                title: INFANT_TO_BE_ATTACHED.title,
                state: 0,
              },
            ],
            paxType: "INFT",
            state: 0,
          };
          const newPassengerObj = {
            ...item,
            infant: {
              ...infantObj,
            },
          };
          updatedPassengers.push(newPassengerObj);
        } else {
          updatedPassengers.push(item);
        }
      });
      requestPayload = {
        header: {
          signature: currentState.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: false,
          contractVersion: 0,
        },
        updatePassengersRequestDto: {
          updatePassengerRequest: {
            updatePassengersRequestData: {
              passengers: [...updatedPassengers],
              waiveNameChangeFee: false,
            },
          },
        },
      };
    } else {
      dispatch(setSessionPassengers(payload));
      let _passengers = [];
      payload.map((_passenger, _i) => {
        let passengerObj = {
          state: 0,
          customerNumber: "",
          passengerNumber: parseInt(_i),
          passengerNumberSpecified: true,
          familyNumber: 0,
          paxDiscountCode: "",
          names: [
            {
              firstName: _passenger.firstName,
              middleName: "",
              lastName: _passenger.lastName,
              suffix: "",
              title: _passenger.title,
              state: 0,
            },
          ],
          passengerID: 0,
          pseudoPassenger: false,
          passengerTypeInfos: [
            {
              state: 0,
              stateSpecified: true,
              dob: _passenger.dob || "9999-12-31T00:00:00Z",
              dobSpecified: true,
              paxType: _passenger.type,
            },
          ],
        };
        _passengers.push(passengerObj);
      });

      requestPayload = {
        header: {
          signature: currentState.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: false,
          contractVersion: 0,
        },
        updatePassengersRequestDto: {
          updatePassengerRequest: {
            updatePassengersRequestData: {
              passengers: [..._passengers],
              waiveNameChangeFee: false,
            },
          },
        },
      };
    }

    try {
      const Response = await UpdatePassengers(requestPayload);
      await dispatch(setUpdatePassengersResponse(Response.data));
      await dispatch(FetchStateFromServer());
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Update passenger(s) details failed",
      });
    }
    dispatch(setUpdatePassengersLoading(false));
  };

export const updateContactsDetails =
  (payload) => async (dispatch, getState) => {
    dispatch(setUpdateContactsLoading(true));
    dispatch(setSessionContact(payload));
    const currentState = getState().session;

    const requestPayload = {
      header: {
        signature: currentState.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: false,
        contractVersion: 0,
      },
      updateContactsRequestDto: {
        updateContactsRequest: {
          updateContactsRequestData: {
            bookingContactList: [
              {
                state: 0,
                stateSpecified: true,
                typeCode: "P",
                names: [
                  {
                    firstName: payload.firstName,
                    middleName: "",
                    lastName: payload.lastName,
                    suffix: "",
                    title: payload.title,
                    state: 0,
                    stateSpecified: true,
                  },
                ],
                emailAddress: payload.email,
                homePhone: payload.phone,
                workPhone: payload.phone,
                otherPhone: payload.phone,
                fax: "",
                companyName: "GreenAfrica",
                addressLine1: "Lagos",
                addressLine2: "",
                addressLine3: "",
                city: "Lagos",
                provinceState: "LA",
                postalCode: "",
                countryCode: "NG",
                cultureCode: "",
                distributionOption: 2,
                distributionOptionSpecified: true,
                customerNumber: "",
                notificationPreference: 0,
                notificationPreferenceSpecified: true,
                sourceOrganization: "",
              },
            ],
          },
        },
      },
    };

    try {
      const Response = await UpdateContacts(requestPayload);
      await dispatch(setUpdateContactsResponse(Response.data));
      await dispatch(FetchStateFromServer());
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Update Contact failed",
      });
    }
    dispatch(setUpdateContactsLoading(false));
  };

export const PaymentToBooking = (payload) => async (dispatch, getState) => {
  dispatch(setBookingCommitLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
    addPaymentToBookingRequestDto: {
      addPaymentToBookingRequest: {
        addPaymentToBookingReqData: {
          messageState: 0,
          waiveFee: false,
          referenceType: 0,
          referenceTypeSpecified: true,
          paymentMethodType: 0,
          paymentMethodTypeSpecified: true,
          paymentMethodCode: "PS",
          quotedCurrencyCode: "NGN",
          quotedAmount:
            currentState.passengersResponse?.BookingUpdateResponseData?.Success
              ?.PNRAmount?.TotalCost,
          quotedAmountSpecified: true,
          status: 0,
          statusSpecified: true,
          accountNumberID: 0,
          accountNumberIDSpecified: true,
          accountNumber: "",
          expiration: "0001-01-01T00:00:00",
          expirationSpecified: true,
          parentPaymentID: 0,
          parentPaymentIDSpecified: true,
          installments: 0,
          installmentsSpecified: true,
          paymentText: "",
          deposit: false,
          depositSpecified: true,
          payments: [
            {
              name: "REF",
              value: payload.ref,
              // value: "BLJK136H9B5IYTAROAA",
            },
          ],
          paymentAddresses: [
            {
              paymentID: 0,
              paymentIDSpecified: true,
              companyName: "",
              addressLine1: "",
              addressLine2: "",
              addressLine3: "",
              city: "",
              provinceState: "",
              postalCode: "",
              countryCode: "",
            },
          ],
          agencyAccount: {
            accountId: 0,
            accountIdSpecified: true,
            accountTransactionId: 0,
            accountTransactionIdSpecified: true,
            password: "",
          },
          creditShell: {
            accountId: 0,
            accountIdSpecified: true,
            accountTransactionId: 0,
            accountTransactionIdSpecified: true,
            password: "",
            accountTransactionCode: "",
          },
          creditFile: {
            accountId: 0,
            accountIdSpecified: true,
            accountTransactionId: 0,
            accountTransactionIdSpecified: true,
            password: "",
            recordLocator: "",
          },
          paymentVoucher: {
            voucherID: 0,
            voucherIDSpecified: true,
            voucherTransaction: 0,
            voucherTransactionSpecified: true,
            overrideVoucherRestrictions: false,
            overrideVoucherRestrictionsSpecified: true,
            overrideAmount: false,
            overrideAmountSpecified: true,
            recordLocator: "",
          },
          threeDSecureRequest: {
            browserUserAgent: "",
            browserAccept: "",
            remoteIpAddress: "",
            termUrl: "",
            proxyVia: "",
          },
          mccRequest: {
            mccInUse: false,
            mccInUseSpecified: true,
            collectedCurrencyCode: "",
            collectedAmount: 0,
            collectedAmountSpecified: true,
          },
          authorizationCode: "",
        },
      },
    },
  };

  try {
    const Response = await AddPaymentToBooking(requestPayload);
    await dispatch(FetchStateFromServer());
    await dispatch(setPaymentBookingResponse(Response.data));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Payment failed",
    });
  }
  dispatch(setBookingCommitLoading(false));
};

export const GetBookingCommit = () => async (dispatch, getState) => {
  dispatch(setBookingCommitLoading(true));
  const currentState = getState().session;

  // const requestPayload = {
  //   signature: currentState.signature,
  //   messageContractVersion: "",
  //   enableExceptionStackTrace: true,
  //   contractVersion: 0,
  //   bookingCommitRequestData: {
  //     state: 0,
  //     recordLocator: "",
  //     currencyCode: "",
  //     paxCount: 0,
  //     systemCode: "",
  //     bookingID: 0,
  //     bookingParentID: 0,
  //     parentRecordLocator: "",
  //     bookingChangeCode: "",
  //     groupName: "",
  //     bookingHold: {
  //       holdDateTime: "2022-08-18T04:16:16.411Z",
  //       holdDateTimeSpecified: true,
  //       state: 0,
  //       stateSpecified: true,
  //     },
  //     numericRecordLocator: "",
  //     restrictionOverride: false,
  //     changeHoldDateTime: false,
  //     changeHoldDateTimeSpecified: false,
  //     waiveNameChangeFee: false,
  //     waiveNameChangeFeeSpecified: true,
  //     waivePenaltyFee: false,
  //     waivePenaltyFeeSpecified: true,
  //     waiveSpoilageFee: false,
  //     waiveSpoilageFeeSpecified: true,
  //     distributeToContacts: false,
  //     distributeToContactsSpecified: true,
  //   },
  // };

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: true,
      contractVersion: 0,
    },
  };

  try {
    const Response = await BookingCommit(requestPayload);
    await dispatch(setBookingCommitResponse(Response.data));
    await dispatch(FetchStateFromServer());
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Get Booking failed",
    });
  }
  dispatch(setBookingCommitLoading(false));
};

export const CommitBookingWithPNR = (pnr) => async (dispatch, getState) => {
  dispatch(setBookingCommitLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    signature: currentState.signature,
    messageContractVersion: "",
    enableExceptionStackTrace: true,
    contractVersion: 0,
    bookingCommitRequestData: {
      state: 2,
      recordLocator: pnr,
      paxCount: 0,
      bookingID: 0,
      bookingParentID: 0,
      restrictionOverride: false,
      changeHoldDateTime: false,
      changeHoldDateTimeSpecified: false,
      waiveNameChangeFee: false,
      waiveNameChangeFeeSpecified: true,
      waivePenaltyFee: false,
      waivePenaltyFeeSpecified: true,
      waiveSpoilageFee: false,
      waiveSpoilageFeeSpecified: true,
      distributeToContacts: true,
      distributeToContactsSpecified: true,
    },
  };

  try {
    const Response = await BookingCommit(requestPayload);
    await dispatch(setBookingCommitResponse(Response.data));
    await dispatch(FetchStateFromServer());
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Get Booking failed",
    });
  }
  dispatch(setBookingCommitLoading(false));
};

export const GetBookingDetails = () => async (dispatch, getState) => {
  dispatch(setBookingResponseLoading(true));
  const currentState = getState().session;
  const currentPaymentState = getState().payment;

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
    getBookingRequestDto: {
      getBookingRequestData: {
        getBookingBy: 0,
        getBookingBySpecified: true,
        getByRecordLocator: {
          recordLocator: currentPaymentState?.verifyPaymentResponse?.data?.pnr,
        },
      },
    },
  };
  try {
    const Response = await GetBooking(requestPayload);
    await dispatch(setBookingResponse(Response.data));
    await dispatch(FetchStateFromServer());
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Get Booking Details failed",
    });
  }
  dispatch(setBookingResponseLoading(false));
};

export const GetBookingDetailsWithPNR =
  (payload) => async (dispatch, getState) => {
    const currentState = getState().session;

    dispatch(setBookingResponseLoading(true));

    if (payload.pnr) {
      const requestPayload = {
        header: {
          signature: currentState?.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: false,
          contractVersion: 0,
        },
        getBookingRequestDto: {
          getBookingRequestData: {
            getBookingBy: 0,
            getBookingBySpecified: true,
            getByRecordLocator: {
              recordLocator: payload.pnr,
            },
          },
        },
      };

      // console.log("request payload is", requestPayload);
      try {
        const Response = await GetBooking(requestPayload);
        await dispatch(setBookingResponse(Response.data));
      } catch (err) {
        notification.error({
          message: "Error",
          description: "Get Booking Details failed",
        });
      }
    }

    dispatch(setBookingResponseLoading(false));
  };

export const FetchSSRAvailabilityForBooking =
  () => async (dispatch, getState) => {
    dispatch(setSSRAvailabilityLoading(true));
    const currentState = getState().session;
    const flightParams = currentState.flightParams;
    const selectedSessionJourney = currentState.selectedSessionJourney;

    let _segmentKeyList = [];

    if (selectedSessionJourney) {
      selectedSessionJourney.map((_sessionJourney) => {
        let newObj = {
          carrierCode: _sessionJourney?.FlightDesignator?.CarrierCode,
          flightNumber: _sessionJourney?.segmentFlightNumber,
          opSuffix: "",
          departureDate:
            _sessionJourney?.schedueIndex === 0
              ? flightParams?.beginDate
              : flightParams?.returnDate,
          departureDateSpecified: true,
          departureStation: _sessionJourney?.departureStation,
          arrivalStation: _sessionJourney?.arrivalStation,
        };
        _segmentKeyList.push(newObj);
      });

      let requestPayload = {
        header: {
          signature: currentState.signature,
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
        notification.error({
          message: "Error",
          description: "Fetch SSR  failed",
        });
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

export const SellSSROption =
  (payload, returnPayload = []) =>
  async (dispatch, getState) => {
    dispatch(setSSRLoading(true));
    dispatch(setSessionSSRs(payload));
    dispatch(setSessionReturnSSRs(returnPayload));
    const currentState = getState().session;
    const selectedSessionJourney = currentState.selectedSessionJourney;

    const ALL_SSRS = [...payload, ...returnPayload];

    if (selectedSessionJourney) {
      let _segmentSSRRequests = [];
      selectedSessionJourney.map((_journey) => {
        const _paxSSRs = [];
        ALL_SSRS.map((_item) => {
          if (
            parseInt(_item?.schedueIndex) === parseInt(_journey?.schedueIndex)
          ) {
            const newSSR = {
              state: 0,
              stateSpecified: true,
              actionStatusCode: "NN",
              arrivalStation: _journey?.arrivalStation,
              departureStation: _journey?.departureStation,
              passengerNumber: _item?.passengerNumber,
              passengerNumberSpecified: true,
              ssrCode: _item?.ssrCode,
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
            _paxSSRs.push(newSSR);
          }
        });

        const newObj = {
          flightDesignator: {
            carrierCode: _journey?.FlightDesignator?.CarrierCode,
            flightNumber: _journey?.segmentFlightNumber,
            opSuffix: "",
          },
          std: _journey?.std,
          stdSpecified: true,
          departureStation: _journey?.departureStation,
          arrivalStation: _journey?.arrivalStation,
          paxSSRs: [..._paxSSRs],
        };

        _segmentSSRRequests.push(newObj);
      });

      let requestPayload = {
        header: {
          signature: currentState.signature,
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
                  segmentSSRRequests: [..._segmentSSRRequests],
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
          },
        },
      };

      try {
        const SSRResponse = await BookingSell(requestPayload);
        await dispatch(setSSRResponse(SSRResponse.data));
        await dispatch(FetchStateFromServer());
        // router.push("/trip/seat-selection");
      } catch (err) {
        // await dispatch(setSSRResponse(null));
        notification.error({
          message: "Error",
          description: "Sell SSR failed",
        });
      }
    }

    dispatch(setSSRLoading(false));
  };

export const FetchStateFromServer = () => async (dispatch, getState) => {
  const currentState = getState().session;
  dispatch(setSessionStateLoading(true));

  try {
    const payload = {
      header: {
        signature: currentState.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: false,
        contractVersion: 0,
      },
    };

    const stateBooking = await GetBookingFromState(payload);
    dispatch(setBookingState(stateBooking.data.BookingData));
    await dispatch(setSessionStateResponse(stateBooking.data));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Fetching session states failed",
    });
  }

  dispatch(setSessionStateLoading(false));
};

export const CancelSSRs = () => async (dispatch, getState) => {
  dispatch(setSSRLoading(true));
  const currentState = getState().session;
  const _sessionSSRs = currentState.sessionSSRs;
  const _sessionReturnSSRs = currentState.sessionReturnSSRs;
  const selectedSessionJourney = currentState.selectedSessionJourney;

  const ALL_SSRS = [..._sessionSSRs, ..._sessionReturnSSRs];
  let _segmentKeyList = [];

  if (selectedSessionJourney) {
    let _segmentSSRRequests = [];
    selectedSessionJourney.map((_sessionJourney) => {
      const _paxSSRs = [];
      const typeArr = [];

      ALL_SSRS.map((_item) => {
        let typeCount = 0;
        let _id = _item?.ssrCode + _item?.passengerNumber;
        if (typeArr.includes(_id)) {
          typeArr.push(_id);
          typeCount = typeArr.filter((_type) => _type === _id).length;
        } else {
          typeCount = 1;
          typeArr.push(_id);
        }

        const newPax = {
          state: 0,
          stateSpecified: true,
          actionStatusCode: "NN",
          arrivalStation: _sessionJourney?.arrivalStation,
          departureStation: _sessionJourney?.departureStation,
          passengerNumber: _item?.passengerNumber,
          passengerNumberSpecified: true,
          ssrCode: _item?.ssrCode,
          ssrNumberSpecified: true,
          ssrNumber: typeCount,
          ssrDetail: "",
          feeCode: "",
          note: "",
          ssrValue: 0,
          ssrValueSpecified: true,
          isInServiceBundle: false,
          isInServiceBundleSpecified: true,
        };
        _paxSSRs.push(newPax);
      });

      const newObj = {
        flightDesignator: {
          carrierCode: _sessionJourney?.FlightDesignator?.CarrierCode,
          flightNumber: _sessionJourney?.segmentFlightNumber,
          opSuffix: "",
        },
        std: _sessionJourney?.std,
        stdSpecified: true,
        departureStation: _sessionJourney?.departureStation,
        arrivalStation: _sessionJourney?.arrivalStation,
        paxSSRs: [..._paxSSRs],
      };
      _segmentKeyList.push(newObj);
    });

    let requestPayload = {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: true,
      contractVersion: 0,
      cancelRequestData: {
        cancelBy: 2,
        cancelBySpecified: true,
        cancelSSR: {
          SSRRequest: {
            segmentSSRRequests: [..._segmentSSRRequests],
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

    try {
      const SSRResponse = await BookingCancel(requestPayload);
      await dispatch(setSSRResponse(SSRResponse.data));
      await dispatch(FetchStateFromServer());
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Cancel SSRs failed",
      });
    }
  }

  dispatch(setSSRLoading(false));
};

export const retrieveBooking = (payload) => async (dispatch, getState) => {
  dispatch(setBookingResponseLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
    getBookingRequestDto: {
      getBookingRequestData: {
        getBookingBy: 0,
        getBookingBySpecified: true,
        getByRecordLocator: {
          recordLocator: payload.id,
        },
      },
    },
  };
  try {
    const Response = await GetBooking(requestPayload);
    await dispatch(setBookingResponse(Response.data));
  } catch (err) {
    console.log("Update passenger Request error", err.response);
  }
  dispatch(setBookingResponseLoading(false));
};

export const retrieveSeatAvailability =
  (payload) => async (dispatch, getState) => {
    dispatch(setSeatResponseLoading(true));
    const currentState = getState().session;

    const requestPayload = {
      header: {
        signature: currentState.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: false,
        contractVersion: 0,
      },
      getSeatAvailabilityRequestDto: {
        getSeatAvailabilityRequest: {
          seatAvailabilityRequest: {
            std: currentState?.bookingState?.Journeys[payload.ticketIndex]
              .Segments[0].STD,
            stdSpecified: true,
            departureStation:
              currentState.bookingState.Journeys[payload.ticketIndex]
                .Segments[0].DepartureStation,
            arrivalStation:
              currentState.bookingState.Journeys[payload.ticketIndex]
                .Segments[0].ArrivalStation,
            includeSeatFees: true,
            includeSeatFeesSpecified: false,
            seatAssignmentMode: 2,
            seatAssignmentModeSpecified: true,
            flightNumber:
              currentState.bookingState.Journeys[payload.ticketIndex]
                .Segments[0].FlightDesignator.FlightNumber,
            carrierCode:
              currentState.bookingState.Journeys[payload.ticketIndex]
                .Segments[0].FlightDesignator.CarrierCode,
            compressProperties: false,
            compressPropertiesSpecified: false,
            enforceSeatGroupRestrictions: true,
            enforceSeatGroupRestrictionsSpecified: false,
            passengerIDs: [0, 1],
            passengerNumbers: [0, 1],
            seatGroup: 1,
            seatGroupSpecified: false,
            seatGroupSettings: [3],
            includePropertyLookup: true,
            includePropertyLookupSpecified: true,
            overrideCarrierCode: "",
            overrideFlightNumber: "",
            overrideOpSuffix: "",
            overrideSTD: "0001-01-01T00:00:00",
            overrideSTDSpecified: false,
            overrideDepartureStation: "",
            overrideArrivalStation: "",
            collectedCurrencyCode: "",
            excludeEquipmentConfiguration: false,
            excludeEquipmentConfigurationSpecified: true,
            feePricingMode: 0,
            feePricingModeSpecified: true,
            opSuffix: "",
          },
        },
      },
    };
    try {
      const Response = await GetSeatAvailabilityForBooking(requestPayload);
      await dispatch(
        setSeatAvailabilityResponse(Response.data.SeatAvailabilityResponse)
      );
    } catch (err) {
      console.log("Update passenger Request error", err.response);
    }
    dispatch(setSeatResponseLoading(false));
  };

export const retrieveCheckinSeatAvailability =
  (payload) => async (dispatch, getState) => {
    dispatch(setSeatResponseLoading(true));
    const currentState = getState().session;

    const requestPayload = {
      header: {
        signature: currentState.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: false,
        contractVersion: 0,
      },
      getSeatAvailabilityRequestDto: {
        getSeatAvailabilityRequest: {
          seatAvailabilityRequest: {
            std: currentState?.bookingResponse?.Booking?.Journeys[
              payload.ticketIndex
            ].Segments[0].STD,
            stdSpecified: true,
            departureStation:
              currentState.bookingResponse?.Booking?.Journeys[
                payload.ticketIndex
              ].Segments[0].DepartureStation,
            arrivalStation:
              currentState.bookingResponse?.Booking?.Journeys[
                payload.ticketIndex
              ].Segments[0].ArrivalStation,
            includeSeatFees: true,
            includeSeatFeesSpecified: false,
            seatAssignmentMode: 2,
            seatAssignmentModeSpecified: true,
            flightNumber:
              currentState.bookingResponse?.Booking?.Journeys[
                payload.ticketIndex
              ].Segments[0].FlightDesignator.FlightNumber,
            carrierCode:
              currentState.bookingResponse?.Booking?.Journeys[
                payload.ticketIndex
              ].Segments[0].FlightDesignator.CarrierCode,
            compressProperties: false,
            compressPropertiesSpecified: false,
            enforceSeatGroupRestrictions: true,
            enforceSeatGroupRestrictionsSpecified: false,
            passengerIDs: [0, 1],
            passengerNumbers: [0, 1],
            seatGroup: 1,
            seatGroupSpecified: false,
            seatGroupSettings: [3],
            includePropertyLookup: true,
            includePropertyLookupSpecified: true,
            overrideCarrierCode: "",
            overrideFlightNumber: "",
            overrideOpSuffix: "",
            overrideSTD: "0001-01-01T00:00:00",
            overrideSTDSpecified: false,
            overrideDepartureStation: "",
            overrideArrivalStation: "",
            collectedCurrencyCode: "",
            excludeEquipmentConfiguration: false,
            excludeEquipmentConfigurationSpecified: true,
            feePricingMode: 0,
            feePricingModeSpecified: true,
            opSuffix: "",
          },
        },
      },
    };
    try {
      const Response = await GetSeatAvailabilityForBooking(requestPayload);
      await dispatch(
        setSeatAvailabilityResponse(Response.data.SeatAvailabilityResponse)
      );
    } catch (err) {
      console.log("Update passenger Request error", err.response);
    }
    dispatch(setSeatResponseLoading(false));
  };

export const startBookingCommit = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    signature: currentState.signature,
    messageContractVersion: "",
    enableExceptionStackTrace: true,
    contractVersion: 0,
    bookingCommitRequestData: {
      state: 0,
      recordLocator: payload.recordLocator,
      paxCount: 0,
      bookingID: 0,
      bookingParentID: 0,
      restrictionOverride: false,
      changeHoldDateTime: false,
      changeHoldDateTimeSpecified: false,
      waiveNameChangeFee: false,
      waiveNameChangeFeeSpecified: true,
      waivePenaltyFee: false,
      waivePenaltyFeeSpecified: true,
      waiveSpoilageFee: false,
      waiveSpoilageFeeSpecified: true,
      distributeToContacts: false,
      distributeToContactsSpecified: true,
    },
  };

  try {
    const Response = await BookingCommit(requestPayload);
    await dispatch(setBookingCommitResponse(Response.data));
  } catch (err) {
    console.log("Update passenger Request error", err.response);
  }

  dispatch(setLoading(false));
};

export const tryAssignSeat = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
    assignSeatsRequest: {
      sellSeatRequest: {
        blockType: 0,
        blockTypeSpecified: true,
        sameSeatRequiredOnThruLegs: false,
        sameSeatRequiredOnThruLegsSpecified: true,
        assignNoSeatIfAlreadyTaken: false,
        assignNoSeatIfAlreadyTakenSpecified: true,
        allowSeatSwappingInPnr: false,
        allowSeatSwappingInPnrSpecified: true,
        waiveFee: false,
        waiveFeeSpecified: true,
        replaceSpecificSeatRequest: false,
        replaceSpecificSeatRequestSpecified: true,
        seatAssignmentMode: 0,
        seatAssignmentModeSpecified: true,
        ignoreSeatSsRs: false,
        ignoreSeatSSRsSpecified: true,
        segmentSeatRequests: [...currentState.seats],
        equipmentDeviations: [
          {
            equipmentType: "",
            equipmentTypeSuffix: "",
            marketingCode: "",
          },
        ],
        collectedCurrencyCode: "NGN",
        includeSeatData: false,
        includeSeatDataSpecified: true,
        feePricingMode: 0,
        feePricingModeSpecified: true,
      },
    },
  };
  try {
    const Response = await AssignSeats(requestPayload);
    await dispatch(
      setAssignSeatResponse(Response.data.BookingUpdateResponseData)
    );
    // TODO REMOVE Booking COMMIT
    // await dispatch(
    //   startBookingCommit({
    //     recordLocator:
    //       Response.data.BookingUpdateResponseData.Success.RecordLocator,
    //   })
    // );
  } catch (err) {
    console.error("Update passenger Request error", err.response.data);
    notification.error({
      message: "Error",
      description: "Unable to assign seat",
    });
  }
  dispatch(setLoading(false));
};

export const startCheckin = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
    checkInPassengersRequestDto: {
      checkInPassengersRequest: {
        checkInMultiplePassengersRequest: {
          checkInMultiplePassengerRequestList: [...payload],
        },
      },
    },
  };

  try {
    const Response = await CheckInPassengers(requestPayload);
    // await dispatch(
    //   setAssignSeatResponse(Response.data.BookingUpdateResponseData)
    // );
  } catch (err) {
    notification.error({
      message: "Error",
      description:
        "err.response.data.BookingUpdateResponseData.Error.ErrorText",
    });
  }
  dispatch(setLoading(false));
};

export const retrieveBookingFromState = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    header: {
      signature: currentState.signature,
      messageContractVersion: "",
      enableExceptionStackTrace: false,
      contractVersion: 0,
    },
  };
  try {
    const Response = await GetBookingFromState(requestPayload);
    await dispatch(setBookingState(Response.data.BookingData));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Get Booking Details failed",
    });
  }
  dispatch(setLoading(false));
};

export const trySaveSeat = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const currentState = getState().session;
  await dispatch(setSeats(payload.data));
  // setSeats
  // try {
  //   const Response = await GetBookingFromState(requestPayload);
  //   await dispatch(setBookingState(Response.data.BookingData));
  // } catch (err) {
  //   notification.error({
  //     message: "Error",
  //     description: "Get Booking Details failed",
  //   });
  // }
  dispatch(setLoading(false));
};

export const tryClearSeat = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  await dispatch(resetSeat());
  dispatch(setLoading(false));
};

export const saveCheckInSelection = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  await dispatch(setCheckInSelection(payload));
  dispatch(setLoading(false));
};

export const saveCheckInPassengerSelection =
  (payload) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    await dispatch(setSelectedPassengers(payload));
    dispatch(setLoading(false));
  };
