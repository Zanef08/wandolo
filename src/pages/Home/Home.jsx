import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Hero from "../../components/Hero/Hero"
import FeaturedTours from "../../components/FeaturedTours/FeaturedTours"
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs"
import Testimonials from "../../components/Testimonials/Testimonials"
import CallToAction from "../../components/CallToAction/CallToAction"
import DiscountPopup from "../../components/DiscountPopup/DiscountPopup"
import { getStoredDiscountCode } from "../../utils/discountUtils"

const Home = () => {
  const [showDiscountPopup, setShowDiscountPopup] = useState(false)
  const [discountData, setDiscountData] = useState(null)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    // Check if we should show discount popup
    const shouldShowPopup = localStorage.getItem('show_discount_popup')
    if (shouldShowPopup === 'true') {
      const storedDiscount = getStoredDiscountCode()
      if (storedDiscount) {
        setDiscountData(storedDiscount)
        setShowDiscountPopup(true)
        // Remove the flag so popup doesn't show again
        localStorage.removeItem('show_discount_popup')
      }
    }
  }, [])

  // Clear discount popup when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setShowDiscountPopup(false)
      setDiscountData(null)
    }
  }, [isAuthenticated])

  const handleClosePopup = () => {
    setShowDiscountPopup(false)
  }

  return (
    <div>
      <Hero />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      
      {discountData && (
        <DiscountPopup
          isOpen={showDiscountPopup}
          onClose={handleClosePopup}
          discountCode={discountData.code}
          discountPercent={discountData.percentage}
        />
      )}
    </div>
  )
}

export default Home
