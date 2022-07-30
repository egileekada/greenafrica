import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  flightName: "greenAfrica",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      state.value = payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterSelector = (state) => state.counter;
export default counterSlice.reducer;

/** Actions */

export const _increment = () => async (dispatch, getState) => {
  const currentState = getState().counter;
  const _newValue = currentState.value + 1;
  dispatch(increment(_newValue));
};

export const _incrementValue = (payload) => async (dispatch) => {
  //   dispatch(setLoading(true));
  dispatch(createBusinessFailed(message));
  //   dispatch(setLoading(false));
};
