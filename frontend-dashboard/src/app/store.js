import { configureStore } from '@reduxjs/toolkit'
import evDataReducer from '../features/evDataSlice'

export const store = configureStore({
reducer: {
    evData: evDataReducer,
  },
})