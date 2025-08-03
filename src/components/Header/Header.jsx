"use client"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { toggleMobileMenu, closeMobileMenu } from "../../store/slices/uiSlice"
import styles from "./Header.module.scss"

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { mobileMenuOpen } = useSelector((state) => state.ui)

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ]

  const handleLinkClick = () => {
    dispatch(closeMobileMenu())
  }

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
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
