import { createSlice } from "@reduxjs/toolkit";
import {
  GetPaymentGateways,
  InitializePayment,
  VerifyPayment,
} from "services/paymentService";
import { notification } from "antd";

const initialState = {
  gatewaysLoading: false,
  gatewaysResponse: null,
  paymentLoading: false,
  paymentResponse: null,
  verifyPaymentLoading: false,
  verifyPaymentResponse: null,
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
  },
});

export const {
  setGatewaysLoading,
  setGatewaysResponse,
  setPaymentLoading,
  setPaymentResponse,
  setVerifyPaymentLoading,
  setVerifyPaymentResponse,
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
