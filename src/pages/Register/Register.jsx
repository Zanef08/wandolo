import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { registerUser } from "../../store/slices/authSlice"
import styles from "./Register.module.scss"

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên là bắt buộc"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Họ tên phải có ít nhất 2 ký tự"
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại là bắt buộc"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản sử dụng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      const result = await dispatch(registerUser(formData))
      
      if (result.success) {
        // Navigate to home page after successful registration
        navigate("/")
      } else {
        setErrors({ general: result.error || "Đăng ký thất bại. Vui lòng thử lại." })
      }
    } catch (err) {
      console.error("Registration error:", err)
      setErrors({ general: "Đăng ký thất bại. Vui lòng thử lại." })
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.imageSection}>
          <img src="/tg2.png" alt="Wandolo Travel" className={styles.heroImage} />
        </div>
        
        <div className={styles.formSection}>
          <div className={styles.registerHeader}>
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
                <h1>WANDOLO</h1>
              </div>
              <p>Vui lòng điền thông tin để tạo tài khoản của bạn</p>
            </div>
          </div>

          <form className={styles.registerForm} onSubmit={handleSubmit}>
          {(errors.general || error) && (
            <div className={styles.errorMessage}>
              {errors.general || error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Họ và tên</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                className={errors.fullName ? styles.inputError : ""}
              />
            </div>
            {errors.fullName && (
              <span className={styles.fieldError}>{errors.fullName}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                className={errors.email ? styles.inputError : ""}
              />
            </div>
            {errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Số điện thoại</label>
            <div className={styles.inputWrapper}>
              <Phone className={styles.inputIcon} size={20} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className={errors.phone ? styles.inputError : ""}
              />
            </div>
            {errors.phone && (
              <span className={styles.fieldError}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tạo mật khẩu"
                className={errors.password ? styles.inputError : ""}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.fieldError}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className={errors.confirmPassword ? styles.inputError : ""}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.fieldError}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span>
                Tôi đồng ý với{" "}
                <Link to="/terms" className={styles.termsLink}>
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className={styles.termsLink}>
                  Chính sách bảo mật
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <span className={styles.fieldError}>{errors.agreeToTerms}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

          <div className={styles.registerFooter}>
            <p>
              Đã có tài khoản?{" "}
              <Link to="/login" className={styles.loginLink}>
                Đăng nhập ngay
              </Link>
            </p>
          </div>

          {/* <div className={styles.divider}>
            <span>Hoặc đăng ký bằng</span>
          </div>

          <div className={styles.socialLogin}>
            <button className={styles.socialButton}>
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
              Google
            </button>
            <button className={styles.socialButton}>
              <svg viewBox="0 0 24 24" className={styles.facebookIcon}>
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Register
