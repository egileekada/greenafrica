import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  widgetVisible: false,
  promoWidgetVisible: false,
  sign: "ghh",
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
    setPromoWidgetVisible: (state, { payload }) => {
      state.promoWidgetVisible = payload;
    },
  },
});

export const { showWidget, hideWidget, setPromoWidgetVisible } =
  generalSlice.actions;
export const generalSelector = (state) => state.general;
export default generalSlice.reducer;
