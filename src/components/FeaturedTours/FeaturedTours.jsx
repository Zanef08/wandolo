import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import TourCard from "../TourCard/TourCard.jsx"
import styles from "./FeaturedTours.module.scss"

const FeaturedTours = () => {
  const { tours } = useSelector((state) => state.tours)
  const featuredTours = tours.slice(0, 3)

  return (
    <section className={`${styles.featuredTours} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Tours nổi bật</h2>
          <p>Khám phá những hành trình mạo hiểm độc đáo tại Tây Nguyên</p>
        </div>

        <div className={styles.toursGrid}>
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <Link to="/tours" className="btn secondary">
            Xem tất cả Tours
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedTours
