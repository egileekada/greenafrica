import { createSlice } from "@reduxjs/toolkit";
import { Logon } from "services/sessionService";
import {
  GetLowFareAvailability,
  GetAvailabilityRequest,
  BookingSell,
  UpdatePassengers,
  UpdateContacts,
  AddPaymentToBooking,
  BookingCommit,
  GetBooking,
  GetSSRAvailabilityForBooking,
} from "services/bookingService";
import { notification } from "antd";

const initialState = {
  signature: null,
  sessionLoading: false,
  lowFareAvailabilityLoading: false,
  lowFareAvailabilityResponse: null,
  flightAvailabilityLoading: false,
  flightParams: null,
  availabilityResponse: null,
  sellFlightLoading: false,
  sellResponse: null,
  sellInfantLoading: false,
  sellInfantResponse: null,
  sessionPassengers: null,
  sessionInfants: null,
  sessionContact: null,
  sessionSegmentDetails: null,
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
  SSRAvailabilityLoading: false,
  SSRAvailabilityResponse: null,
  sellSSRLoading: false,
  sellSSRResponse: null,
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
    setSellFlightLoading: (state, { payload }) => {
      state.sellFlightLoading = payload;
    },
    setSellResponse: (state, { payload }) => {
      state.sellResponse = {
        ...payload,
      };
    },
    setSellInfantLoading: (state, { payload }) => {
      state.sellInfantLoading = payload;
    },
    setSellInfantResponse: (state, { payload }) => {
      state.sellInfantResponse = {
        ...payload,
      };
    },

    setSessionPassengers: (state, { payload }) => {
      state.sessionPassengers = [...payload];
    },

    setSessionInfants: (state, { payload }) => {
      state.sessionInfants = [...payload];
    },
    setSessionSegmentDetails: (state, { payload }) => {
      state.sessionSegmentDetails = payload;
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
  },
});

export const {
  saveClientSignature,
  setSessionLoading,
  setFlightParams,
  setFlightAvailabilityLoading,
  setAvailabilityResponse,
  setSellFlightLoading,
  setSellResponse,
  setSellInfantLoading,
  setSellInfantResponse,
  setSessionPassengers,
  setSessionInfants,
  setSessionContact,
  setSessionSegmentDetails,
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
  setLowFareAvailabilityLoading,
  setLowFareAvailabilityResponse,
  setSSRAvailabilityLoading,
  setSSRAvailabilityResponse,
  setSSRLoading,
  setSSRResponse,
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
  await dispatch(fetchFlightAvailability(payload));
};

export const fetchLowFareAvailability = (payload) => async (dispatch) => {
  dispatch(setLowFareAvailabilityLoading(true));

  const {
    departureStation,
    arrivalStation,
    beginDate,
    endDate,
    signature,
    promoCode,
  } = payload;

  const requestPayload = {
    signature: signature,
    messageContractVersion: "",
    enableExceptionStackTrace: true,
    contractVersion: 0,
    availabilityRequest: {
      departureStation: departureStation,
      arrivalStation: arrivalStation,
      beginDate: beginDate,
      beginDateSpecified: true,
      endDate: endDate,
      endDateSpecified: true,
      carrierCode: "Q9",
      flightNumber: "",
      flightType: 0,
      flightTypeSpecified: true,
      paxCount: 0,
      paxCountSpecified: true,
      dow: 0,
      dowSpecified: true,
      currencyCode: "string",
      displayCurrencyCode: "string",
      discountCode: "string",
      promotionCode: promoCode,
      availabilityType: 0,
      availabilityTypeSpecified: true,
      sourceOrganization: "string",
      maximumConnectingFlights: 0,
      maximumConnectingFlightsSpecified: true,
      availabilityFilter: 0,
      availabilityFilterSpecified: true,
      fareClassControl: 0,
      fareClassControlSpecified: true,
      minimumFarePrice: 0,
      minimumFarePriceSpecified: true,
      maximumFarePrice: 0,
      maximumFarePriceSpecified: true,
      productClassCode: "string",
      ssrCollectionsMode: 0,
      ssrCollectionsModeSpecified: true,
      inboundOutbound: 0,
      inboundOutboundSpecified: true,
      nightsStay: 0,
      nightsStaySpecified: true,
      includeAllotments: true,
      includeAllotmentsSpecified: true,
      beginTime: {
        totalMinutes: 0,
        totalMinutesSpecified: true,
      },
      endTime: {
        totalMinutes: 0,
        totalMinutesSpecified: true,
      },
      departureStations: ["string"],
      arrivalStations: ["string"],
      fareTypes: ["string"],
      productClasses: ["string"],
      fareClasses: ["string"],
      paxPriceTypes: [
        {
          paxType: "",
          paxDiscountCode: "",
          paxCount: 0,
          paxCountSpecified: true,
        },
      ],
      journeySortKeys: [0],
      travelClassCodes: [0],
      includeTaxesAndFees: true,
      includeTaxesAndFeesSpecified: true,
      fareRuleFilter: 0,
      fareRuleFilterSpecified: true,
      loyaltyFilter: 0,
      loyaltyFilterSpecified: true,
      paxResidentCountry: "string",
      travelClassCodeList: ["string"],
      systemCode: "string",
      currentSourceOrganization: "string",
      paxPriceDetailList: [
        {
          paxType: "string",
          paxDiscountCode: "string",
          dateOfBirth: "2022-08-16T03:50:30.607Z",
          dateOfBirthSpecified: true,
          nationality: "string",
          residentCountry: "string",
          programCode: "string",
          programLevel: "string",
        },
      ],
      serviceBundleControl: 0,
      serviceBundleControlSpecified: true,
      bookingStatus: 0,
      bookingStatusSpecified: true,
      baggagePricingSystemCode: "string",
      optimizationInputParameterList: [
        {
          code: "string",
          value: "string",
        },
      ],
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
    notification.error({
      message: "Error",
      description: "Fetch Flights failed",
    });
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

  const _segmentDetails = {
    flightDesignator: {
      carrierCode: "Q9",
      flightNumber: payload.segmentFlightNumber,
    },
    std: payload.segmentStd,
    departureStation: flightParams?.departureStation,
    arrivalStation: flightParams?.arrivalStation,
  };

  dispatch(setSessionSegmentDetails(_segmentDetails));

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
                      carrierCode: "Q9",
                      flightNumber: payload.segmentFlightNumber,
                      opSuffix: "",
                    },
                    std: payload.segmentStd,
                    stdSpecified: true,
                    departureStation: flightParams?.departureStation,
                    arrivalStation: flightParams?.arrivalStation,
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
              serviceBundleList: [""],
              applyServiceBundle: 0,
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
      } catch (err) {
        console.log("Sell Infant Request error", err.response);
      }
      dispatch(setSellInfantLoading(false));
    }
  } catch (err) {
    console.log("Sell Request error", err.response);
  }

  dispatch(setSellFlightLoading(false));
};

export const updateSinglePassenger =
  (payload) => async (dispatch, getState) => {
    dispatch(setUpdatePassengersLoading(true));
    const currentState = getState().session;

    const requestPayload = {
      header: {
        signature: currentState.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: false,
        contractVersion: 0,
      },
      updatePassengersRequestDto: {
        updatePassengerRequest: {
          updatePassengersRequestData: {
            passengers: [
              {
                state: 0,
                stateSpecified: true,
                customerNumber: "",
                passengerNumber: 0,
                passengerNumberSpecified: true,
                familyNumber: 0,
                familyNumberSpecified: true,
                paxDiscountCode: "",
                names: [
                  {
                    firstName: payload.firstName,
                    middleName: payload.firstName,
                    lastName: payload.lastName,
                    suffix: "",
                    title: payload.title,
                    state: 0,
                    stateSpecified: true,
                  },
                ],
                infant: {
                  dob: "2021-08-07",
                  dobSpecified: true,
                  gender: 0,
                  genderSpecified: true,
                  nationality: "",
                  residentCountry: "",
                  names: [
                    {
                      firstName: "green",
                      middleName: "green",
                      lastName: "green",
                      suffix: "",
                      title: "",
                      state: 0,
                      stateSpecified: true,
                    },
                  ],
                  paxType: "ADT",
                  state: 0,
                  stateSpecified: true,
                },
                passengerID: 0,
                passengerIDSpecified: true,
                passengerTypeInfos: [
                  {
                    state: 0,
                    stateSpecified: true,
                    dob: "1999-08-07",
                    dobSpecified: true,
                    paxType: "ADT",
                  },
                ],
                passengerInfos: [
                  {
                    state: 0,
                    stateSpecified: true,
                    balanceDue: 0,
                    balanceDueSpecified: true,
                    gender: 0,
                    genderSpecified: true,
                    nationality: "",
                    residentCountry: "",
                    totalCost: 0,
                    totalCostSpecified: true,
                    weightCategory: 0,
                    weightCategorySpecified: true,
                  },
                ],
                passengerInfants: [
                  {
                    dob: "2022-08-07T18:33:39.207Z",
                    dobSpecified: true,
                    gender: 0,
                    genderSpecified: true,
                    nationality: "",
                    residentCountry: "",
                    names: [
                      {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        suffix: "",
                        title: "",
                        state: 0,
                        stateSpecified: true,
                      },
                    ],
                    paxType: "ADT",
                    state: 0,
                    stateSpecified: true,
                  },
                ],
                pseudoPassenger: false,
                pseudoPassengerSpecified: true,
                passengerTypeInfo: {
                  state: 0,
                  stateSpecified: true,
                  dob: "1999-08-07",
                  dobSpecified: true,
                  paxType: "ADT",
                },
              },
            ],
            waiveNameChangeFee: false,
            waiveNameChangeFeeSpecified: true,
          },
        },
      },
    };

    try {
      const Response = await UpdatePassengers(requestPayload);
      await dispatch(setUpdatePassengersResponse(Response.data));
    } catch (err) {
      console.log("Update passenger Request error", err.response);
    }
    dispatch(setUpdatePassengersLoading(false));
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
              middleName: _passenger.firstName,
              lastName: _passenger.lastName,
              suffix: "",
              title: _passenger.title,
              state: 0,
            },
          ],
          passengerID: 0,
          pseudoPassenger: false,
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
                middleName: INFANT_TO_BE_ATTACHED.firstName,
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
              middleName: _passenger.firstName,
              lastName: _passenger.firstName,
              suffix: "",
              title: _passenger.title,
              state: 0,
            },
          ],
          passengerID: 0,
          pseudoPassenger: false,
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
    } catch (err) {
      console.log("Update passenger Request error", err.response);
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
                    middleName: payload.firstName,
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
    } catch (err) {
      console.log("Update passenger Request error", err.response);
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
    await dispatch(setPaymentBookingResponse(Response.data));
  } catch (err) {
    console.log("Payment Request error", err.response);
  }
  dispatch(setBookingCommitLoading(false));
};

