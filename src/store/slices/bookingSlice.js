import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentBooking: {
    tourId: null,
    participants: 1,
    selectedDate: "",
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      emergencyContact: "",
      specialRequests: "",
    },
    addOns: {
      insurance: false,
      equipment: false,
      photography: false,
    },
  },
  bookingHistory: [],
  loading: false,
  error: null,
}

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = { ...state.currentBooking, ...action.payload }
    },
    setCustomerInfo: (state, action) => {
      state.currentBooking.customerInfo = { ...state.currentBooking.customerInfo, ...action.payload }
    },
    setAddOns: (state, action) => {
      state.currentBooking.addOns = { ...state.currentBooking.addOns, ...action.payload }
    },
    addToBookingHistory: (state, action) => {
      state.bookingHistory.push(action.payload)
    },
    addCurrentBookingToHistory: (state) => {
      if (state.currentBooking.tourId) {
        const bookingToAdd = {
          ...state.currentBooking,
          id: `BK${Date.now()}`,
          bookingDate: new Date().toISOString().split('T')[0],
          departureDate: state.currentBooking.selectedDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now if no date selected
          status: 'confirmed'
        }
        state.bookingHistory.push(bookingToAdd)
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = initialState.currentBooking
    },
  },
})

export const { setCurrentBooking, setCustomerInfo, setAddOns, addToBookingHistory, addCurrentBookingToHistory, clearCurrentBooking } =
  bookingSlice.actions
export default bookingSlice.reducer
