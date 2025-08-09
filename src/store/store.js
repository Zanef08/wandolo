import { configureStore } from "@reduxjs/toolkit"
import toursReducer from "./slices/toursSlice"
import bookingReducer from "./slices/bookingSlice"
import uiReducer from "./slices/uiSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    tours: toursReducer,
    booking: bookingReducer,
    ui: uiReducer,
    auth: authReducer,
  },
})
