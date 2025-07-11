"use client"

import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  MapPin,
  Clock,
  Users,
  Star,
  Shield,
  Heart,
  Camera,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Phone,
  MessageCircle,
} from "lucide-react"
import styles from "./TourDetail.module.scss"

const TourDetail = () => {
  const { id } = useParams()
  const { tours } = useSelector((state) => state.tours)
  const tour = tours.find((t) => t.id === Number.parseInt(id))

  if (!tour) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Tour không tìm thấy</h1>
          <Link to="/tours" className="btn primary">
            Quay lại danh sách tours
          </Link>
        </div>
      </div>
    )
  }

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

  const galleryImages = [
    "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
    "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
    "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
    "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
  ]

  return (
    <div className={styles.tourDetail}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/tours" className={styles.backLink}>
            <ArrowLeft size={20} />
            Quay lại Tours
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.tourHero}>
        <div className={styles.heroBackground}>
          <img src={tour.image || "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"} alt={tour.title} className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.tourBadges}>
              <span className={`${styles.difficultyBadge} ${styles[getDifficultyColor(tour.difficulty)]}`}>
                {tour.difficulty}
              </span>
              <span className={styles.categoryBadge}>Soft Adventure</span>
            </div>
            <h1>{tour.title}</h1>
            <div className={styles.tourMeta}>
              <div className={styles.metaItem}>
                <MapPin size={20} />
                <span>{tour.location}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={20} />
                <span>{tour.duration}</span>
              </div>
              <div className={styles.metaItem}>
                <Users size={20} />
                <span>Tối đa 8 người</span>
              </div>
              <div className={styles.metaItem}>
                <Star size={20} />
                <span>4.8 (24 đánh giá)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.tourContent}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Description */}
            <section className={styles.section}>
              <h2>Giới thiệu tour</h2>
              <p className={styles.description}>{tour.description}</p>
            </section>

            {/* Highlights */}
            <section className={styles.section}>
              <h2>Điểm nổi bật</h2>
              <div className={styles.highlights}>
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className={styles.highlightItem}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className={styles.section}>
              <h2>Lịch trình chi tiết</h2>
              <div className={styles.itinerary}>
                <div className={styles.itineraryDay}>
                  <h3>Ngày 1: Khởi hành và khám phá</h3>
                  <ul>
                    <li>06:00 - Tập trung tại điểm hẹn, khởi hành</li>
                    <li>09:00 - Đến điểm đến, gặp gỡ hướng dẫn viên địa phương</li>
                    <li>10:00 - Bắt đầu hành trình trekking</li>
                    <li>12:00 - Nghỉ trưa và thưởng thức ẩm thực địa phương</li>
                    <li>14:00 - Tiếp tục khám phá và trải nghiệm văn hóa</li>
                    <li>18:00 - Check-in homestay/cắm trại</li>
                    <li>19:30 - Bữa tối và giao lưu văn nghệ</li>
                  </ul>
                </div>
                {tour.duration.includes("3 ngày") && (
                  <>
                    <div className={styles.itineraryDay}>
                      <h3>Ngày 2: Thử thách và khám phá sâu</h3>
                      <ul>
                        <li>06:00 - Thức dậy, ngắm bình minh</li>
                        <li>07:00 - Ăn sáng và chuẩn bị</li>
                        <li>08:00 - Trekking đến điểm cao nhất</li>
                        <li>12:00 - Picnic trên đỉnh núi</li>
                        <li>14:00 - Khám phá hang động/thác nước</li>
                        <li>17:00 - Trở về camp, nghỉ ngơi</li>
                        <li>19:00 - Bữa tối và đốt lửa trại</li>
                      </ul>
                    </div>
                    <div className={styles.itineraryDay}>
                      <h3>Ngày 3: Hoàn thành hành trình</h3>
                      <ul>
                        <li>07:00 - Ăn sáng và dọn dẹp</li>
                        <li>08:30 - Trekking trở về</li>
                        <li>11:00 - Thăm làng nghề địa phương</li>
                        <li>12:30 - Bữa trưa chia tay</li>
                        <li>14:00 - Khởi hành về điểm ban đầu</li>
                        <li>17:00 - Kết thúc hành trình</li>
                      </ul>
                    </div>
                  </>
                )}
                {tour.duration.includes("2 ngày") && (
                  <div className={styles.itineraryDay}>
                    <h3>Ngày 2: Hoàn thành hành trình</h3>
                    <ul>
                      <li>06:00 - Thức dậy, ngắm bình minh</li>
                      <li>07:00 - Ăn sáng và dọn dẹp</li>
                      <li>08:30 - Trekking và khám phá thêm</li>
                      <li>11:00 - Thăm làng nghề địa phương</li>
                      <li>12:30 - Bữa trưa chia tay</li>
                      <li>14:00 - Khởi hành về điểm ban đầu</li>
                      <li>17:00 - Kết thúc hành trình</li>
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* What's Included */}
            <section className={styles.section}>
              <h2>Bao gồm trong tour</h2>
              <div className={styles.included}>
                {tour.included.map((item, index) => (
                  <div key={index} className={styles.includedItem}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section className={styles.section}>
              <h2>Hình ảnh tour</h2>
              <div className={styles.gallery}>
                {galleryImages.map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <img src={image || "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"} alt={`Gallery ${index + 1}`} />
                  </div>
                ))}
              </div>
            </section>

            {/* Safety & Requirements */}
            <section className={styles.section}>
              <h2>An toàn & Yêu cầu</h2>
              <div className={styles.requirements}>
                <div className={styles.requirementCard}>
                  <Shield className={styles.requirementIcon} />
                  <h3>Yêu cầu thể lực</h3>
                  <p>Phù hợp với người có sức khỏe tốt, có thể đi bộ liên tục 3-4 giờ.</p>
                </div>
                <div className={styles.requirementCard}>
                  <Heart className={styles.requirementIcon} />
                  <h3>Độ tuổi khuyến nghị</h3>
                  <p>Từ 16-55 tuổi. Trẻ em dưới 16 tuổi cần có người lớn đi kèm.</p>
                </div>
                <div className={styles.requirementCard}>
                  <Camera className={styles.requirementIcon} />
                  <h3>Chuẩn bị</h3>
                  <p>Giày trekking, áo mưa, kem chống nắng, thuốc cá nhân.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className={styles.bookingSidebar}>
            <div className={styles.bookingCard}>
              <div className={styles.pricing}>
                <span className={styles.priceLabel}>Giá từ</span>
                <span className={styles.price}>{formatPrice(tour.price)}</span>
                <span className={styles.priceUnit}>/người</span>
              </div>

              <form className={styles.bookingForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="departure-date">Ngày khởi hành</label>
                  <input id="departure-date" type="date" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="num-people">Số người tham gia</label>
                  <select id="num-people">
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                    <option value="5">5 người</option>
                    <option value="6">6 người</option>
                    <option value="7">7 người</option>
                    <option value="8">8 người</option>
                  </select>
                </div>
              </form>

              <Link to={`/booking/${tour.id}`} className="btn primary mb-3" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '24px'}}>
                <Calendar size={20} />
                Đặt tour ngay
              </Link>

              <div className={styles.contactOptions}>
                <a href="tel:+84123456789" className={styles.contactBtn}>
                  <Phone size={18} />
                  Gọi tư vấn
                </a>
                <button className={styles.contactBtn} type="button">
                  <MessageCircle size={18} />
                  Chat ngay
                </button>
              </div>

              <div className={styles.guarantees}>
                <div className={styles.guarantee}>
                  <CheckCircle size={16} />
                  <span>Hoàn tiền 100% nếu hủy trước 7 ngày</span>
                </div>
                <div className={styles.guarantee}>
                  <CheckCircle size={16} />
                  <span>Bảo hiểm du lịch toàn diện</span>
                </div>
                <div className={styles.guarantee}>
                  <CheckCircle size={16} />
                  <span>Hướng dẫn viên chuyên nghiệp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourDetail
