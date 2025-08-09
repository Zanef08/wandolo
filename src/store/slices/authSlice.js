import { createSlice } from "@reduxjs/toolkit"

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
    // TODO: Replace with actual API call
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    
    if (!response.ok) {
      throw new Error("Login failed")
    }
    
    const data = await response.json()
    dispatch(loginSuccess(data))
    
    return { success: true }
  } catch (error) {
    dispatch(loginFailure(error.message))
    return { success: false, error: error.message }
  }
}

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart())
  
  try {
    // TODO: Replace with actual API call
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    
    if (!response.ok) {
      throw new Error("Registration failed")
    }
    
    const data = await response.json()
    dispatch(registerSuccess(data))
    
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

// Selectors
export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.isLoading
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
