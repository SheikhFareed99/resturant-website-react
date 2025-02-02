import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addItemToBag: (state, action) => {
      console.log(action.payload);
      state.items.push(action.payload);
    },
    removeItemFromBag: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice.reducer;