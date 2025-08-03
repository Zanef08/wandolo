import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <Link to="/" className={styles.footerLogo}>
              <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
              <span>WANDOLO</span>
            </Link>
            <p className={styles.tagline}>"Wander no Wondering" - Lang thang khám phá mà không lo âu</p>
            <p className={styles.description}>
              Wandolo mang đến những hành trình du lịch mạo hiểm an toàn, kết nối sâu sắc với văn hóa bản địa Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4>Liên kết nhanh</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/tours">Tours trekking</Link>
              </li>
              <li>
                <Link to="/about">Về chúng tôi</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
              <li>
                <Link to="/safety">An toàn</Link>
              </li>
              <li>
                <Link to="/guides">Hướng dẫn viên</Link>
              </li>
            </ul>
          </div>

          {/* Tours */}
          <div className={styles.footerSection}>
            <h4>Tours phổ biến</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/tours/1">Hồn Churu giữa Đại Ngàn</Link>
              </li>
              <li>
                <Link to="/tours/2">Viên Ngọc Ẩn giữa Cao Nguyên</Link>
              </li>
              <li>
                <Link to="/tours/3">B'Lao The Tea Hill</Link>
              </li>
              <li>
                <Link to="/tours/4">Dấu Chân Trên Rừng Voi</Link>
              </li>
              <li>
                <Link to="/tours/5">Lời Gọi Núi Thiêng</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4>Liên hệ</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>G Office - Saigon Mall (Cao Thắng Mall), 82 Cao Thắng, Phường 2, Quận 3, TP.HCM</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>0123 456 789</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>hello@wandolo.vn</span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; 2025 Wandolo Co., Ltd. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className={styles.legalLinks}>
            <Link to="/privacy">Chính sách bảo mật</Link>
            <Link to="/terms">Điều khoản sử dụng</Link>
            <Link to="/cookies">Chính sách Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
