"use client"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Menu, X, Phone, MessageCircle, User, LogOut, ChevronDown, Calendar } from "lucide-react"
import { toggleMobileMenu, closeMobileMenu } from "../../store/slices/uiSlice"
import { logoutUser } from "../../store/slices/authSlice"
import { useState, useEffect, useRef } from "react"
import styles from "./Header.module.scss"

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { mobileMenuOpen } = useSelector((state) => state.ui)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ]

  const handleLinkClick = () => {
    dispatch(closeMobileMenu())
    setShowUserMenu(false)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    setShowUserMenu(false)
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={handleLinkClick}>
            <img src="/logo2.png" alt="Wandolo Logo" className={styles.logoIcon} />
            <span className={styles.logoText}>WANDOLO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${styles.navLink} ${location.pathname === item.href ? styles.active : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <a href="tel:+84123456789" className={styles.contactLink}>
              <Phone size={16} />
              <span>0123 456 789</span>
            </a>
            <button className={styles.chatButton}>
              <MessageCircle size={16} />
              <span>Chat</span>
            </button>
            {isAuthenticated && user ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button 
                  className={styles.userButton}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.fullName}
                    className={styles.userAvatar}
                  />
                  <span className={styles.userName}>{user.fullName}</span>
                  <ChevronDown size={16} className={styles.chevron} />
                </button>
                
                {showUserMenu && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <img 
                        src={user.avatar} 
                        alt={user.fullName}
                        className={styles.dropdownAvatar}
                      />
                      <div>
                        <p className={styles.dropdownName}>{user.fullName}</p>
                        <p className={styles.dropdownEmail}>{user.email}</p>
                      </div>
                    </div>
                    <div className={styles.menuDivider}></div>
                    <Link 
                      to="/my-booking" 
                      className={styles.menuItem}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Calendar size={16} />
                      <span>My Booking</span>
                    </Link>
                    <button 
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={styles.loginButton}>
                <User size={16} />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className={styles.mobileMenuButton} onClick={() => dispatch(toggleMobileMenu())}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={styles.mobileNav}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${styles.mobileNavLink} ${location.pathname === item.href ? styles.active : ""}`}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
            <div className={styles.mobileContact}>
              <a href="tel:+84123456789" className={styles.mobileContactLink}>
                <Phone size={16} />
                <span>0123 456 789</span>
              </a>
              <button className={styles.mobileChatButton}>
                <MessageCircle size={16} />
                <span>Chat với chúng tôi</span>
              </button>
              {isAuthenticated && user ? (
                <div className={styles.mobileUserInfo}>
                  <img 
                    src={user.avatar} 
                    alt={user.fullName}
                    className={styles.mobileAvatar}
                  />
                  <div className={styles.mobileUserDetails}>
                    <p className={styles.mobileUserName}>{user.fullName}</p>
                    <p className={styles.mobileUserEmail}>{user.email}</p>
                  </div>
                  <Link 
                    to="/my-booking" 
                    className={styles.mobileMenuItem}
                    onClick={handleLinkClick}
                  >
                    <Calendar size={16} />
                    <span>My Booking</span>
                  </Link>
                  <button 
                    className={styles.mobileLogoutButton}
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className={styles.mobileLoginButton} onClick={handleLinkClick}>
                  <User size={16} />
                  <span>Đăng nhập</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
