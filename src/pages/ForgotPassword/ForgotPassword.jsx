import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, ArrowLeft } from "lucide-react"
import styles from "./ForgotPassword.module.scss"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ"
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
      
      // TODO: Implement actual forgot password logic
      console.log("Forgot password request:", email)
      
      setIsSuccess(true)
      
      // Navigate to verify code page after 2 seconds
      setTimeout(() => {
        navigate("/verify-code", { state: { email } })
      }, 2000)
      
    } catch (error) {
      console.error("Forgot password error:", error)
      setErrors({ general: "Có lỗi xảy ra. Vui lòng thử lại." })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.forgotPasswordContainer}>
        <div className={styles.forgotPasswordCard}>
          <div className={styles.imageSection}>
            <img src="/3.jpg" alt="Success" className={styles.heroImage} />
          </div>
          
          <div className={styles.formSection}>
            <div className={styles.successContent}>
              <div className={styles.logoWrapper}>
                <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
                <h1>WANDOLO</h1>
              </div>
              <h2>Email đã được gửi!</h2>
              <p>
                Chúng tôi đã gửi link reset mật khẩu đến email của bạn. 
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </p>
              <div className={styles.redirectInfo}>
                <p>Đang chuyển hướng đến trang xác minh...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordCard}>
        <div className={styles.imageSection}>
          <img src="/3.jpg" alt="Forgot Password" className={styles.heroImage} />
        </div>
        
        <div className={styles.formSection}>
          <div className={styles.backButton}>
            <Link to="/login" className={styles.backLink}>
              <ArrowLeft size={20} />
              Đăng nhập
            </Link>
          </div>

          <div className={styles.forgotPasswordHeader}>
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
                <h1>WANDOLO</h1>
              </div>
              <h2>Quên mật khẩu</h2>
              <p>
                Đừng lo lắng, điều này xảy ra với tất cả chúng ta. Nhập email 
                của bạn bên dưới để khôi phục mật khẩu.
              </p>
            </div>
          </div>

          <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="john.doe@gmail.com"
                  className={errors.email ? styles.inputError : ""}
                />
              </div>
              {errors.email && (
                <span className={styles.fieldError}>{errors.email}</span>
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
                "Xác nhận"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
