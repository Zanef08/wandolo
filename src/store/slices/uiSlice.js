import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mobileMenuOpen: false,
  chatbotOpen: false,
  notifications: [],
  theme: "light",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false
    },
    toggleChatbot: (state) => {
      state.chatbotOpen = !state.chatbotOpen
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const { toggleMobileMenu, closeMobileMenu, toggleChatbot, addNotification, removeNotification } = uiSlice.actions
export default uiSlice.reducer
