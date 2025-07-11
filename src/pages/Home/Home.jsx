import Hero from "../../components/Hero/Hero"
import FeaturedTours from "../../components/FeaturedTours/FeaturedTours"
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs"
import Testimonials from "../../components/Testimonials/Testimonials"
import CallToAction from "../../components/CallToAction/CallToAction"

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  )
}

export default Home
