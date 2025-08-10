"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download
} from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { selectUser, selectIsAuthenticated } from "../../store/slices/authSlice"
import styles from "./MyBooking.module.scss"

const MyBooking = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const { currentBooking, bookingHistory } = useSelector((state) => state.booking)
  const { tours } = useSelector((state) => state.tours)

  const [activeTab, setActiveTab] = useState("current")
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    // Process booking history and current booking
    const processedBookings = bookingHistory.map(booking => {
      const tour = tours.find(t => t.id === booking.tourId)
      return {
        ...booking,
        tourTitle: tour?.title || "Tour không xác định",
        tourImage: tour?.image || "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        location: tour?.location || "Tây Nguyên, Việt Nam",
        duration: tour?.duration || "3 ngày 2 đêm",
        totalPrice: tour ? (tour.price * booking.participants) : 2400000,
        ticketNumber: `TK-2024-${String(booking.id).slice(-3)}`,
        departureDate: booking.departureDate || booking.selectedDate || null, // Allow null for departure date
        guideInfo: {
          name: "Lê Văn C",
          phone: "0123456788",
          email: "levanc@wandolo.com"
        }
      }
    })

    setBookings(processedBookings)
  }, [isAuthenticated, navigate, bookingHistory, tours])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Chưa có thông tin"
    }
    
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Chưa có thông tin"
    }
    
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case "confirmed":
        return { label: "Đã xác nhận", color: "success", icon: CheckCircle }
      case "pending":
        return { label: "Chờ xác nhận", color: "warning", icon: Clock }
      case "completed":
        return { label: "Đã hoàn thành", color: "info", icon: CheckCircle }
      case "cancelled":
        return { label: "Đã hủy", color: "danger", icon: AlertCircle }
      default:
        return { label: "Không xác định", color: "secondary", icon: AlertCircle }
    }
  }

  const handleDownloadTicket = (booking) => {
    // In a real app, this would generate and download a PDF ticket
    alert(`Đang tải vé cho booking ${booking.ticketNumber}`)
  }



  const currentBookings = bookings.filter(booking => 
    ["confirmed", "pending"].includes(booking.status)
  )

  const pastBookings = bookings.filter(booking => 
    ["completed", "cancelled"].includes(booking.status)
  )

  const StatusIcon = ({ status }) => {
    const statusInfo = getStatusInfo(status)
    const IconComponent = statusInfo.icon
    return <IconComponent size={16} className={`${styles.statusIcon} ${styles[statusInfo.color]}`} />
  }

  return (
    <div className={styles.myBookingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <img 
            src="https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto" 
            alt="My Booking Hero" 
            className={styles.heroImage} 
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Các tour đã đặt</h1>
            <p>Quản lý và xem thông tin các tour đã đặt</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.bookingContent}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "current" ? styles.active : ""}`}
              onClick={() => setActiveTab("current")}
            >
              <Calendar size={20} />
              Tour sắp tới ({currentBookings.length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === "past" ? styles.active : ""}`}
              onClick={() => setActiveTab("past")}
            >
              <Clock size={20} />
              Tour đã hoàn thành ({pastBookings.length})
            </button>
          </div>

          {/* Booking List */}
          <div className={styles.bookingList}>
            {activeTab === "current" && (
              <>
                {currentBookings.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Calendar size={48} />
                    <h3>Chưa có tour nào sắp tới</h3>
                    <p>Hãy đặt tour đầu tiên của bạn để bắt đầu hành trình khám phá!</p>
                    <button onClick={() => navigate("/tours")} className="btn primary">
                      Khám phá tours
                    </button>
                  </div>
                ) : (
                  currentBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingCard}>
                      <div className={styles.bookingHeader}>
                        <div className={styles.bookingInfo}>
                          <img src={booking.tourImage} alt={booking.tourTitle} />
                          <div>
                            <h3>{booking.tourTitle}</h3>
                            <div className={styles.bookingMeta}>
                              <span className={styles.location}>
                                <MapPin size={16} />
                                {booking.location}
                              </span>
                              <span className={styles.duration}>
                                <Clock size={16} />
                                {booking.duration}
                              </span>
                              <span className={styles.participants}>
                                <Users size={16} />
                                {booking.participants} người
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.bookingStatus}>
                          <StatusIcon status={booking.status} />
                          <span>{getStatusInfo(booking.status).label}</span>
                        </div>
                      </div>

                                             <div className={styles.bookingDetails}>
                         {/* Cột trái - Thông tin booking */}
                         <div className={styles.detailColumn}>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Số vé:</span>
                             <span className={styles.value}>{booking.ticketNumber}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Ngày khởi hành:</span>
                             <span className={styles.value}>{formatDate(booking.departureDate)}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Ngày đặt:</span>
                             <span className={styles.value}>{formatDate(booking.bookingDate)}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Tổng tiền:</span>
                             <span className={styles.value}>{formatPrice(booking.totalPrice)}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Phương thức thanh toán:</span>
                             <span className={styles.value}>{booking.paymentMethod === "momo" ? "MoMo" : "Chuyển khoản"}</span>
                           </div>
                         </div>
                         
                         {/* Cột phải - Thông tin hướng dẫn viên */}
                         <div className={styles.detailColumn}>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Hướng dẫn viên:</span>
                             <span className={styles.value}>{booking.guideInfo.name}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>SĐT hướng dẫn viên:</span>
                             <span className={styles.value}>{booking.guideInfo.phone}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Email hướng dẫn viên:</span>
                             <span className={styles.value}>{booking.guideInfo.email}</span>
                           </div>
                           <div className={styles.qrCodeSection}>
                             <span className={styles.label}>QR Code:</span>
                             <div className={styles.qrCodeContainer}>
                               <QRCodeSVG 
                                 value={`${booking.ticketNumber}|${booking.tourTitle}|${booking.departureDate}`}
                                 size={80}
                                 level="M"
                                 includeMargin={true}
                               />
                               <span className={styles.qrCodeText}>{booking.ticketNumber}</span>
                             </div>
                           </div>
                         </div>
                       </div>

                      <div className={styles.bookingActions}>
                        <button 
                          onClick={() => handleDownloadTicket(booking)}
                          className="btn primary"
                        >
                          <Download size={16} />
                          Tải vé
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "past" && (
              <>
                {pastBookings.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Clock size={48} />
                    <h3>Chưa có tour nào đã hoàn thành</h3>
                    <p>Hãy đặt và tham gia tour đầu tiên của bạn!</p>
                    <button onClick={() => navigate("/tours")} className="btn primary">
                      Khám phá tours
                    </button>
                  </div>
                ) : (
                  pastBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingCard}>
                      <div className={styles.bookingHeader}>
                        <div className={styles.bookingInfo}>
                          <img src={booking.tourImage} alt={booking.tourTitle} />
                          <div>
                            <h3>{booking.tourTitle}</h3>
                            <div className={styles.bookingMeta}>
                              <span className={styles.location}>
                                <MapPin size={16} />
                                {booking.location}
                              </span>
                              <span className={styles.duration}>
                                <Clock size={16} />
                                {booking.duration}
                              </span>
                              <span className={styles.participants}>
                                <Users size={16} />
                                {booking.participants} người
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.bookingStatus}>
                          <StatusIcon status={booking.status} />
                          <span>{getStatusInfo(booking.status).label}</span>
                        </div>
                      </div>

                                             <div className={styles.bookingDetails}>
                         {/* Cột trái - Thông tin booking */}
                         <div className={styles.detailColumn}>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Số vé:</span>
                             <span className={styles.value}>{booking.ticketNumber}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Ngày khởi hành:</span>
                             <span className={styles.value}>{formatDate(booking.departureDate)}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Ngày đặt:</span>
                             <span className={styles.value}>{formatDate(booking.bookingDate)}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Tổng tiền:</span>
                             <span className={styles.value}>{formatPrice(booking.totalPrice)}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Trạng thái:</span>
                             <span className={styles.value}>{getStatusInfo(booking.status).label}</span>
                           </div>
                         </div>
                         
                         {/* Cột phải - Thông tin hướng dẫn viên */}
                         <div className={styles.detailColumn}>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Hướng dẫn viên:</span>
                             <span className={styles.value}>{booking.guideInfo.name}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>SĐT hướng dẫn viên:</span>
                             <span className={styles.value}>{booking.guideInfo.phone}</span>
                           </div>
                           <div className={styles.detailItem}>
                             <span className={styles.label}>Email hướng dẫn viên:</span>
                             <span className={styles.value}>{booking.guideInfo.email}</span>
                           </div>
                           <div className={styles.qrCodeSection}>
                             <span className={styles.label}>QR Code:</span>
                             <div className={styles.qrCodeContainer}>
                               <QRCodeSVG 
                                 value={`${booking.ticketNumber}|${booking.tourTitle}|${booking.departureDate}`}
                                 size={80}
                                 level="M"
                                 includeMargin={true}
                               />
                               <span className={styles.qrCodeText}>{booking.ticketNumber}</span>
                             </div>
                           </div>
                         </div>
                       </div>


                    </div>
                  ))
                )}
              </>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}

export default MyBooking
