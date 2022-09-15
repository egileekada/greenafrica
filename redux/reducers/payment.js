import { createSlice } from "@reduxjs/toolkit";
import {
  GetPaymentGateways,
  InitializePayment,
  VerifyPayment,
} from "services/paymentService";
import { notification } from "antd";
import { PURGE } from "redux-persist";
import { setTripModified } from "./booking";

const initialState = {
  gatewaysLoading: false,
  gatewaysResponse: null,
  paymentLoading: false,
  paymentResponse: null,
  verifyPaymentLoading: false,
  verifyPaymentResponse: null,
  verifyManageBookingLoading: false,
  verifyManageBookingResponse: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setGatewaysLoading: (state, { payload }) => {
      state.gatewaysLoading = payload;
    },
    setGatewaysResponse: (state, { payload }) => {
      state.gatewaysResponse = payload;
    },
    setPaymentLoading: (state, { payload }) => {
      state.paymentLoading = payload;
    },
    setPaymentResponse: (state, { payload }) => {
      state.paymentResponse = payload;
    },
    setVerifyPaymentLoading: (state, { payload }) => {
      state.verifyPaymentLoading = payload;
    },
    setVerifyPaymentResponse: (state, { payload }) => {
      state.verifyPaymentResponse = payload;
    },

    setVerifyManageBookingLoading: (state, { payload }) => {
      state.verifyManageBookingLoading = payload;
    },
    setVerifyManageBookingResponse: (state, { payload }) => {
      state.verifyManageBookingResponse = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState); // THIS LINE
  },
});

export const {
  setGatewaysLoading,
  setGatewaysResponse,
  setPaymentLoading,
  setPaymentResponse,
  setVerifyPaymentLoading,
  setVerifyPaymentResponse,
  setVerifyManageBookingLoading,
  setVerifyManageBookingResponse,
} = paymentSlice.actions;
export const paymentSelector = (state) => state.payment;
export default paymentSlice.reducer;

export const FetchPaymentGateways = () => async (dispatch) => {
  dispatch(setGatewaysLoading(true));

  try {
    const Response = await GetPaymentGateways();
    await dispatch(setGatewaysResponse(Response.data));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Getting payment gateways failed",
    });
  }

  dispatch(setGatewaysLoading(false));
};

export const InitializeGatewayPayment = (payload) => async (dispatch) => {
  dispatch(setPaymentLoading(true));

  try {
    const Response = await InitializePayment(payload);
    await dispatch(setPaymentResponse(Response.data));
    window.location.assign(Response?.data?.data?.payment_url);
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Initialize payment failed",
    });
  }

  dispatch(setPaymentLoading(false));
};

export const VerifyGatewayPayment = (payload) => async (dispatch) => {
  dispatch(setVerifyPaymentLoading(true));

  try {
    const Response = await VerifyPayment(payload.ref);
    await dispatch(setVerifyPaymentResponse(Response.data));
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Verify Payment Failed",
    });
  }

  dispatch(setVerifyPaymentLoading(false));
};

export const VerifyManageBookingPayment = (payload) => async (dispatch) => {
  dispatch(setVerifyManageBookingLoading(true));

  try {
    const Response = await VerifyPayment(payload.ref);
    dispatch(setTripModified(true));
    if (Response?.data?.data?.pnr) {
      window.location.assign(`/bookings?pnr=${Response?.data?.data?.pnr}`);
    }
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Verify Manage Booking Payment Failed",
    });
  }

  dispatch(setVerifyManageBookingLoading(false));
};
