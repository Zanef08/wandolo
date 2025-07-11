import { Link } from "react-router-dom"
import { Clock, Users, Star, MapPin, Eye } from "lucide-react"
import styles from "./TourCard.module.scss"

const TourCard = ({ tour }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Dễ":
        return "green"
      case "Trung bình":
        return "orange"
      case "Khó":
        return "red"
      default:
        return "gray"
    }
  }

  return (
    <div className={styles.tourCard}>
      <div className={styles.imageContainer}>
        <img src={tour.image || "/placeholder.svg"} alt={tour.title} className={styles.tourImage} />
        <div className={`${styles.difficultyBadge} ${styles[getDifficultyColor(tour.difficulty)]}`}>
          {tour.difficulty}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.tourTitle}>{tour.title}</h3>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{tour.location}</span>
          </div>
        </div>

        <p className={styles.description}>{tour.description}</p>

        <div className={styles.tourMeta}>
          <div className={styles.metaItem}>
            <Clock size={16} />
            <span>{tour.duration}</span>
          </div>
          <div className={styles.metaItem}>
            <Users size={16} />
            <span>Tối đa 8 người</span>
          </div>
          <div className={styles.metaItem}>
            <Star size={16} />
            <span>4.8 (24 đánh giá)</span>
          </div>
        </div>

        <div className={styles.highlights}>
          {tour.highlights.slice(0, 2).map((highlight, index) => (
            <span key={index} className={styles.highlight}>
              {highlight}
            </span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.pricing}>
            <span className={styles.priceLabel}>Từ</span>
            <span className={styles.price}>{formatPrice(tour.price)}</span>
            <span className={styles.priceUnit}>/người</span>
          </div>
          <Link to={`/tours/${tour.id}`} className={styles.viewButton}>
            <Eye size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TourCard
