import { useState, useEffect } from "react"
import { X, Copy, CheckCircle } from "lucide-react"
import styles from "./DiscountPopup.module.scss"

const DiscountPopup = ({ isOpen, onClose, discountCode, discountPercent }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className={styles.visualSection}>
          <div className={styles.visualIcon}>🎉</div>
          <div className={styles.visualTitle}>Chúc mừng!</div>
          <div className={styles.visualSubtitle}>Đăng ký thành công</div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <span className={styles.celebrationIcon}>💎</span>
          </div>
          
          <div className={styles.title}>
            🎉 Chào mừng bạn đến với Wandolo!
          </div>
          <div className={styles.description}>
            Bạn đã nhận được mã giảm giá <strong>10%</strong> cho booking đầu tiên!
          </div>
          
          <div className={styles.discountCard}>
            <div className={styles.discountInfo}>
              <span className={styles.discountPercent}>{discountPercent}% OFF</span>
              <span className={styles.discountLabel}>Giảm giá cho booking đầu tiên</span>
            </div>
            
            <div className={styles.codeContainer}>
              <div className={styles.codeDisplay}>
                <span className={styles.codeText}>{discountCode}</span>
                <button 
                  className={styles.copyButton} 
                  onClick={handleCopyCode}
                  title="Sao chép mã"
                >
                  {copied ? (
                    <CheckCircle size={20} className={styles.copyIcon} />
                  ) : (
                    <Copy size={20} className={styles.copyIcon} />
                  )}
                </button>
              </div>
              {copied && (
                <span className={styles.copiedMessage}>Đã sao chép!</span>
              )}
            </div>
          </div>
          
          <div className={styles.instructions}>
            <p>💡 <strong>Hướng dẫn sử dụng:</strong></p>
            <ul>
              <li>Mã này chỉ có hiệu lực cho booking đầu tiên của bạn</li>
              <li>Nhập mã khi thanh toán để được giảm giá</li>
              <li>Mã có hiệu lực trong 30 ngày</li>
            </ul>
          </div>
          
          <button className={styles.continueButton} onClick={onClose}>
            Tiếp tục khám phá
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscountPopup
