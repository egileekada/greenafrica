import { createSlice } from "@reduxjs/toolkit";
import {
  GetLowFareAvailability,
  GetAvailabilityRequest,
} from "services/bookingService";
import { notification } from "antd";
import { setPromoWidgetVisible } from "./general";

import {
  bookingResponseMultiple,
  bookingResponse,
  SSRAvailabilityResponse,
  sessionSSRs,
  sessionPassengers,
  manageRequest,
  _sessionState,
  bookingNew,
} from "./data";

const initialState = {
  flightParams: null,
  flightAvailabilityLoading: false,
  availabilityResponse: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
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
  },
});

export const {
  setFlightParams,
  setFlightAvailabilityLoading,
  setAvailabilityResponse,
} = bookingSlice.actions;
export const bookingSelector = (state) => state.booking;
export default bookingSlice.reducer;

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
    isRoundTrip,
    totalPaxCount,
  } = payload;

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
    notification.error({
      message: "Error",
      description: "Fetch Flights failed",
    });
    console.log("er", err.response);
  }
  dispatch(setFlightAvailabilityLoading(false));
};
