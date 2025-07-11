import { Link } from "react-router-dom"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import styles from "./CallToAction.module.scss"

const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBackground}>
        <img src="https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto" alt="Adventure Background" className={styles.ctaImage} />
        <div className={styles.ctaOverlay}></div>
      </div>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Sẵn sàng cho cuộc phiêu lưu tiếp theo?</h2>
          <p>
            Đừng để những trải nghiệm tuyệt vời chỉ là ước mơ. Hãy bắt đầu hành trình khám phá Tây Nguyên cùng Wandolo
            ngay hôm nay!
          </p>
          <div className={styles.ctaActions}>
            <Link to="/tours" className="btn primary">
              Khám phá Tours
              <ArrowRight size={22} />
            </Link>
            <a href="tel:+84123456789" className="btn secondary">
              <Phone size={22} />
              Gọi ngay
            </a>
            <button className="btn chat">
              <MessageCircle size={22} />
              Chat tư vấn
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
