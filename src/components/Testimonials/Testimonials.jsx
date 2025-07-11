import { Star, Quote } from "lucide-react"
import styles from "./Testimonials.module.scss"

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      location: "TP. Hồ Chí Minh",
      rating: 5,
      comment:
        "Tour Hồn Churu thật sự tuyệt vời! Hướng dẫn viên rất chuyên nghiệp, an toàn được đảm bảo tuyệt đối. Mình đã có những trải nghiệm văn hóa rất sâu sắc với người dân địa phương.",
      tour: "Hồn Churu giữa Đại Ngàn",
      avatar: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
    },
    {
      id: 2,
      name: "Trần Đức Thành",
      location: "Hà Nội",
      rating: 5,
      comment:
        "Lần đầu đi trekking nhưng cảm thấy rất an tâm với Wandolo. Đội ngũ hỗ trợ tận tình, thiết bị chất lượng cao. Đặc biệt ấn tượng với app GPS tracking và tính năng SOS.",
      tour: "Viên Ngọc Ẩn giữa Cao Nguyên",
      avatar: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
    },
    {
      id: 3,
      name: "Lê Thị Hương",
      location: "Đà Nẵng",
      rating: 5,
      comment:
        "Tour B'Lao Tea Hill hoàn hảo cho những ai muốn thư giãn và khám phá. Cảnh đẹp, không khí trong lành, và được học về văn hóa trà rất thú vị. Sẽ quay lại chắc chắn!",
      tour: "B'Lao The Tea Hill",
      avatar: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
    },
  ]

  return (
    <section className={`${styles.testimonials} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Khách hàng nói gì về chúng tôi</h2>
          <p>Những trải nghiệm thực tế từ các khách hàng đã tham gia tours của Wandolo</p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>
                <Quote />
              </div>

              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className={styles.star} fill="currentColor" />
                ))}
              </div>

              <p className={styles.comment}>{testimonial.comment}</p>

              <div className={styles.customerInfo}>
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className={styles.avatar} />
                <div className={styles.customerDetails}>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.location}</p>
                  <span className={styles.tourName}>{testimonial.tour}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
