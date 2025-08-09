import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import styles from "./VerifyCode.module.scss"

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showResend, setShowResend] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const navigate = useNavigate()
  const location = useLocation()
  const inputRefs = useRef([])
  
  const email = location.state?.email || "john.doe@gmail.com"

  useEffect(() => {
    // Start countdown for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setShowResend(true)
    }
  }, [countdown])

  const handleChange = (index, value) => {
    if (value.length > 1) return // Only allow single digit
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Clear errors when user starts typing
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: "" }))
    }

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newCode = [...code]
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }
    
    setCode(newCode)
    
    // Focus the next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const validateForm = () => {
    const newErrors = {}
    const codeString = code.join("")

    if (codeString.length !== 6) {
      newErrors.code = "Vui lòng nhập đầy đủ mã xác minh"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const codeString = code.join("")
      console.log("Verify code:", codeString)
      
      // Navigate to reset password page
      navigate("/reset-password", { state: { email, code: codeString } })
      
    } catch (error) {
      console.error("Verify code error:", error)
      setErrors({ general: "Mã xác minh không đúng. Vui lòng thử lại." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setShowResend(false)
    setCountdown(60)
    
    try {
      // Simulate API call to resend code
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Resend code to:", email)
    } catch (error) {
      console.error("Resend code error:", error)
    }
  }

  return (
    <div className={styles.verifyCodeContainer}>
      <div className={styles.verifyCodeCard}>
        <div className={styles.imageSection}>
          <img src="/tg4.png" alt="Verify Code" className={styles.heroImage} />
        </div>
        
        <div className={styles.formSection}>
          <div className={styles.backButton}>
            <Link to="/login" className={styles.backLink}>
              <ArrowLeft size={20} />
              Đăng nhập
            </Link>
          </div>

          <div className={styles.verifyCodeHeader}>
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
                <h1>WANDOLO</h1>
              </div>
              <h2>Nhập mã xác minh</h2>
              <p>
                Mã xác thực đã được gửi tới email của bạn
              </p>
            </div>
          </div>

          <form className={styles.verifyCodeForm} onSubmit={handleSubmit}>
            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label>Nhập mã</label>
              <div className={styles.codeInputs}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`${styles.codeInput} ${errors.code ? styles.inputError : ""}`}
                    maxLength={1}
                  />
                ))}
              </div>
              {errors.code && (
                <span className={styles.fieldError}>{errors.code}</span>
              )}
            </div>

            <div className={styles.resendSection}>
              {showResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className={styles.resendButton}
                >
                  Gửi lại
                </button>
              ) : (
                <span className={styles.countdown}>
                  Không nhận được mã? <span>Gửi lại ({countdown}s)</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                "Xác thực"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyCode
