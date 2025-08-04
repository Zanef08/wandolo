import { Shield, Heart, Compass, Users, Award, Smartphone } from "lucide-react"
import styles from "./WhyChooseUs.module.scss"

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description: "Hướng dẫn viên được đào tạo chuyên nghiệp, thiết bị đạt chuẩn quốc tế, bảo hiểm toàn diện",
    },
    {
      icon: Heart,
      title: "Trải nghiệm văn hóa",
      description: "Kết nối sâu sắc với văn hóa bản địa qua storytelling và tương tác với cộng đồng địa phương",
    },
    {
      icon: Compass,
      title: "Tinh thần khám phá",
      description: "Những hành trình được thiết kế để thử thách bản thân và khám phá giới hạn cá nhân",
    },
    {
      icon: Users,
      title: "Nhóm nhỏ, riêng tư",
      description: "Tối đa 10 người/tour để đảm bảo trải nghiệm cá nhân hóa và chăm sóc tận tình",
    },
    {
      icon: Award,
      title: "Chất lượng đảm bảo",
      description: "Đội ngũ hướng dẫn viên có chứng chỉ, quy trình vận hành được kiểm định nghiêm ngặt",
    },
    {
      icon: Smartphone,
      title: "Công nghệ hỗ trợ",
      description: "AI chatbot 24/7 trả lời thắc mắc về tour. AR tour cho phép xem trước địa điểm du lịch chân thực.",
    },
  ]

  return (
    <section className={`${styles.whyChooseUs} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Tại sao chọn Wandolo?</h2>
          <p>Chúng tôi cam kết mang đến những trải nghiệm du lịch mạo hiểm an toàn, chân thực và đầy ý nghĩa</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <feature.icon className={styles.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
