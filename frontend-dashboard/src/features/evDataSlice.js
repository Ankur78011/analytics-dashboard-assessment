import { createSlice } from '@reduxjs/toolkit';

export const evDataSlice = createSlice({
  name: 'evData',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setEvData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEvData, setLoading, setError } = evDataSlice.actions;

export default evDataSlice.reducer;
