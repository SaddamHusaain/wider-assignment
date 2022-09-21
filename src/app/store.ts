import { configureStore } from "@reduxjs/toolkit";
import confirmOrderSlice from "./slices/confirmOrderSlice";
import currentOrdersSlice from "./slices/currentOrdersSlice";
import inventory from "./slices/inventory";
import ordersSlice from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    inventory: inventory,
    currentOrders: currentOrdersSlice,
    order: ordersSlice,
    confirmOrder: confirmOrderSlice
  },
})

export default store;