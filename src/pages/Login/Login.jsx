import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { loginUser } from "../../store/slices/authSlice"
import styles from "./Login.module.scss"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      const result = await dispatch(loginUser(formData))
      
      if (result.success) {
        // Navigate to home page or previous page after successful login
        const from = location.state?.from?.pathname || "/"
        navigate(from, { replace: true })
      } else {
        setErrors({ general: result.error || "Đăng nhập thất bại. Vui lòng thử lại." })
      }
    } catch (err) {
      console.error("Login error:", err)
      setErrors({ general: "Đăng nhập thất bại. Vui lòng thử lại." })
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.imageSection}>
          <img src="/tg1.png" alt="Wandolo Travel" className={styles.heroImage} />
        </div>
        
        <div className={styles.formSection}>
          <div className={styles.loginHeader}>
            <button 
              type="button" 
              className={styles.backButton}
              onClick={handleGoBack}
            >
              <ArrowLeft size={20} />
              Quay lại
            </button>
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
                <h1>WANDOLO</h1>
              </div>
              <h2>Đăng nhập</h2>
              <p>Đăng nhập để truy cập tài khoản Wandolo của bạn</p>
            </div>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
          {(errors.general || error) && (
            <div className={styles.errorMessage}>
              {errors.general || error}
            </div>
          )}
          
          {location.state?.message && (
            <div className={styles.successMessage}>
              {location.state.message}
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
            <label htmlFor="password">Mật khẩu</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
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

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

          <div className={styles.loginFooter}>
            <p>
              Chưa có tài khoản?{" "}
              <Link to="/register" className={styles.registerLink}>
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* <div className={styles.divider}>
            <span>Hoặc đăng nhập bằng</span>
          </div> */}

          {/* <div className={styles.socialLogin}>
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

export default Login
