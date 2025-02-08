import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  city: string;
}

const initialState: SearchState = {
  city: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    }
  },
});

export const { setCity } = searchSlice.actions;
export default searchSlice.reducer;