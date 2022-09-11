import { createSlice } from "@reduxjs/toolkit";
import {
  GetLowFareAvailability,
  GetAvailability,
} from "services/bookingService";
import { notification } from "antd";
import { setPromoWidgetVisible } from "./general";
import { PURGE } from "redux-persist";

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
} = bookingSlice.actions;
export const bookingSelector = (state) => state.booking;
export default bookingSlice.reducer;

export const saveTripParams = (payload) => async (dispatch) => {
  dispatch(setTripParams(payload));
};

export const saveReturnParams = (payload) => async (dispatch) => {
  dispatch(setReturnParams(payload));
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

export const returnLowFareAvailability = (payload) => async (dispatch) => {
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
        beginDate: returnPayload?.beginDate,
        beginDateSpecified: true,
        endDate: returnPayload?.endDate,
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
      console.log(
        "availabulty Res",
        availabilityResponse?.GetTripAvailabilityResponse
      );
      await dispatch(
        setManageFlightAvailabilityResponse(
          availabilityResponse?.GetTripAvailabilityResponse
        )
      );
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
    dispatch(setManageFlightAvailabilityLoading(false));
  };
