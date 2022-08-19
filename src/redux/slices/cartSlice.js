import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const calcTotalPrice = (arr, init) => {
  return arr.reduce((sum, obj) => {
    return Math.floor((obj.price * obj?.count + sum) * 100) / 100;
  }, init);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items, initialState.totalPrice);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        let counter = findItem.count - 1;
        if (counter <= 1) {
          findItem.count = 1;
        }
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items, initialState.totalPrice);
    },
    clearItems(state) {
      state.items = initialState.items;
      state.totalPrice = initialState.totalPrice;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
