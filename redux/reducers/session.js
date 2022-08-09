import { createSlice } from "@reduxjs/toolkit";
import { Logon } from "services/sessionService";
import { notification } from "antd";

const initialState = {
  signature: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    showWidget: (state) => {
      state.widgetVisible = true;
    },
    hideWidget: (state) => {
      state.widgetVisible = false;
    },
  },
});

export const { showWidget, hideWidget } = sessionSlice.actions;
export const sessionSelector = (state) => state.session;
export default sessionSlice.reducer;

export const startSession = () => async (dispatch) => {
  // dispatch(setLoading(true));

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
    console.log("sneding see", payload);
    const sessionCredentials = await Logon(payload);
    console.log(sessionCredentials);
  } catch (err) {
    console.log("err", err);
    console.log("err.response", err.response);

    notification.error({
      message: "Error",
      description: "Agent Registration failed",
    });
  }

  // dispatch(setLoading(false));
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
    console.log(sessionCredentials);
  } catch (err) {
    notification.error({
      message: "Error",
      description: "Agent Registration failed",
    });
  }

  dispatch(setLoading(false));
};
