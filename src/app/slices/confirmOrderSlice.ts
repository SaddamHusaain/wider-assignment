import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: false
}

const confirmOrderSlice = createSlice({
  name: "confirmOrder",
  initialState,
  reducers: {
      setDrawer: (state, { payload }) => {
          state.drawer = payload;
      }
  }
})

export const { setDrawer } = confirmOrderSlice.actions;
export default confirmOrderSlice.reducer;