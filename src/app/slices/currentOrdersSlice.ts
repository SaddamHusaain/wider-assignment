import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const currentOrdersSlice = createSlice({
  name: "currentOrders",
  initialState,
  reducers: {
    curentOrders: (state, { payload }) => {
      state.push(payload);
    },
    decreaseQuantity: (state, { payload }) => {
      state[payload.index] = payload.data;
    },
    increaseQuantity: (state, { payload }) => {
      state[payload.index] = payload.data;
    },
    deleteOrder: (state, { payload }) => {
      state.splice(payload, 1);
    },
    reset: () => initialState,
  },
});

export const {
  curentOrders,
  decreaseQuantity,
  increaseQuantity,
  deleteOrder,
  reset,
} = currentOrdersSlice.actions;
export default currentOrdersSlice.reducer;
