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
          <img src={tour.image} alt={tour.title} className={styles.heroImage} />
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
                <span>Tối đa {tour.maxPeople} người</span>
              </div>
              <div className={styles.metaItem}>
                <Star size={20} />
                <span>{tour.rating} ({tour.reviewCount} đánh giá)</span>
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

            {/* Guide Info */}
            <section className={styles.section}>
              <h2>Hướng dẫn viên</h2>
              <div style={{display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <div style={{minWidth: 180, textAlign: 'center'}}>
                  <img src={tour.guide.avatar} alt={tour.guide.name} style={{width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '4px solid #10b981'}} />
                  <div style={{fontWeight: 700, fontSize: 20}}>{tour.guide.name}</div>
                  <div style={{color: '#64748b', fontSize: 14, margin: '4px 0'}}>{tour.guide.experience} · {tour.guide.age} tuổi</div>
                  <div style={{margin: '4px 0'}}>
                    <span style={{color: '#f59e0b', fontWeight: 600}}>★ {tour.guide.rating}</span> ({tour.guide.toursCompleted} tours)
                  </div>
                  <div style={{margin: '4px 0'}}>
                    {tour.guide.languages.map((language, index) => (
                      <span key={index} style={{background: '#e0f2fe', color: '#0284c7', borderRadius: 8, padding: '2px 8px', fontSize: 12, marginRight: 4}}>{language}</span>
                    ))}
                  </div>
                </div>
                <div style={{flex: 1, minWidth: 260}}>
                  <div style={{marginBottom: 12, color: '#334155'}}>{tour.guide.bio}</div>
                  <div style={{marginBottom: 12}}>
                    <div style={{fontWeight: 600, marginBottom: 4}}>Chuyên môn</div>
                    <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                      {tour.guide.specialties.map((specialty, index) => (
                        <span key={index} style={{background: '#d1fae5', color: '#047857', borderRadius: 16, padding: '4px 14px', fontSize: 14}}>{specialty}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{fontWeight: 600, marginBottom: 4}}>Chứng chỉ & Bằng cấp</div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                      {tour.guide.certificates.map((cert, index) => (
                        <div key={index} style={{display: 'flex', alignItems: 'center', background: '#f9fafb', borderRadius: 16, padding: 12, boxShadow: '0 1px 4px #0001'}}>
                          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80" alt="cert" style={{width: 56, height: 56, borderRadius: 12, objectFit: 'cover', marginRight: 16}} />
                          <div style={{flex: 1}}>
                            <div style={{fontWeight: 500}}>{cert.name}</div>
                            <div style={{fontSize: 13, color: '#0284c7'}}>{cert.issuer}</div>
                            <div style={{fontSize: 13, color: '#64748b'}}>Năm {cert.year}</div>
                          </div>
                          {cert.verified && (
                            <span style={{background: '#d1fae5', color: '#10b981', borderRadius: 8, padding: '2px 10px', fontSize: 13, fontWeight: 600}}>Verified</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                {Object.values(tour.itinerary).map((day, index) => (
                  <div key={index} className={styles.itineraryDay}>
                    <h3>{day.title}</h3>
                    <ul>
                      {day.activities.map((activity, activityIndex) => (
                        <li key={activityIndex}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                {tour.gallery.map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <img src={image} alt={`Gallery ${index + 1}`} />
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
                  <p>{tour.requirements.fitness}</p>
                </div>
                <div className={styles.requirementCard}>
                  <Heart className={styles.requirementIcon} />
                  <h3>Độ tuổi khuyến nghị</h3>
                  <p>{tour.requirements.ageRange}</p>
                </div>
                <div className={styles.requirementCard}>
                  <Camera className={styles.requirementIcon} />
                  <h3>Chuẩn bị</h3>
                  <p>{tour.requirements.preparation}</p>
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
                    {Array.from({ length: tour.maxPeople }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} người</option>
                    ))}
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
