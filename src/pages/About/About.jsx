import { Shield, Heart, Compass, Users, Award, Target } from "lucide-react"
import styles from "./About.module.scss"

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description:
        "Mọi cuộc phiêu lưu của Wandolo đều được xây dựng dựa trên các tiêu chuẩn an toàn nghiêm ngặt, từ thiết kế lộ trình, lựa chọn trang thiết bị cho đến huấn luyện hướng dẫn viên.",
    },
    {
      icon: Heart,
      title: "Trải nghiệm văn hóa",
      description:
        "Wandolo không chỉ dẫn khách hàng đến các điểm đến đặc sắc mà còn lồng ghép những câu chuyện giàu ý nghĩa tại mỗi địa danh thông qua storytelling.",
    },
    {
      icon: Compass,
      title: "Tinh thần khám phá",
      description:
        "Wandolo truyền cảm hứng để khách hàng vượt qua vùng an toàn của bản thân bằng việc kết hợp những thử thách thể chất với khám phá văn hóa.",
    },
  ]

  const team = [
    {
      name: "Trần Duy Long",
      position: "CEO & Co-founder",
      description:
        "Lãnh đạo tầm nhìn và chiến lược tổng thể của Wandolo, đảm bảo công ty đi đúng hướng và đạt được các mục tiêu dài hạn.",
      avatar: "/public/assets/The-Latest-Trends-in-Adventure-Travel.webp",
    },
    {
      name: "Nguyễn Ngọc Hà Viên",
      position: "COO & Co-founder",
      description:
        "Quản lý và giám sát các hoạt động hàng ngày, đảm bảo chất lượng dịch vụ và trải nghiệm tuyệt vời cho khách hàng.",
      avatar: "/public/assets/The-Latest-Trends-in-Adventure-Travel.webp",
    },
    {
      name: "Nguyễn Huỳnh Tấn Tài",
      position: "CMO & Co-founder",
      description:
        "Chịu trách nhiệm về chiến lược marketing và phát triển thương hiệu, đảm bảo Wandolo có sự hiện diện mạnh mẽ trên thị trường.",
      avatar: "/public/assets/The-Latest-Trends-in-Adventure-Travel.webp",
    },
    {
      name: "Lê Thanh Hiền",
      position: "HR Manager & Co-founder",
      description:
        "Quản lý công nghệ và phát triển nền tảng kỹ thuật số, đảm bảo hệ thống vận hành hiệu quả và bảo mật.",
      avatar: "/public/assets/The-Latest-Trends-in-Adventure-Travel.webp",
    },
    {
      name: "Lê Tân Vy",
      position: "CFO & Co-founder",
      description:
        "Quản lý các vấn đề tài chính, lập kế hoạch ngân sách và đảm bảo công ty duy trì sự ổn định tài chính.",
      avatar: "/public/assets/The-Latest-Trends-in-Adventure-Travel.webp",
    },
  ]

  const stats = [
    { number: "500+", label: "Khách hàng hài lòng" },
    { number: "5", label: "Tours độc đáo" },
    { number: "100%", label: "An toàn đảm bảo" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ]

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.aboutHero}>
        <div className={styles.heroBackground}>
          <img src="/public/assets/The-Latest-Trends-in-Adventure-Travel.webp" alt="About Wandolo" className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Về Wandolo</h1>
            <p className={styles.heroTagline}>"Wander no Wondering" - Lang thang khám phá mà không lo âu</p>
            <p className={styles.heroDescription}>
              Chúng tôi là những người đam mê khám phá, mang đến những hành trình du lịch mạo hiểm an toàn, chân thực và
              đậm đà bản sắc văn hóa bản địa Việt Nam.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Company Introduction */}
        <section className={`${styles.section} ${styles.introduction}`}>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2>Wandolo là gì?</h2>
              <p>
                Wandolo là một công ty du lịch khởi nghiệp, chuyên mang đến những trải nghiệm du lịch mạo hiểm độc đáo,
                kết hợp hài hòa với các yếu tố văn hóa bản địa. Chúng tôi kết nối những du khách đam mê khám phá và
                phiêu lưu với những hướng dẫn viên chuyên nghiệp, không chỉ có kinh nghiệm vượt trội trong các hoạt động
                mạo hiểm mà còn am hiểu sâu sắc về văn hóa và lịch sử địa phương.
              </p>
              <p>
                Với cam kết tạo ra các chuyến đi an toàn, chân thực và mang đậm dấu ấn văn hóa, Wandolo không chỉ cung
                cấp những tour du lịch mạo hiểm thú vị mà còn góp phần quảng bá các giá trị văn hóa đặc sắc của từng
                cộng đồng địa phương.
              </p>
            </div>
            <div className={styles.introImage}>
              <img src="/public/assets/The-Latest-Trends-in-Adventure-Travel.webp" alt="Wandolo Team" />
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className={`${styles.section} ${styles.visionMission}`}>
          <div className={styles.vmGrid}>
            <div className={styles.vmCard}>
              <Target className={styles.vmIcon} />
              <h3>Tầm nhìn</h3>
              <p>
                Trở thành công ty hàng đầu trong lĩnh vực du lịch mạo hiểm gắn với bản sắc địa phương tại Việt Nam, tiên
                phong xây dựng mô hình du lịch chuyên nghiệp, an toàn và bền vững.
              </p>
            </div>
            <div className={styles.vmCard}>
              <Compass className={styles.vmIcon} />
              <h3>Sứ mệnh</h3>
              <p>
                Mang đến cho du khách những trải nghiệm du lịch mạo hiểm đích thực, kết nối họ với thiên nhiên hoang sơ
                và văn hóa bản địa Việt Nam thông qua đội ngũ hướng dẫn viên du lịch mạo hiểm chuyên nghiệp.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className={`${styles.section} ${styles.coreValues}`}>
          <div className={styles.sectionHeader}>
            <h2>Giá trị cốt lõi</h2>
            <p>Những giá trị định hướng mọi hoạt động của Wandolo</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <value.icon />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className={`${styles.section} ${styles.statistics}`}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className={`${styles.section} ${styles.team}`}>
          <div className={styles.sectionHeader}>
            <h2>Đội ngũ sáng lập</h2>
            <p>Những người đồng hành xây dựng Wandolo</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.memberAvatar}>
                  <img src={member.avatar} alt={member.name} />
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.memberPosition}>{member.position}</p>
                  <p className={styles.memberDescription}>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={`${styles.section} ${styles.whyChoose}`}>
          <div className={styles.whyContent}>
            <div className={styles.whyText}>
              <h2>Tại sao chọn Wandolo?</h2>
              <div className={styles.whyPoints}>
                <div className={styles.whyPoint}>
                  <Award className={styles.whyIcon} />
                  <div>
                    <h4>Hướng dẫn viên được xác thực</h4>
                    <p>Đội ngũ hướng dẫn viên có chứng chỉ chuyên môn và được đào tạo bài bản</p>
                  </div>
                </div>
                <div className={styles.whyPoint}>
                  <Shield className={styles.whyIcon} />
                  <div>
                    <h4>Ứng dụng công nghệ hiện đại</h4>
                    <p>GPS tracking, SOS khẩn cấp, AI chatbot 24/7 và video call với hướng dẫn viên</p>
                  </div>
                </div>
                <div className={styles.whyPoint}>
                  <Users className={styles.whyIcon} />
                  <div>
                    <h4>Đánh giá và giảm thiểu rủi ro</h4>
                    <p>Quy trình đánh giá rủi ro chặt chẽ trước mỗi tour để đảm bảo an toàn tối đa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.whyImage}>
              <img src="/public/assets/The-Latest-Trends-in-Adventure-Travel.webp" alt="Why Choose Wandolo" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
