"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"
import styles from "./Contact.module.scss"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ văn phòng",
      content: "Diamond Plaza, 34 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM",
      link: "https://maps.google.com",
    },
    {
      icon: Phone,
      title: "Số điện thoại",
      content: "0123 456 789",
      link: "tel:+84123456789",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@wandolo.vn",
      link: "mailto:hello@wandolo.vn",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 8:00 - 17:30\nThứ 7: 8:00 - 12:00",
      link: null,
    },
  ]

  const faqs = [
    {
      question: "Wandolo có đảm bảo an toàn cho khách hàng không?",
      answer:
        "Chúng tôi cam kết an toàn tuyệt đối với đội ngũ hướng dẫn viên được đào tạo chuyên nghiệp, thiết bị đạt chuẩn quốc tế, bảo hiểm toàn diện và quy trình an toàn nghiêm ngặt.",
    },
    {
      question: "Tôi có thể hủy tour không? Chính sách hoàn tiền như thế nào?",
      answer:
        "Bạn có thể hủy tour trước 7 ngày để được hoàn tiền 100%. Hủy từ 3-7 ngày trước sẽ được hoàn 50%. Hủy trong vòng 3 ngày sẽ không được hoàn tiền.",
    },
    {
      question: "Tours của Wandolo phù hợp với người mới bắt đầu không?",
      answer:
        "Có, chúng tôi có các tour soft adventure phù hợp với người mới bắt đầu. Mỗi tour đều được phân loại độ khó rõ ràng để bạn lựa chọn phù hợp.",
    },
    {
      question: "Wandolo có cung cấp thiết bị không?",
      answer:
        "Chúng tôi cung cấp các thiết bị an toàn cơ bản. Bạn cũng có thể thuê hoặc mua thiết bị chuyên dụng thông qua đối tác của chúng tôi.",
    },
  ]

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.contactHero}>
        <div className={styles.heroBackground}>
          <img src="/public/assets/The-Latest-Trends-in-Adventure-Travel.webp" alt="Contact Us" className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Liên hệ với chúng tôi</h1>
            <p>Sẵn sàng cho cuộc phiêu lưu tiếp theo? Hãy liên hệ để được tư vấn chi tiết!</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.contactContent}>
          {/* Contact Form & Info */}
          <div className={styles.contactMain}>
            {/* Contact Form */}
            <div className={styles.contactForm}>
              <h2>Gửi tin nhắn cho chúng tôi</h2>
              <p>Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label htmlFor="name">Họ và tên *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập địa chỉ email"
                  />
                </div>

                                  <div className="form-group">
                    <label htmlFor="subject">Chủ đề</label>
                    <div className="select-wrapper">
                      <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className="select-primary">
                        <option value="">Chọn chủ đề</option>
                        <optgroup label="Dịch vụ chính">
                          <option value="booking">Đặt tour</option>
                          <option value="info">Tư vấn thông tin</option>
                        </optgroup>
                        <optgroup label="Hỗ trợ">
                          <option value="complaint">Khiếu nại</option>
                          <option value="partnership">Hợp tác</option>
                          <option value="other">Khác</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                <div className="form-group">
                  <label htmlFor="message">Tin nhắn *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Nhập tin nhắn của bạn..."
                  ></textarea>
                </div>

                <button type="submit" className="btn primary">
                  <Send size={20} />
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2>Thông tin liên hệ</h2>
              <p>Bạn có thể liên hệ với chúng tôi qua các kênh sau:</p>

              <div className={styles.contactMethods}>
                {contactInfo.map((info, index) => (
                  <div key={index} className={styles.contactMethod}>
                    <div className={styles.methodIcon}>
                      <info.icon />
                    </div>
                    <div className={styles.methodContent}>
                      <h3>{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} target={info.link.startsWith("http") ? "_blank" : "_self"}>
                          {info.content}
                        </a>
                      ) : (
                        <p>{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.quickContact}>
                <h3>Liên hệ nhanh</h3>
                <div className={styles.quickButtons}>
                  <a href="tel:+84123456789" className="contact-btn">
                    <Phone size={20} />
                    Gọi ngay
                  </a>
                  <button className="contact-btn">
                    <MessageCircle size={20} />
                    Chat Zalo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className={`${styles.section} ${styles.faqSection}`}>
            <div className={styles.sectionHeader}>
              <h2>Câu hỏi thường gặp</h2>
              <p>Những câu hỏi phổ biến từ khách hàng</p>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Map Section */}
          <section className={`${styles.section} ${styles.mapSection}`}>
            <div className={styles.sectionHeader}>
              <h2>Vị trí văn phòng</h2>
              <p>Ghé thăm văn phòng của chúng tôi để được tư vấn trực tiếp</p>
            </div>
            
            <div className={styles.mapContainer}>
              <div className={styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241840887027!2d106.6983!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM2LjgiTiAxMDbCsDQxJzUzLjgiRQ!5e0!3m2!1svi!2s!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Văn phòng Wandolo - Diamond Plaza"
                  className={styles.mapIframe}
                ></iframe>
                <div className={styles.mapOverlay}>
                  <h3>Văn phòng Wandolo</h3>
                  <p>Diamond Plaza, 34 Lê Duẩn<br />
                  Phường Bến Nghé, Quận 1, TP.HCM</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact
