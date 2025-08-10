import { createSlice } from "@reduxjs/toolkit"
import { clearCurrentBooking } from "./bookingSlice"

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      // Store in localStorage
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
    },

    // Register actions
    registerStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      // Store in localStorage
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    registerFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // Logout action
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      state.isLoading = false
      // Remove from localStorage
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      // Clear all user-related data
      localStorage.removeItem("wandolo_discount_code")
      localStorage.removeItem("show_discount_popup")
      localStorage.removeItem("booking_data")
      localStorage.removeItem("user_preferences")
      // Clear any form data that might be cached
      sessionStorage.clear()
      // Clear any other cached data
      localStorage.removeItem("current_booking")
      localStorage.removeItem("booking_history")
      localStorage.removeItem("user_settings")
      localStorage.removeItem("recent_searches")
      localStorage.removeItem("favorites")
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },

    // Initialize auth from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user")
      
      if (token && user) {
        try {
          state.isAuthenticated = true
          state.token = token
          state.user = JSON.parse(user)
        } catch (error) {
          // If parsing fails, clear localStorage
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
    },

    // Update user profile
    updateUserStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false
      state.user = { ...state.user, ...action.payload }
      state.error = null
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  initializeAuth,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = authSlice.actions

// Async action creators (thunks)
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock login - check against stored users or use demo credentials
    const storedUsers = JSON.parse(localStorage.getItem("wandolo_users") || "[]")
    const user = storedUsers.find(u => u.email === credentials.email && u.password === credentials.password)
    
    // Demo credentials for testing
    if (!user && !(credentials.email === "demo@wandolo.com" && credentials.password === "123456")) {
      throw new Error("Email hoặc mật khẩu không đúng")
    }
    
    const userData = user || {
      id: "demo-user",
      fullName: "Demo User",
      email: "demo@wandolo.com",
      phone: "0123456789",
      avatar: "https://ui-avatars.com/api/?name=Demo+User&background=4F46E5&color=fff"
    }
    
    const token = "mock-jwt-token-" + Date.now()
    
    dispatch(loginSuccess({
      user: userData,
      token: token
    }))
    
    return { success: true }
  } catch (error) {
    dispatch(loginFailure(error.message))
    return { success: false, error: error.message }
  }
}

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart())
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem("wandolo_users") || "[]")
    const existingUser = storedUsers.find(u => u.email === userData.email)
    
    if (existingUser) {
      throw new Error("Email đã được sử dụng")
    }
    
    // Create new user
    const newUser = {
      id: "user-" + Date.now(),
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // In real app, this would be hashed
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName)}&background=4F46E5&color=fff`,
      createdAt: new Date().toISOString()
    }
    
    // Store user
    storedUsers.push(newUser)
    localStorage.setItem("wandolo_users", JSON.stringify(storedUsers))
    
    const token = "mock-jwt-token-" + Date.now()
    
    // Remove password from user data before storing in state
    const { password, ...userWithoutPassword } = newUser
    
    dispatch(registerSuccess({
      user: userWithoutPassword,
      token: token
    }))
    
    return { success: true }
  } catch (error) {
    dispatch(registerFailure(error.message))
    return { success: false, error: error.message }
  }
}

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  dispatch(updateUserStart())
  
  try {
    const { token } = getState().auth
    
    // TODO: Replace with actual API call
    const response = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
    
    if (!response.ok) {
      throw new Error("Profile update failed")
    }
    
    const data = await response.json()
    dispatch(updateUserSuccess(data))
    
    return { success: true }
  } catch (error) {
    dispatch(updateUserFailure(error.message))
    return { success: false, error: error.message }
  }
}

// Enhanced logout action that clears all related state
export const logoutUser = () => async (dispatch) => {
  // Clear booking state
  dispatch(clearCurrentBooking())
  
  // Clear auth state and localStorage
  dispatch(logout())
}

// Selectors
export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.isLoading
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
