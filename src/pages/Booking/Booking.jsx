"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ArrowLeft, Calendar, Users, CreditCard, Shield, CheckCircle, Phone, MessageCircle, Activity, AlertTriangle, Tag } from "lucide-react"
import { setCurrentBooking, setCustomerInfo, setAddOns, addCurrentBookingToHistory } from "../../store/slices/bookingSlice"
import { 
  getStoredDiscountCode, 
  validateDiscountCode, 
  markDiscountCodeAsUsed,
  isFirstBooking 
} from "../../utils/discountUtils"
import { selectUser, selectIsAuthenticated } from "../../store/slices/authSlice"
import styles from "./Booking.module.scss"

const Booking = () => {
  const { tourId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tours } = useSelector((state) => state.tours)
  const { currentBooking } = useSelector((state) => state.booking)
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

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
    equipment: false,
    photography: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("momo")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  
  // Discount Code State
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(null)
  const [discountError, setDiscountError] = useState("")
  const [storedDiscount, setStoredDiscount] = useState(null)

  // VO2 Max Test State
  const [vo2TestData, setVo2TestData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    restingHeartRate: "",
    walkingTime: "",
    walkingHeartRate: "",
    testMethod: "formula1" // formula1 or formula2
  })
  const [vo2Result, setVo2Result] = useState(null)
  
  // Warning State
  const [warningData, setWarningData] = useState(null)

  const tour = tours.find((t) => t.id === Number.parseInt(tourId))

  // Load stored discount code on component mount
  useEffect(() => {
    // Load stored discount code
    const discount = getStoredDiscountCode()
    if (discount) {
      setStoredDiscount(discount)
    }
  }, [])

  // Check if this is the first booking
  const isFirstBookingAfterRegister = isFirstBooking()

  // Clear discount data when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setStoredDiscount(null)
      setDiscountCode("")
      setAppliedDiscount(null)
      setDiscountError("")
    }
  }, [isAuthenticated])

  // Auto-fill customer info if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setCustomerInfoState({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        emergencyContact: "",
        specialRequests: "",
      })
    } else if (!isAuthenticated) {
      // Clear customer info when user logs out
      setCustomerInfoState({
        name: "",
        email: "",
        phone: "",
        emergencyContact: "",
        specialRequests: "",
      })
    }
  }, [isAuthenticated, user])

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
    if (addOns.equipment) total += 500000 * participants
    if (addOns.photography) total += 800000 * participants
    
    // Apply discount if available
    if (appliedDiscount) {
      const discountAmount = (total * appliedDiscount.percentage) / 100
      total -= discountAmount
    }
    
    return total
  }

  const calculateDiscountAmount = () => {
    if (!appliedDiscount) return 0
    let subtotal = tour.price * participants
    if (addOns.equipment) subtotal += 500000 * participants
    if (addOns.photography) subtotal += 800000 * participants
    return (subtotal * appliedDiscount.percentage) / 100
  }

  const handleApplyDiscount = () => {
    setDiscountError("")
    
    if (!discountCode.trim()) {
      setDiscountError("Vui lòng nhập mã giảm giá")
      return
    }
    
    // Get stored discount data
    const stored = getStoredDiscountCode()
    
    // Check if code exists and matches
    if (!stored || discountCode.toUpperCase() !== stored.code) {
      setDiscountError("Mã giảm giá không hợp lệ.")
      return
    }
    
    // Check if code has already been used
    if (stored.isUsed) {
      setDiscountError("Mã giảm giá này đã được sử dụng.")
      return
    }
    
    // Check if this is the first booking (for first booking discount codes)
    if (stored.isFirstBooking && !isFirstBookingAfterRegister) {
      setDiscountError("Mã giảm giá này chỉ áp dụng cho booking đầu tiên của bạn.")
      return
    }
    
    // Apply the discount
    setAppliedDiscount(stored)
    setDiscountError("")
  }

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null)
    setDiscountCode("")
    setDiscountError("")
  }

  // VO2 Max Calculation Functions
  const calculateVO2Max = () => {
    const { age, gender, weight, height, restingHeartRate, walkingTime, walkingHeartRate, testMethod } = vo2TestData

    if (testMethod === "formula1") {
      // Formula 1: Based on resting heart rate
      if (!age || !restingHeartRate) return null
      
      const mhr = 208 - (0.7 * parseInt(age))
      const rhr = parseInt(restingHeartRate)
      const vo2max = 15.3 * (mhr / rhr)
      
      return {
        value: vo2max,
        method: "Công thức 1: Dựa trên nhịp tim lúc nghỉ ngơi",
        details: {
          mhr: mhr,
          rhr: rhr,
          formula: `15.3 × (${mhr} / ${rhr})`
        }
      }
    } else {
      // Formula 2: Based on walking time
      if (!age || !gender || !weight || !walkingTime || !walkingHeartRate) return null
      
      const w = parseFloat(weight) * 2.20462 // Convert kg to pounds
      const a = parseInt(age)
      const g = gender === "male" ? 1 : 0
      const t = parseFloat(walkingTime)
      const h = parseInt(walkingHeartRate)
      
      const vo2max = 132.853 - 0.0769 * w - 0.3877 * a + 6.315 * g - 3.2649 * t - 0.156 * h
      
      return {
        value: vo2max,
        method: "Công thức 2: Dựa trên thời gian đi bộ 1 dặm",
        details: {
          weight: w,
          age: a,
          gender: g,
          time: t,
          heartRate: h,
          formula: `132.853 - 0.0769 × ${w} - 0.3877 × ${a} + 6.315 × ${g} - 3.2649 × ${t} - 0.156 × ${h}`
        }
      }
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

  const checkVO2Compatibility = (vo2Value, age, gender) => {
    const requirements = getVO2MaxRequirements(tour.difficulty)
    let ageGroup = ""
    
    if (age >= 20 && age <= 29) ageGroup = "20-29"
    else if (age >= 30 && age <= 39) ageGroup = "30-39"
    else if (age >= 40 && age <= 49) ageGroup = "40-49"
    else return { compatible: false, reason: "Tuổi không phù hợp với tour này" }

    const requiredVO2 = gender === "male" ? requirements.male[ageGroup] : requirements.female[ageGroup]
    
    return {
      compatible: vo2Value >= requiredVO2,
      required: requiredVO2,
      actual: vo2Value,
      difference: vo2Value - requiredVO2
    }
  }

  const handleVO2TestChange = (field, value) => {
    setVo2TestData(prev => ({
      ...prev,
      [field]: value
    }))
    setVo2Result(null)
  }

  const handleVO2TestSubmit = () => {
    const result = calculateVO2Max()
    if (result) {
      setVo2Result(result)
    }
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
    try {
      console.log('handleNextStep called, currentStep:', currentStep)
      if (currentStep === 1 && vo2Result) {
        console.log('VO2 result:', vo2Result)
        console.log('VO2 test data:', vo2TestData)
        const compatibility = checkVO2Compatibility(vo2Result.value, parseInt(vo2TestData.age), vo2TestData.gender)
        console.log('Compatibility result:', compatibility)
        if (!compatibility.compatible) {
          // Hiển thị warning data
          const warningDataToSet = {
            currentVO2: vo2Result.value.toFixed(1),
            required: compatibility.required,
            difference: compatibility.difference.toFixed(1)
          }
          console.log('Setting warning data:', warningDataToSet)
          setWarningData(warningDataToSet)
          return
        }
      }
      
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
        // Scroll to top when moving to next step
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Error in handleNextStep:', error)
    }
  }

  const handleWarningConfirm = () => {
    setWarningData(null)
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleWarningCancel = () => {
    setWarningData(null)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Scroll to top when moving to previous step
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBookingSubmit = () => {
    // Mark discount code as used if applied
    if (appliedDiscount) {
      markDiscountCodeAsUsed()
    }

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

    // Add current booking to history
    dispatch(addCurrentBookingToHistory())

    // Redirect to My Booking page instead of showing alert
    navigate("/my-booking")
  }

  const steps = [
    { number: 1, title: "Kiểm tra sức khỏe", icon: Activity },
    { number: 2, title: "Chọn ngày & số người", icon: Calendar },
    { number: 3, title: "Thông tin khách hàng", icon: Users },
    { number: 4, title: "Dịch vụ bổ sung", icon: Shield },
    { number: 5, title: "Thanh toán", icon: CreditCard },
  ]

  return (
    <div className={styles.bookingPage}>
      {/* Hero Section */}
      <section className={styles.bookingHero}>
        <div className={styles.heroBackground}>
          <img src="https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto" alt="Booking Hero" className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Đặt Tour Trải Nghiệm</h1>
            <p className={styles.heroTagline}>Khám phá Tây Nguyên an toàn, dễ dàng chỉ với vài bước!</p>
            <p className={styles.heroDescription}>Chọn tour, điền thông tin, chọn dịch vụ bổ sung và thanh toán trực tuyến. Đội ngũ Wandolo sẽ đồng hành cùng bạn trên mọi hành trình.</p>
          </div>
        </div>
      </section>

      {/* Header */}
      <div className={styles.bookingHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <button onClick={() => navigate(`/tours/${tourId}`)} className={styles.backButton}>
              <ArrowLeft size={20} />
              Quay lại tour
            </button>
            <h1>Đặt tour: {tour.title}</h1>
          </div>
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
              {/* Step 1: VO2 Max Test */}
              {currentStep === 1 && (
                <div className={styles.stepContent}>
                  <div className={styles.healthCheckHeader}>
                    <h2>Kiểm tra sức khỏe</h2>
                    <p>Để đảm bảo an toàn và hiệu quả cho chuyến đi, chúng tôi yêu cầu bạn thực hiện một số xét nghiệm sức khỏe cơ bản.</p>
                  </div>

                  <div className={styles.vo2TestForm}>
                    <div className={styles.testInstructions}>
                      <h3>Hướng dẫn kiểm tra</h3>
                      <div className={styles.instructionCard}>
                        <div className={styles.instructionStep}>
                          <span className={styles.stepNumber}>1</span>
                          <div>
                            <h4>Đo nhịp tim lúc nghỉ ngơi</h4>
                            <p>Đặt hai ngón tay lên cổ tay hoặc cổ, đếm số nhịp trong 20 giây, sau đó nhân với 3.</p>
                          </div>
                        </div>
                        <div className={styles.instructionStep}>
                          <span className={styles.stepNumber}>2</span>
                          <div>
                            <h4>Đo thời gian đi bộ</h4>
                            <p>Đi bộ 1.6km (1 dặm) với tốc độ bình thường và ghi lại thời gian hoàn thành.</p>
                          </div>
                        </div>
                        <div className={styles.instructionStep}>
                          <span className={styles.stepNumber}>3</span>
                          <div>
                            <h4>Đo nhịp tim khi đi bộ</h4>
                            <p>Đo nhịp tim ngay sau khi hoàn thành 1.6km đi bộ.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formSection}>
                      <h3>Phương pháp tính toán</h3>
                      <div className="form-group">
                        <label>Chọn công thức tính VO₂ Max *</label>
                        <select
                          value={vo2TestData.testMethod}
                          onChange={(e) => handleVO2TestChange("testMethod", e.target.value)}
                          required
                          className="select-primary"
                        >
                          <option value="formula1">Công thức 1: Dựa trên nhịp tim lúc nghỉ ngơi</option>
                          <option value="formula2">Công thức 2: Dựa trên thời gian đi bộ 1 dặm</option>
                        </select>
                        <small>
                          {vo2TestData.testMethod === "formula1" 
                            ? "VO₂ max = 15.3 × (MHR / RHR) - Dựa trên nhịp tim lúc nghỉ ngơi"
                            : "VO₂ max = 132.853 - 0.0769×W - 0.3877×A + 6.315×G - 3.2649×T - 0.156×H - Dựa trên thời gian đi bộ"
                          }
                        </small>
                      </div>
                    </div>

                    <div className={styles.formSection}>
                      <h3>Thông tin cá nhân</h3>
                      <div className={styles.formRow}>
                        <div className="form-group">
                          <label>Tuổi *</label>
                          <input
                            type="number"
                            value={vo2TestData.age}
                            onChange={(e) => handleVO2TestChange("age", e.target.value)}
                            min="18"
                            max="65"
                            placeholder="Ví dụ: 25"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Giới tính *</label>
                          <select
                            value={vo2TestData.gender}
                            onChange={(e) => handleVO2TestChange("gender", e.target.value)}
                            required
                            className="select-primary"
                          >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className="form-group">
                          <label>Cân nặng (kg) *</label>
                          <input
                            type="number"
                            value={vo2TestData.weight}
                            onChange={(e) => handleVO2TestChange("weight", e.target.value)}
                            min="40"
                            max="150"
                            placeholder="Ví dụ: 65"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Chiều cao (cm) *</label>
                          <input
                            type="number"
                            value={vo2TestData.height}
                            onChange={(e) => handleVO2TestChange("height", e.target.value)}
                            min="140"
                            max="200"
                            placeholder="Ví dụ: 170"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.formSection}>
                      <h3>Kết quả kiểm tra</h3>
                      <div className={styles.formRow}>
                        <div className="form-group">
                          <label>Nhịp tim lúc nghỉ ngơi (bpm) *</label>
                          <input
                            type="number"
                            value={vo2TestData.restingHeartRate}
                            onChange={(e) => handleVO2TestChange("restingHeartRate", e.target.value)}
                            min="40"
                            max="100"
                            placeholder="Ví dụ: 72"
                            required
                          />
                          <small>Đếm nhịp tim trong 20 giây × 3</small>
                        </div>
                        <div className="form-group">
                          <label>Thời gian đi bộ 1.6km (phút) *</label>
                          <input
                            type="number"
                            value={vo2TestData.walkingTime}
                            onChange={(e) => handleVO2TestChange("walkingTime", e.target.value)}
                            min="10"
                            max="60"
                            placeholder="Ví dụ: 15"
                            required
                          />
                          <small>Thời gian hoàn thành 1.6km đi bộ</small>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Nhịp tim khi đi bộ (bpm) *</label>
                        <input
                          type="number"
                          value={vo2TestData.walkingHeartRate}
                          onChange={(e) => handleVO2TestChange("walkingHeartRate", e.target.value)}
                          min="100"
                          max="200"
                          placeholder="Ví dụ: 140"
                          required
                        />
                        <small>Đo ngay sau khi hoàn thành 1.6km</small>
                      </div>
                    </div>

                  </div>

                  <div className={styles.vo2Actions}>
                    <button onClick={handleVO2TestSubmit} className="btn secondary" disabled={!vo2TestData.age || !vo2TestData.gender || !vo2TestData.weight || !vo2TestData.height || !vo2TestData.restingHeartRate || !vo2TestData.walkingTime || !vo2TestData.walkingHeartRate || !vo2TestData.testMethod}>
                      Xác nhận kết quả VO2 Max
                    </button>
                  </div>

                  {vo2Result && (
                    <div className={styles.vo2Result}>
                      <div className={styles.resultCard}>
                        <h3>Kết quả kiểm tra sức khỏe</h3>
                        
                        <div className={styles.vo2Display}>
                          <div className={styles.vo2Value}>
                            <span className={styles.vo2Number}>{vo2Result.value.toFixed(1)}</span>
                            <span className={styles.vo2Unit}>ml/kg/phút</span>
                          </div>
                          <div className={styles.vo2Method}>
                            <span>{vo2Result.method}</span>
                          </div>
                        </div>

                        {(() => {
                          const compatibility = checkVO2Compatibility(vo2Result.value, parseInt(vo2TestData.age), vo2TestData.gender)
                          return (
                            <div className={`${styles.compatibilityResult} ${compatibility.compatible ? styles.compatible : styles.incompatible}`}>
                              <div className={styles.compatibilityHeader}>
                                <CheckCircle size={20} className={styles.compatibilityIcon} />
                                <span className={styles.compatibilityTitle}>
                                  {compatibility.compatible ? "Đủ điều kiện tham gia" : "Không đủ điều kiện tham gia"}
                                </span>
                              </div>
                              
                              <div className={styles.compatibilityDetails}>
                                <div className={styles.requirementRow}>
                                  <span>VO₂ Max của bạn:</span>
                                  <span className={styles.actualValue}>{vo2Result.value.toFixed(1)} ml/kg/phút</span>
                                </div>
                                <div className={styles.requirementRow}>
                                  <span>Yêu cầu tối thiểu:</span>
                                  <span className={styles.requiredValue}>{compatibility.required} ml/kg/phút</span>
                                </div>
                                <div className={styles.requirementRow}>
                                  <span>Chênh lệch:</span>
                                  <span className={`${styles.differenceValue} ${compatibility.difference >= 0 ? styles.positive : styles.negative}`}>
                                    {compatibility.difference >= 0 ? "+" : ""}{compatibility.difference.toFixed(1)} ml/kg/phút
                                  </span>
                                </div>
                              </div>

                              {!compatibility.compatible && (
                                <div className={styles.warningMessage}>
                                  <AlertTriangle size={16} />
                                  <span>Để tham gia tour này, bạn cần cải thiện thể lực hoặc chọn tour có độ khó thấp hơn.</span>
                                </div>
                              )}
                            </div>
                          )
                        })()}
                      </div>
                      
                      {/* Button Tiếp tục sau kết quả */}
                      <div className={styles.vo2ContinueActions}>
                        <button 
                          onClick={handleNextStep} 
                          className={`btn primary ${!checkVO2Compatibility(vo2Result.value, parseInt(vo2TestData.age), vo2TestData.gender).compatible ? styles.warningButton : ''}`}
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Warning Section */}
                  {warningData && (
                    <div className={styles.warningSection}>
                      <div className={styles.warningCard}>
                        {/* Debug info */}
                        <div style={{display: 'none'}}>
                          {console.log('Warning data in render:', warningData)}
                          {console.log('Current VO2:', warningData.currentVO2)}
                          {console.log('Required:', warningData.required)}
                          {console.log('Difference:', warningData.difference)}
                        </div>
                        <div className={styles.warningHeader}>
                          <div className={styles.warningIcon}>
                            <AlertTriangle size={24} />
                          </div>
                          <div>
                            <h3>Cảnh báo sức khỏe</h3>
                            <p>VO₂ Max của bạn không đủ để tham gia tour này</p>
                          </div>
                        </div>

                        <div className={styles.vo2Stats}>
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>{warningData.currentVO2}</div>
                            <div className={styles.statLabel}>VO₂ Max hiện tại</div>
                          </div>
                          <div className={styles.statDivider}>
                            <div className={styles.dividerLine}></div>
                            <div className={styles.dividerText}>cần</div>
                          </div>
                                                      <div className={styles.statCard}>
                              <div className={styles.statValue}>{warningData.required}</div>
                              <div className={styles.statLabel}>Yêu cầu tối thiểu</div>
                            </div>
                        </div>

                        <div className={styles.risksSection}>
                          <h4>Rủi ro có thể gặp:</h4>
                          <div className={styles.riskList}>
                            <div className={styles.riskItem}>
                              <div className={styles.riskIcon}>⚠️</div>
                              <span>Khó thở và mệt mỏi nhanh chóng</span>
                            </div>
                            <div className={styles.riskItem}>
                              <div className={styles.riskIcon}>⚠️</div>
                              <span>Nguy cơ chấn thương cao hơn</span>
                            </div>
                            <div className={styles.riskItem}>
                              <div className={styles.riskIcon}>⚠️</div>
                              <span>Khó theo kịp nhóm</span>
                            </div>
                            <div className={styles.riskItem}>
                              <div className={styles.riskIcon}>⚠️</div>
                              <span>Nguy cơ say độ cao (nếu tour có leo núi)</span>
                            </div>
                            <div className={styles.riskItem}>
                              <div className={styles.riskIcon}>⚠️</div>
                              <span>Thời gian phục hồi lâu hơn sau tour</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.improvementSection}>
                          <h4>Để cải thiện VO₂ Max:</h4>
                          <div className={styles.improvementList}>
                            <div className={styles.improvementItem}>
                              <div className={styles.improvementIcon}>🏃‍♂️</div>
                              <span>Chạy bộ 30-45 phút, 3-4 lần/tuần</span>
                            </div>
                            <div className={styles.improvementItem}>
                              <div className={styles.improvementIcon}>🚴‍♂️</div>
                              <span>Đạp xe hoặc bơi lội để tăng sức bền</span>
                            </div>
                            <div className={styles.improvementItem}>
                              <div className={styles.improvementIcon}>🏋️‍♂️</div>
                              <span>Tập luyện cường độ cao (HIIT) 2-3 lần/tuần</span>
                            </div>
                            <div className={styles.improvementItem}>
                              <div className={styles.improvementIcon}>🥗</div>
                              <span>Ăn uống lành mạnh, đủ protein và carbs</span>
                            </div>
                            <div className={styles.improvementItem}>
                              <div className={styles.improvementIcon}>😴</div>
                              <span>Ngủ đủ 7-8 tiếng/ngày để phục hồi</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.tourInfoSection}>
                          <h4>Thông tin tour hiện tại:</h4>
                          <div className={styles.tourDetails}>
                            <div className={styles.tourDetail}>
                              <span className={styles.detailLabel}>Độ khó:</span>
                              <span className={styles.detailValue}>{tour.difficulty}</span>
                            </div>
                            <div className={styles.tourDetail}>
                              <span className={styles.detailLabel}>Thời gian:</span>
                              <span className={styles.detailValue}>{tour.duration}</span>
                            </div>
                            <div className={styles.tourDetail}>
                              <span className={styles.detailLabel}>Địa điểm:</span>
                              <span className={styles.detailValue}>{tour.location}</span>
                            </div>
                            <div className={styles.tourDetail}>
                              <span className={styles.detailLabel}>Chênh lệch VO₂:</span>
                              <span className={styles.detailValue}>{warningData.difference} ml/kg/phút</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.warningActions}>
                          <button onClick={handleWarningCancel} className="btn secondary">
                            Hủy bỏ
                          </button>
                          <button onClick={handleWarningConfirm} className="btn primary">
                            Vẫn tiếp tục
                          </button>
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              )}

              {/* Step 2: Date & Participants */}
              {currentStep === 2 && (
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

                  <div className={styles.stepActions}>
                    <button onClick={handlePrevStep} className="btn secondary">
                      Quay lại
                    </button>
                    <button onClick={handleNextStep} className="btn primary" disabled={!selectedDate}>
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Customer Information */}
              {currentStep === 3 && (
                <div className={styles.stepContent}>
                  <h2>Thông tin khách hàng</h2>

                  {isAuthenticated && user ? (
                    <div className={styles.autoFillNotice}>
                      <CheckCircle size={16} />
                      <span>Thông tin đã được điền sẵn từ tài khoản của bạn</span>
                      <button 
                        className={styles.clearButton}
                        onClick={() => setCustomerInfoState({
                          name: "",
                          email: "",
                          phone: "",
                          emergencyContact: "",
                          specialRequests: "",
                        })}
                        title="Xóa thông tin đã điền sẵn"
                      >
                        Xóa
                      </button>
                    </div>
                  ) : (
                    <div className={styles.loginPrompt}>
                      <MessageCircle size={16} />
                      <span>Đăng nhập để tự động điền thông tin và nhận ưu đãi đặc biệt</span>
                      <button 
                        className={styles.loginButton}
                        onClick={() => navigate("/login")}
                      >
                        Đăng nhập
                      </button>
                    </div>
                  )}

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

              {/* Step 4: Add-ons */}
              {currentStep === 4 && (
                <div className={styles.stepContent}>
                  <h2>Dịch vụ bổ sung</h2>

                  <div className={styles.addOns}>
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

              {/* Step 5: Payment */}
              {currentStep === 5 && (
                <div className={styles.stepContent}>
                  <h2>Thanh toán</h2>

                  {/* Discount Section */}
                  <div className={styles.discountSection}>
                    {/* Show heading only for first booking */}
                    {isFirstBookingAfterRegister && (
                      <h3>🎉 Mã giảm giá cho booking đầu tiên</h3>
                    )}
                    
                    {/* Show discount note only for first booking */}
                    {isFirstBookingAfterRegister && (
                      <p className={styles.discountNote}>
                        💡 Bạn có mã giảm giá đặc biệt cho booking đầu tiên! Mã này chỉ có hiệu lực một lần duy nhất.
                      </p>
                    )}
                    
                    {storedDiscount && !appliedDiscount && isFirstBookingAfterRegister && (
                      <div className={styles.storedDiscount}>
                        <span className={styles.storedDiscountText}>
                          💎 Mã giảm giá: <strong>{storedDiscount.code}</strong> (Giảm {storedDiscount.percentage}%)
                        </span>
                        <button 
                          onClick={() => {
                            setDiscountCode(storedDiscount.code)
                            setAppliedDiscount(storedDiscount)
                          }}
                          className={styles.applyStoredDiscount}
                        >
                          Áp dụng
                        </button>
                      </div>
                    )}
                    
                    <div className={styles.discountInput}>
                      <div className={styles.inputGroup}>
                        <Tag className={styles.inputIcon} size={20} />
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          placeholder="Nhập mã giảm giá"
                          className={discountError ? styles.inputError : ""}
                        />
                        {appliedDiscount ? (
                          <button 
                            onClick={handleRemoveDiscount}
                            className={styles.removeDiscount}
                          >
                            Xóa
                          </button>
                        ) : (
                          <button 
                            onClick={handleApplyDiscount}
                            className={styles.applyDiscount}
                          >
                            Áp dụng
                          </button>
                        )}
                      </div>
                      {discountError && (
                        <span className={styles.errorMessage}>{discountError}</span>
                      )}
                      {appliedDiscount && (
                        <div className={styles.appliedDiscount}>
                          <CheckCircle size={16} />
                          <span>Đã áp dụng mã {appliedDiscount.code} - Giảm {appliedDiscount.percentage}%</span>
                        </div>
                      )}
                    </div>
                  </div>

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
                      <input 
                        type="checkbox" 
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        required 
                      />
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
                    <button 
                      onClick={handleBookingSubmit} 
                      className="btn primary"
                      disabled={!paymentMethod || !agreeToTerms}
                    >
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

                    {appliedDiscount && (
                      <div className={styles.priceItem}>
                        <span>Giảm giá ({appliedDiscount.code})</span>
                        <span className={styles.discountAmount}>-{formatPrice(calculateDiscountAmount())}</span>
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
