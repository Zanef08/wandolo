import { Link } from "react-router-dom"
import { ArrowRight, Play, Shield, Users, Award } from "lucide-react"
import styles from "./Hero.module.scss"

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img src="https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto" alt="Tây Nguyên Adventure" className={styles.heroImage} />
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroTextBlock}>
          <h1 className={styles.heroTitle}>
            An toàn <span className={styles.highlight}>bức phá</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Khám phá Tây Nguyên qua những hành trình mạo hiểm an toàn, kết nối sâu sắc với văn hóa bản địa
          </p>
          <p className={styles.heroTagline}>
            "Wander no Wondering" - Lang thang khám phá mà không lo âu
          </p>
          <div className={styles.heroActions}>
            <Link to="/tours" className={styles.ctaButton}>
              Khám phá Tours
              <ArrowRight size={22} />
            </Link>
            <button className={styles.playCircle} aria-label="Xem video">
              <Play size={28} />
            </button>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <Shield className={styles.statIcon} />
            <div>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>An toàn</div>
            </div>
          </div>
          <div className={styles.statItem}>
            <Users className={styles.statIcon} />
            <div>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Khách hàng</div>
            </div>
          </div>
          <div className={styles.statItem}>
            <Award className={styles.statIcon} />
            <div>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Tours độc đáo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
