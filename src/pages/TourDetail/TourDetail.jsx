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
      case "Dễ - Mức độ cho người bắt đầu":
        return "green"
      case "Trung bình":
        return "orange"
      case "Khó":
        return "red"
      default:
        return "gray"
    }
  }

  const getVO2MaxRequirements = (difficulty) => {
    const requirements = {
      "Dễ - Mức độ cho người bắt đầu": {
        color: "#10b981",
        name: "Dễ",
        female: {
          "20-29": 29,
          "30-39": 27,
          "40-49": 24.5
        },
        male: {
          "20-29": 36.5,
          "30-39": 35.5,
          "40-49": 33.6
        }
      },
      "Trung bình": {
        color: "#f59e0b",
        name: "Trung bình",
        female: {
          "20-29": 33,
          "30-39": 31.5,
          "40-49": 29
        },
        male: {
          "20-29": 42.5,
          "30-39": 41,
          "40-49": 39
        }
      },
      "Khó": {
        color: "#ef4444",
        name: "Khó",
        female: {
          "20-29": 37,
          "30-39": 35,
          "40-49": 33
        },
        male: {
          "20-29": 46,
          "30-39": 45,
          "40-49": 43
        }
      }
    }

    return requirements[difficulty] || requirements["Dễ - Mức độ cho người bắt đầu"]
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

            {/* Activity Type Tags */}
            {tour.activityType && (
              <div className={styles.activityTags}>
                {tour.activityType.map((activity, index) => (
                  <span key={index} className={styles.activityTag}>
                    {activity}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 360° Panorama */}
      <section className={styles.panoramaSection}>
        <div className="container">
          <h2>Khám phá 360°</h2>
          <div className={styles.panoramaContainer}>
            {/* <div className={styles.panoramaBadge}>360° View</div> */}
            <iframe
              title="Panorama Viewer"
              scrolling="no"
              allowFullScreen
              src="https://renderstuff.com/tools/360-panorama-web-viewer-embed/?image=https://static.vecteezy.com/system/resources/previews/034/721/295/non_2x/360-degree-panoramic-winding-road-mountains-view-with-lake-hume-from-kurrajong-gap-lookout-located-between-bellbridge-and-bethanga-a-short-drive-from-albury-wodonga-victoria-australia-photo.jpg"
            />
            <div className={styles.panoramaOverlay}></div>
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
              <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src={tour.guide.avatar} alt={tour.guide.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '4px solid #10b981' }} />
                  <div style={{ fontWeight: 700, fontSize: 20 }}>{tour.guide.name}</div>
                  <div style={{ color: '#64748b', fontSize: 14, margin: '4px 0' }}>{tour.guide.experience} · {tour.guide.age} tuổi</div>
                  <div style={{ margin: '4px 0' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>★ {tour.guide.rating}</span> ({tour.guide.toursCompleted} tours)
                  </div>
                  <div style={{ margin: '4px 0' }}>
                    {tour.guide.languages.map((language, index) => (
                      <span key={index} style={{ background: '#dbeafe', color: '#1e40af', borderRadius: 8, padding: '2px 8px', fontSize: 12, marginRight: 4 }}>{language}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ marginBottom: 12, color: '#334155' }}>{tour.guide.bio}</div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Chuyên môn</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {tour.guide.specialties.map((specialty, index) => (
                        <span key={index} style={{ background: '#d1fae5', color: '#047857', borderRadius: 16, padding: '4px 14px', fontSize: 14 }}>{specialty}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Chứng chỉ & Bằng cấp</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {tour.guide.certificates.map((cert, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', borderRadius: 16, padding: 12, boxShadow: '0 1px 4px #0001' }}>
                          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80" alt="cert" style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', marginRight: 16 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500 }}>{cert.name}</div>
                            <div style={{ fontSize: 13, color: '#1e40af' }}>{cert.issuer}</div>
                            <div style={{ fontSize: 13, color: '#64748b' }}>Năm {cert.year}</div>
                          </div>
                          {cert.verified && (
                            <span style={{ background: '#d1fae5', color: '#10b981', borderRadius: 8, padding: '2px 10px', fontSize: 13, fontWeight: 600 }}>Verified</span>
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

              {/* Preparation Card - Full Width */}
              <div style={{
                background: 'var(--slate-50)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--slate-200)',
                marginBottom: 'var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)'
              }}>
                <div className={styles.requirementIcon} style={{
                  color: 'var(--primary-green)',
                  margin: '0',
                  flexShrink: 0
                }}>
                  <Camera size={24} />
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--slate-700)',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Chuẩn bị
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--slate-600)',
                    lineHeight: '1.5'
                  }}>
                    {tour.requirements.preparation}
                  </div>
                </div>
              </div>

              <div className={styles.requirements}>
                
                {/* Health Requirements Card */}
                <div className={styles.requirementCard}>
                  <Shield className={styles.requirementIcon} />
                  <h3>Yêu cầu sức khỏe</h3>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#374151' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '2px solid #10b981',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px'
                      }}>
                        <div style={{
                          background: 'white',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid #10b981',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#059669',
                            fontWeight: '600',
                            marginBottom: '4px',
                            textTransform: 'uppercase'
                          }}>
                            Huyết áp
                          </div>
                          <div style={{
                            fontSize: '16px',
                            color: '#047857',
                            fontWeight: '700'
                          }}>
                            90/60 - 120/80 mmHg
                          </div>
                        </div>

                        <div style={{
                          background: 'white',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid #10b981',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#059669',
                            fontWeight: '600',
                            marginBottom: '4px',
                            textTransform: 'uppercase'
                          }}>
                            Nhịp tim nghỉ
                          </div>
                          <div style={{
                            fontSize: '16px',
                            color: '#047857',
                            fontWeight: '700'
                          }}>
                            60-100 bpm
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: 'white',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #10b981',
                        marginTop: '12px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#059669',
                          fontWeight: '600',
                          marginBottom: '4px',
                          textTransform: 'uppercase'
                        }}>
                          Thời gian vận động
                        </div>
                        <div style={{
                          fontSize: '16px',
                          color: '#047857',
                          fontWeight: '700'
                        }}>
                          30+ phút liên tục
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VO2 Max Card */}
                <div className={styles.requirementCard}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${getVO2MaxRequirements(tour.difficulty).color}, ${getVO2MaxRequirements(tour.difficulty).color}dd)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      border: `2px solid ${getVO2MaxRequirements(tour.difficulty).color}`,
                      color: getVO2MaxRequirements(tour.difficulty).color
                    }}>
                      VO₂
                    </div>
                  </div>
                                    <h3>
                    Chỉ số <span style={{ 
                      fontWeight: '800',
                      fontSize: '1.1em',
                      color: getVO2MaxRequirements(tour.difficulty).color,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>VO₂</span> max <span style={{ 
                      background: getVO2MaxRequirements(tour.difficulty).color, 
                      color: 'white', 
                      padding: '4px 12px', 
                      borderRadius: '16px', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      display: 'inline-block',
                      marginLeft: '8px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                    }}>
                      {getVO2MaxRequirements(tour.difficulty).name}
                    </span>
                  </h3>

                  <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    <div style={{
                      background: `linear-gradient(135deg, ${getVO2MaxRequirements(tour.difficulty).color}15, ${getVO2MaxRequirements(tour.difficulty).color}08)`,
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${getVO2MaxRequirements(tour.difficulty).color}`
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px'
                      }}>
                        <div style={{
                          background: 'white',
                          padding: '12px',
                          borderRadius: '8px',
                          border: `1px solid ${getVO2MaxRequirements(tour.difficulty).color}30`,
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#ec4899',
                            fontWeight: '700',
                            marginBottom: '8px',
                            textTransform: 'uppercase'
                          }}>
                            Nữ
                          </div>
                          <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.4' }}>
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>20-29t:</span>
                              <br />
                              <strong style={{ color: '#ec4899', fontSize: '16px' }}>≥{getVO2MaxRequirements(tour.difficulty).female["20-29"]}</strong>
                            </div>
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>30-39t:</span>
                              <br />
                              <strong style={{ color: '#ec4899', fontSize: '16px' }}>≥{getVO2MaxRequirements(tour.difficulty).female["30-39"]}</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>40-49t:</span>
                              <br />
                              <strong style={{ color: '#ec4899', fontSize: '16px' }}>≥{getVO2MaxRequirements(tour.difficulty).female["40-49"]}</strong>
                            </div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>ml/km/phút</div>
                          </div>
                        </div>

                        <div style={{
                          background: 'white',
                          padding: '12px',
                          borderRadius: '8px',
                          border: `1px solid ${getVO2MaxRequirements(tour.difficulty).color}30`,
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#3b82f6',
                            fontWeight: '700',
                            marginBottom: '8px',
                            textTransform: 'uppercase'
                          }}>
                            Nam
                          </div>
                          <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.4' }}>
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>20-29t:</span>
                              <br />
                              <strong style={{ color: '#3b82f6', fontSize: '16px' }}>≥{getVO2MaxRequirements(tour.difficulty).male["20-29"]}</strong>
                            </div>
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>30-39t:</span>
                              <br />
                              <strong style={{ color: '#3b82f6', fontSize: '16px' }}>≥{getVO2MaxRequirements(tour.difficulty).male["30-39"]}</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>40-49t:</span>
                              <br />
                              <strong style={{ color: '#3b82f6', fontSize: '16px' }}>≥{getVO2MaxRequirements(tour.difficulty).male["40-49"]}</strong>
                            </div>
                            <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>ml/km/phút</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Note Section */}
              <div style={{
                background: 'linear-gradient(135deg, #fefce8, #fef3c7)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid #f59e0b',
                marginTop: 'var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)'
              }}>
                <div className={styles.requirementIcon} style={{
                  color: '#d97706',
                  margin: '0',
                  flexShrink: 0
                }}>
                  <MessageCircle size={24} />
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#92400e',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Lưu ý quan trọng
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#92400e',
                    lineHeight: '1.5'
                  }}>
                    Sẽ có bài test sức khỏe nhanh trước khi đặt tour để đánh giá thể lực và chọn cấp độ phù hợp.
                  </div>
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

              <Link to={`/booking/${tour.id}`} className="btn primary mb-3" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '24px' }}>
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