export const GetBookingCommit = () => async (dispatch, getState) => {
  dispatch(setBookingCommitLoading(true));
  const currentState = getState().session;

  const requestPayload = {
    signature: currentState.signature,
    messageContractVersion: "",
    enableExceptionStackTrace: true,
    contractVersion: 0,
    bookingCommitRequestData: {
      state: 0,
      recordLocator: "",
      currencyCode: "",
      paxCount: 0,
      systemCode: "",
      bookingID: 0,
      bookingParentID: 0,
      parentRecordLocator: "",
      bookingChangeCode: "",
      groupName: "",
      bookingHold: {
        holdDateTime: "2022-08-18T04:16:16.411Z",
        holdDateTimeSpecified: true,
        state: 0,
        stateSpecified: true,
      },
      numericRecordLocator: "",
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
  } catch (err) {
    console.log("Update passenger Request error", err.response);
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
          // recordLocator:
          //   currentState?.bookingCommitResponse?.BookingUpdateResponseData
          //     ?.Success?.RecordLocator,
          recordLocator: currentPaymentState?.verifyPaymentResponse?.data?.pnr,
        },
      },
    },
  };
  try {
    const Response = await GetBooking(requestPayload);
    await dispatch(setBookingResponse(Response.data));
  } catch (err) {
    console.log("Update passenger Request error", err.response);
    notification.error({
      message: "Error",
      description: "Get Booking Details failed",
    });
  }
  dispatch(setBookingResponseLoading(false));
};

export const FetchSSRAvailabilityForBooking =
  () => async (dispatch, getState) => {
    dispatch(setSSRAvailabilityLoading(true));
    const currentState = getState().session;
    const flightParams = currentState.flightParams;

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
            segmentKeyList: [
              {
                carrierCode: "Q9",
                flightNumber:
                  currentState?.sessionSegmentDetails?.flightDesignator
                    .flightNumber,
                opSuffix: "",
                departureDate: flightParams?.beginDate,
                departureDateSpecified: true,
                departureStation: flightParams?.departureStation,
                arrivalStation: flightParams?.arrivalStation,
              },
            ],
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
      await dispatch(setSSRAvailabilityResponse(SSRAvailabilityResponse.data));
    } catch (err) {
      console.log("SSRAvailability Request error", err.response);
      notification.error({
        message: "Error",
        description: "Fetch SSR  failed",
      });
    }

    dispatch(setSSRAvailabilityLoading(false));
  };

export const SellSSROption = (payload) => async (dispatch, getState) => {
  dispatch(setSSRLoading(true));
  const currentState = getState().session;

  const _paxSSRs = [];
  payload.map((_item) => {
    const newObj = {
      state: 0,
      stateSpecified: true,
      actionStatusCode: "NN",
      arrivalStation: currentState?.sessionSegmentDetails?.arrivalStation,
      departureStation: currentState?.sessionSegmentDetails?.departureStation,
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
    _paxSSRs.push(newObj);
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
              segmentSSRRequests: [
                {
                  flightDesignator: {
                    carrierCode: "Q9",
                    flightNumber:
                      currentState?.sessionSegmentDetails?.flightDesignator
                        .flightNumber,
                    opSuffix: "",
                  },
                  std: currentState?.sessionSegmentDetails?.std,
                  stdSpecified: true,
                  departureStation:
                    currentState?.sessionSegmentDetails?.departureStation,
                  arrivalStation:
                    currentState?.sessionSegmentDetails?.arrivalStation,
                  paxSSRs: [..._paxSSRs],
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

  try {
    const SSRResponse = await BookingSell(requestPayload);
    await dispatch(setSSRResponse(SSRResponse.data));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Sell SSR failed",
    });
  }

  dispatch(setSSRLoading(false));
};
