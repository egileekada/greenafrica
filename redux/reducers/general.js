import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgetVisible: false,
};

export const generalSlice = createSlice({
  name: "general",
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

export const { showWidget, hideWidget } = generalSlice.actions;
export const generalSelector = (state) => state.general;
export default generalSlice.reducer;
