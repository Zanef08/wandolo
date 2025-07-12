import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import Home from "./pages/Home/Home"
import Tours from "./pages/Tours/Tours"
import TourDetail from "./pages/TourDetail/TourDetail"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Booking from "./pages/Booking/Booking"

function App() {
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
    </div>
  )
}

export default App
