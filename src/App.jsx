import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeAuth } from "./store/slices/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import AuthLayout from "./components/AuthLayout/AuthLayout"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import AIChat from "./components/AIChat/AIChat"
import AIChatButton from "./components/AIChatButton/AIChatButton"
import Home from "./pages/Home/Home"
import Tours from "./pages/Tours/Tours"
import TourDetail from "./pages/TourDetail/TourDetail"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Booking from "./pages/Booking/Booking"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import VerifyCode from "./pages/VerifyCode/VerifyCode"
import ResetPassword from "./pages/ResetPassword/ResetPassword"

function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])
  
  // Check if current route is an auth page
  const authRoutes = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password']
  const isAuthPage = authRoutes.includes(location.pathname)

  if (isAuthPage) {
    return (
      <AuthLayout>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthLayout>
    )
  }

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className="main-content" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking/:tourId" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
      <AIChatButton />
      <AIChat />
    </div>
  )
}

export default App
