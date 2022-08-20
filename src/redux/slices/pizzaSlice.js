import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: {
    loading: true,
    error: false,
  },
};

export const fetchPizzas = createAsyncThunk(
  'fetchItems',
  async ({ currentPage, category, sortPlaceholder, order }) => {
    const response = await axios.get(
      `https://62f273e3b1098f1508132820.mockapi.io/items?page=${currentPage}&limit=4${category}${sortPlaceholder}${order}`,
    );
    return response.data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status.loading = true;
      state.items = initialState.items;
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status.loading = false;
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status.loading = false;
      state.status.error = true;
      state.items = initialState.items;
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
