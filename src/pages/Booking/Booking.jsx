"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ArrowLeft, Calendar, Users, CreditCard, Shield, CheckCircle, Phone, MessageCircle } from "lucide-react"
import { setCurrentBooking, setCustomerInfo, setAddOns } from "../../store/slices/bookingSlice"
import styles from "./Booking.module.scss"

const Booking = () => {
  const { tourId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tours } = useSelector((state) => state.tours)
  const { currentBooking } = useSelector((state) => state.booking)

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [participants, setParticipants] = useState(1)
  const [customerInfo, setCustomerInfoState] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
    specialRequests: "",
  })
  const [addOns, setAddOnsState] = useState({
    insurance: true,
    equipment: false,
    photography: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("momo")

  const tour = tours.find((t) => t.id === Number.parseInt(tourId))

  if (!tour) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Tour không tìm thấy</h1>
          <button onClick={() => navigate("/tours")} className="btn primary">
            Quay lại danh sách tours
          </button>
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

  const calculateTotal = () => {
    let total = tour.price * participants
    if (addOns.insurance) total += 200000 * participants
    if (addOns.equipment) total += 500000 * participants
    if (addOns.photography) total += 800000 * participants
    return total
  }

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfoState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddOnChange = (addOn, checked) => {
    setAddOnsState((prev) => ({
      ...prev,
      [addOn]: checked,
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBookingSubmit = () => {
    // Dispatch booking data to Redux
    dispatch(
      setCurrentBooking({
        tourId: Number.parseInt(tourId),
        participants,
        selectedDate,
      }),
    )
    dispatch(setCustomerInfo(customerInfo))
    dispatch(setAddOns(addOns))

    // Simulate booking process
    alert("Đặt tour thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.")
    navigate("/")
  }

  const steps = [
    { number: 1, title: "Chọn ngày & số người", icon: Calendar },
    { number: 2, title: "Thông tin khách hàng", icon: Users },
    { number: 3, title: "Dịch vụ bổ sung", icon: Shield },
    { number: 4, title: "Thanh toán", icon: CreditCard },
  ]

  return (
    <div className={styles.bookingPage}>
      {/* Header */}
      <div className={styles.bookingHeader}>
        <div className="container">
          <button onClick={() => navigate(`/tours/${tourId}`)} className={styles.backButton}>
            <ArrowLeft size={20} />
            Quay lại tour
          </button>
          <h1>Đặt tour: {tour.title}</h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.bookingContent}>
          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            {steps.map((step) => (
              <div
                key={step.number}
                className={`${styles.step} ${currentStep >= step.number ? styles.active : ""} ${currentStep > step.number ? styles.completed : ""}`}
              >
                <div className={styles.stepIcon}>
                  {currentStep > step.number ? <CheckCircle size={24} /> : <step.icon size={24} />}
                </div>
                <span className={styles.stepTitle}>{step.title}</span>
              </div>
            ))}
          </div>

          <div className={styles.bookingMain}>
            {/* Booking Form */}
            <div className={styles.bookingForm}>
              {/* Step 1: Date & Participants */}
              {currentStep === 1 && (
                <div className={styles.stepContent}>
                  <h2>Chọn ngày khởi hành và số người tham gia</h2>

                  <div className="form-group">
                    <label>Ngày khởi hành *</label>
                    <div className="date-wrapper">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Số người tham gia *</label>
                    <div className="select-wrapper">
                      <select
                        value={participants}
                        onChange={(e) => setParticipants(Number.parseInt(e.target.value))}
                        required
                        className="select-primary"
                      >
                        <option value="" disabled>Số người tham gia</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num} className="option-highlighted">
                            {num} người {num === 1 ? '(Cá nhân)' : num <= 4 ? '(Nhóm nhỏ)' : '(Nhóm lớn)'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.tourInfo}>
                    <h3>Thông tin tour</h3>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Thời gian:</span>
                        <span>{tour.duration}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Độ khó:</span>
                        <span>{tour.difficulty}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Địa điểm:</span>
                        <span>{tour.location}</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleNextStep} className="btn primary" disabled={!selectedDate}>
                    Tiếp tục
                  </button>
                </div>
              )}

              {/* Step 2: Customer Information */}
              {currentStep === 2 && (
                <div className={styles.stepContent}>
                  <h2>Thông tin khách hàng</h2>

                  <div className={styles.formRow}>
                    <div className="form-group">
                      <label>Họ và tên *</label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => handleCustomerInfoChange("name", e.target.value)}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại *</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleCustomerInfoChange("phone", e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange("email", e.target.value)}
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Liên hệ khẩn cấp</label>
                    <input
                      type="text"
                      value={customerInfo.emergencyContact}
                      onChange={(e) => handleCustomerInfoChange("emergencyContact", e.target.value)}
                      placeholder="Tên và số điện thoại người thân"
                    />
                  </div>

                  <div className="form-group">
                    <label>Yêu cầu đặc biệt</label>
                    <textarea
                      value={customerInfo.specialRequests}
                      onChange={(e) => handleCustomerInfoChange("specialRequests", e.target.value)}
                      placeholder="Ví dụ: ăn chay, dị ứng thực phẩm, vấn đề sức khỏe..."
                      rows="3"
                    />
                  </div>

                  <div className={styles.stepActions}>
                    <button onClick={handlePrevStep} className="btn secondary">
                      Quay lại
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn primary"
                      disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.email}
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Add-ons */}
              {currentStep === 3 && (
                <div className={styles.stepContent}>
                  <h2>Dịch vụ bổ sung</h2>

                  <div className={styles.addOns}>
                    <div className={styles.addOnItem}>
                      <div className={styles.addOnInfo}>
                        <h3>Bảo hiểm du lịch mở rộng</h3>
                        <p>Bảo hiểm toàn diện với mức bồi thường lên đến 100 triệu đồng</p>
                        <span className={styles.addOnPrice}>+200.000 VNĐ/người</span>
                      </div>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={addOns.insurance}
                          onChange={(e) => handleAddOnChange("insurance", e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>

                    <div className={styles.addOnItem}>
                      <div className={styles.addOnInfo}>
                        <h3>Thuê thiết bị chuyên dụng</h3>
                        <p>Bao gồm: gậy trekking, đèn pin, áo mưa, balo chuyên dụng</p>
                        <span className={styles.addOnPrice}>+500.000 VNĐ/người</span>
                      </div>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={addOns.equipment}
                          onChange={(e) => handleAddOnChange("equipment", e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>

                    <div className={styles.addOnItem}>
                      <div className={styles.addOnInfo}>
                        <h3>Dịch vụ chụp ảnh chuyên nghiệp</h3>
                        <p>Photographer đồng hành, chỉnh sửa và giao ảnh trong 3 ngày</p>
                        <span className={styles.addOnPrice}>+800.000 VNĐ/người</span>
                      </div>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={addOns.photography}
                          onChange={(e) => handleAddOnChange("photography", e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.stepActions}>
                    <button onClick={handlePrevStep} className="btn secondary">
                      Quay lại
                    </button>
                    <button onClick={handleNextStep} className="btn primary">
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div className={styles.stepContent}>
                  <h2>Thanh toán</h2>

                  <div className={styles.paymentMethods}>
                    <h3>Chọn phương thức thanh toán</h3>
                    <div className={styles.paymentOptions}>
                      <label className={styles.paymentOption}>
                        <input
                          type="radio"
                          name="payment"
                          value="momo"
                          checked={paymentMethod === "momo"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className={styles.paymentInfo}>
                          <span className={styles.paymentName}>MoMo</span>
                          <span className={styles.paymentDesc}>Ví điện tử MoMo</span>
                        </div>
                      </label>

                      <label className={styles.paymentOption}>
                        <input
                          type="radio"
                          name="payment"
                          value="vnpay"
                          checked={paymentMethod === "vnpay"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className={styles.paymentInfo}>
                          <span className={styles.paymentName}>VNPay</span>
                          <span className={styles.paymentDesc}>Thẻ ATM/Visa/Mastercard</span>
                        </div>
                      </label>

                      <label className={styles.paymentOption}>
                        <input
                          type="radio"
                          name="payment"
                          value="bank"
                          checked={paymentMethod === "bank"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className={styles.paymentInfo}>
                          <span className={styles.paymentName}>Chuyển khoản</span>
                          <span className={styles.paymentDesc}>Chuyển khoản ngân hàng</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className={styles.terms}>
                    <label className={styles.checkbox}>
                      <input type="checkbox" required />
                      <span className={styles.checkmark}></span>
                      <span>
                        Tôi đồng ý với <a href="/terms">Điều khoản sử dụng</a> và
                        <a href="/privacy"> Chính sách bảo mật</a> của Wandolo
                      </span>
                    </label>
                  </div>

                  <div className={styles.stepActions}>
                    <button onClick={handlePrevStep} className="btn secondary">
                      Quay lại
                    </button>
                    <button onClick={handleBookingSubmit} className="btn primary">
                      Xác nhận đặt tour
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className={styles.bookingSummary}>
              <div className={styles.summaryCard}>
                <h3>Tóm tắt đặt tour</h3>

                <div className={styles.tourSummary}>
                  <img src={tour.image || "/placeholder.svg"} alt={tour.title} />
                  <div>
                    <h4>{tour.title}</h4>
                    <p>{tour.location}</p>
                    <p>{tour.duration}</p>
                  </div>
                </div>

                {selectedDate && (
                  <div className={styles.summaryItem}>
                    <span>Ngày khởi hành:</span>
                    <span>{new Date(selectedDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                )}

                <div className={styles.summaryItem}>
                  <span>Số người:</span>
                  <span>{participants} người</span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceItem}>
                    <span>Giá tour ({participants} người)</span>
                    <span>{formatPrice(tour.price * participants)}</span>
                  </div>

                  {addOns.insurance && (
                    <div className={styles.priceItem}>
                      <span>Bảo hiểm mở rộng</span>
                      <span>{formatPrice(200000 * participants)}</span>
                    </div>
                  )}

                  {addOns.equipment && (
                    <div className={styles.priceItem}>
                      <span>Thuê thiết bị</span>
                      <span>{formatPrice(500000 * participants)}</span>
                    </div>
                  )}

                  {addOns.photography && (
                    <div className={styles.priceItem}>
                      <span>Chụp ảnh chuyên nghiệp</span>
                      <span>{formatPrice(800000 * participants)}</span>
                    </div>
                  )}
                </div>

                <div className={styles.totalPrice}>
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(calculateTotal())}</span>
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

                <div className={styles.support}>
                  <h4>Cần hỗ trợ?</h4>
                  <div className={styles.supportButtons}>
                    <a href="tel:+84123456789" className={styles.supportBtn}>
                      <Phone size={16} />
                      Gọi ngay
                    </a>
                    <button className={styles.supportBtn}>
                      <MessageCircle size={16} />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
