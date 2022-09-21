import { createSlice } from "@reduxjs/toolkit";

export interface product {
  image: string;
  name: string;
  description: string;
  SKU: string;
  quantity: number;
  price: number;
}

const initialState: product[] = [
  {
    image:
      "https://www.mashed.com/img/gallery/doing-this-could-make-you-actually-like-drinking-black-coffee/intro-1641943654.jpg",
    name: "Black Coffee",
    description:
      "Coffee is a drink prepared from roasted coffee beans made from seeds of Coffea plant species.",
    SKU: "Z45EFH22J8",
    quantity: 23,
    price: 200,
  },
  {
    image:
      "https://cdn2.foodviva.com/static-content/food-images/tea-recipes/milk-tea-recipe/milk-tea-recipe.jpg",
    name: "Tea",
    description:
      "Tea is an aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to East Asia.",
    SKU: "UED453S564",
    quantity: 12,
    price: 34,
  },
];

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.push(payload);
    },
    editProduct: (state, { payload }) => {
      const objIndex = state.findIndex((value) => value.SKU === payload.SKU);
      if (objIndex === -1) return;
      const updatedObj = { ...state[objIndex], ...payload };
      state.splice(objIndex, 1, updatedObj);
    },
    decreseQuantityInInventory: (state, { payload }) => {
      payload.map((data: any) => {
        const objIndex = state.findIndex((value) => value.SKU === data.sku);
        if (objIndex === -1) return null;
        const updatedObj = {
          ...state[objIndex],
          quantity: state[objIndex].quantity - data.quantity,
        };
        state.splice(objIndex, 1, updatedObj);
        return null;
      });
    },
  },
});

// const products = (state: {state: []}) => state?.inventory;
export const { addProduct, editProduct, decreseQuantityInInventory } =
  inventorySlice.actions;
export default inventorySlice.reducer;
