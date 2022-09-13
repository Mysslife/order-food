import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalAll: 0,
  },
  reducers: {
    addNewProduct: (state, action) => {
      state.products.push(action.payload);
      state.totalAll += action.payload.totalOneOrder * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.totalAll = 0;
    },
  },
});

export const { addNewProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
