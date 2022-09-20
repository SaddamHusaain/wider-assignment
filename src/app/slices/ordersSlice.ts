import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orders: (state, { payload }) => {
      state.push(...payload);
    },
  },
});

export const { orders } = ordersSlice.actions;
export default ordersSlice.reducer;
