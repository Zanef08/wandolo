import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tours: [
    {
      id: 1,
      title: "Hồn Churu giữa Đại Ngàn",
      location: "Làng Kon Klor, Kon Tum",
      duration: "2 ngày 1 đêm",
      difficulty: "Dễ",
      price: 2990000,
      maxPrice: 3990000,
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Khám phá văn hóa Churu độc đáo tại làng Kon Klor, trải nghiệm cuộc sống bản địa và thưởng thức ẩm thực truyền thống.",
      highlights: [
        "Thăm làng Churu cổ",
        "Trải nghiệm văn hóa bản địa",
        "Thưởng thức ẩm thực địa phương",
        "Ngắm hoàng hôn trên sông",
      ],
      included: [
        "Hướng dẫn viên địa phương",
        "Bảo hiểm du lịch",
        "Ăn uống đầy đủ",
        "Homestay chất lượng",
      ],
      guide: {
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        experience: "5 năm kinh nghiệm",
        age: 32,
        rating: 5.0,
        toursCompleted: 100,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Nhật"],
        bio: "A là một hướng dẫn viên giàu kinh nghiệm với niềm đam mê mãnh liệt với thiên nhiên và leo núi. Anh đã dẫn hàng trăm tour thành công và luôn đảm bảo an toàn tuyệt đối cho khách hàng.",
        specialties: ["Leo núi", "Trekking", "Sinh tồn", "Nhiếp ảnh"],
        certificates: [
          {
            name: "Chứng chỉ Hướng dẫn viên Du lịch Quốc gia",
            issuer: "Tổng cục Du lịch Việt Nam",
            year: 2020,
            verified: true
          },
          {
            name: "Chứng chỉ Sơ cấp cứu Wilderness",
            issuer: "Red Cross Vietnam",
            year: 2021,
            verified: true
          },
          {
            name: "Chứng chỉ Hướng dẫn Trekking Chuyên nghiệp",
            issuer: "Vietnam Trekking Association",
            year: 2018,
            verified: true
          },
          {
            name: "Chứng chỉ An toàn Leo núi Quốc tế",
            issuer: "International Mountain Safety",
            year: 2019,
            verified: true
          }
        ]
      },
      itinerary: {
        day1: {
          title: "Ngày 1: Khởi hành và khám phá",
          activities: [
            "06:00 - Tập trung tại điểm hẹn, khởi hành",
            "09:00 - Đến điểm đến, gặp gỡ hướng dẫn viên địa phương",
            "10:00 - Bắt đầu hành trình trekking",
            "12:00 - Nghỉ trưa và thưởng thức ẩm thực địa phương",
            "14:00 - Tiếp tục khám phá và trải nghiệm văn hóa",
            "18:00 - Check-in homestay/cắm trại",
            "19:30 - Bữa tối và giao lưu văn nghệ"
          ]
        },
        day2: {
          title: "Ngày 2: Hoàn thành hành trình",
          activities: [
            "06:00 - Thức dậy, ngắm bình minh",
            "07:00 - Ăn sáng và dọn dẹp",
            "08:30 - Trekking và khám phá thêm",
            "11:00 - Thăm làng nghề địa phương",
            "12:30 - Bữa trưa chia tay",
            "14:00 - Khởi hành về điểm ban đầu",
            "17:00 - Kết thúc hành trình"
          ]
        }
      },
      gallery: [
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"
      ],
      requirements: {
        fitness: "Phù hợp với người có sức khỏe tốt, có thể đi bộ liên tục 3-4 giờ.",
        ageRange: "Từ 16-55 tuổi. Trẻ em dưới 16 tuổi cần có người lớn đi kèm.",
        preparation: "Giày trekking, áo mưa, kem chống nắng, thuốc cá nhân."
      },
      maxPeople: 8,
      rating: 4.8,
      reviewCount: 24
    },
    {
      id: 2,
      title: "Viên Ngọc Ẩn giữa Cao Nguyên",
      location: "Hồ Tơ Nưng, Gia Lai",
      duration: "3 ngày 2 đêm",
      difficulty: "Trung bình",
      price: 4990000,
      maxPrice: 6490000,
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Hành trình khám phá hồ Tơ Nưng - viên ngọc xanh giữa cao nguyên, kết hợp trekking và tìm hiểu văn hóa Jrai.",
      highlights: [
        "Trekking quanh hồ Tơ Nưng",
        "Thăm làng Jrai truyền thống",
        "Cắm trại bên hồ",
        "Chèo thuyền thưởng ngoạn",
      ],
      included: [
        "Hướng dẫn viên chuyên nghiệp",
        "Thiết bị cắm trại",
        "Bảo hiểm cao cấp",
        "Thuyền chèo tay",
      ],
      guide: {
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        experience: "7 năm kinh nghiệm",
        age: 28,
        rating: 4.9,
        toursCompleted: 150,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Jrai"],
        bio: "B là chuyên gia về văn hóa Tây Nguyên với nhiều năm kinh nghiệm dẫn tour tại khu vực này. Cô có kiến thức sâu rộng về văn hóa các dân tộc thiểu số.",
        specialties: ["Văn hóa Tây Nguyên", "Trekking", "Nhiếp ảnh", "Ẩm thực địa phương"],
        certificates: [
          {
            name: "Chứng chỉ Hướng dẫn viên Du lịch Quốc gia",
            issuer: "Tổng cục Du lịch Việt Nam",
            year: 2019,
            verified: true
          },
          {
            name: "Chứng chỉ Văn hóa Tây Nguyên",
            issuer: "Viện Văn hóa Dân gian",
            year: 2020,
            verified: true
          }
        ]
      },
      itinerary: {
        day1: {
          title: "Ngày 1: Khởi hành và khám phá",
          activities: [
            "06:00 - Tập trung tại điểm hẹn, khởi hành",
            "09:00 - Đến điểm đến, gặp gỡ hướng dẫn viên địa phương",
            "10:00 - Bắt đầu hành trình trekking",
            "12:00 - Nghỉ trưa và thưởng thức ẩm thực địa phương",
            "14:00 - Tiếp tục khám phá và trải nghiệm văn hóa",
            "18:00 - Check-in homestay/cắm trại",
            "19:30 - Bữa tối và giao lưu văn nghệ"
          ]
        },
        day2: {
          title: "Ngày 2: Thử thách và khám phá sâu",
          activities: [
            "06:00 - Thức dậy, ngắm bình minh",
            "07:00 - Ăn sáng và chuẩn bị",
            "08:00 - Trekking đến điểm cao nhất",
            "12:00 - Picnic trên đỉnh núi",
            "14:00 - Khám phá hang động/thác nước",
            "17:00 - Trở về camp, nghỉ ngơi",
            "19:00 - Bữa tối và đốt lửa trại"
          ]
        },
        day3: {
          title: "Ngày 3: Hoàn thành hành trình",
          activities: [
            "07:00 - Ăn sáng và dọn dẹp",
            "08:30 - Trekking trở về",
            "11:00 - Thăm làng nghề địa phương",
            "12:30 - Bữa trưa chia tay",
            "14:00 - Khởi hành về điểm ban đầu",
            "17:00 - Kết thúc hành trình"
          ]
        }
      },
      gallery: [
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"
      ],
      requirements: {
        fitness: "Phù hợp với người có sức khỏe tốt, có thể đi bộ liên tục 4-5 giờ.",
        ageRange: "Từ 18-60 tuổi. Trẻ em dưới 18 tuổi cần có người lớn đi kèm.",
        preparation: "Giày trekking, áo mưa, kem chống nắng, thuốc cá nhân, túi ngủ."
      },
      maxPeople: 8,
      rating: 4.9,
      reviewCount: 32
    },
    {
      id: 3,
      title: "B'Lao The Tea Hill",
      location: "Bảo Lộc, Lâm Đồng",
      duration: "2 ngày 1 đêm",
      difficulty: "Dễ",
      price: 2490000,
      maxPrice: 3490000,
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Trải nghiệm văn hóa trà tại Bảo Lộc, khám phá những đồi chè xanh mướt và tìm hiểu quy trình sản xuất trà.",
      highlights: [
        "Thăm đồi chè B'Lao",
        "Học cách hái và chế biến trà",
        "Thưởng thức trà đặc sản",
        "Ngắm bình minh trên đồi chè",
      ],
      included: [
        "Hướng dẫn viên chuyên về trà",
        "Bảo hiểm du lịch",
        "Thưởng thức trà cao cấp",
        "Homestay tại đồi chè",
      ],
      guide: {
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        experience: "10 năm kinh nghiệm",
        age: 35,
        rating: 4.7,
        toursCompleted: 200,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Pháp"],
        bio: "C là chuyên gia về trà với hơn 10 năm kinh nghiệm trong ngành. Anh có kiến thức sâu rộng về các loại trà và quy trình sản xuất.",
        specialties: ["Văn hóa trà", "Nhiếp ảnh", "Ẩm thực", "Nông nghiệp"],
        certificates: [
          {
            name: "Chứng chỉ Hướng dẫn viên Du lịch Quốc gia",
            issuer: "Tổng cục Du lịch Việt Nam",
            year: 2018,
            verified: true
          },
          {
            name: "Chứng chỉ Chuyên gia Trà",
            issuer: "Hiệp hội Trà Việt Nam",
            year: 2021,
            verified: true
          }
        ]
      },
      itinerary: {
        day1: {
          title: "Ngày 1: Khởi hành và khám phá",
          activities: [
            "06:00 - Tập trung tại điểm hẹn, khởi hành",
            "09:00 - Đến điểm đến, gặp gỡ hướng dẫn viên địa phương",
            "10:00 - Bắt đầu hành trình trekking",
            "12:00 - Nghỉ trưa và thưởng thức ẩm thực địa phương",
            "14:00 - Tiếp tục khám phá và trải nghiệm văn hóa",
            "18:00 - Check-in homestay/cắm trại",
            "19:30 - Bữa tối và giao lưu văn nghệ"
          ]
        },
        day2: {
          title: "Ngày 2: Hoàn thành hành trình",
          activities: [
            "06:00 - Thức dậy, ngắm bình minh",
            "07:00 - Ăn sáng và dọn dẹp",
            "08:30 - Trekking và khám phá thêm",
            "11:00 - Thăm làng nghề địa phương",
            "12:30 - Bữa trưa chia tay",
            "14:00 - Khởi hành về điểm ban đầu",
            "17:00 - Kết thúc hành trình"
          ]
        }
      },
      gallery: [
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"
      ],
      requirements: {
        fitness: "Phù hợp với mọi lứa tuổi, có thể đi bộ nhẹ nhàng.",
        ageRange: "Từ 8-70 tuổi. Trẻ em dưới 8 tuổi cần có người lớn đi kèm.",
        preparation: "Giày thể thao, áo mưa, kem chống nắng, thuốc cá nhân."
      },
      maxPeople: 8,
      rating: 4.6,
      reviewCount: 18
    },
    {
      id: 4,
      title: "Dấu Chân Trên Rừng Voi",
      location: "Vườn Quốc Gia Yok Đôn, Đắk Lắk",
      duration: "3 ngày 2 đêm",
      difficulty: "Khó",
      price: 5990000,
      maxPrice: 7490000,
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Hành trình mạo hiểm khám phá Vườn Quốc Gia Yok Đôn, tìm hiểu về voi rừng và hệ sinh thái đa dạng.",
      highlights: [
        "Trekking trong rừng nguyên sinh",
        "Tìm hiểu về voi rừng",
        "Khám phá hệ sinh thái đa dạng",
        "Cắm trại trong rừng",
      ],
      included: [
        "Hướng dẫn viên chuyên nghiệp",
        "Thiết bị leo núi chuyên dụng",
        "Bảo hiểm cao cấp",
        "Chuyên gia sinh thái",
      ],
      guide: {
        name: "Phạm Thị D",
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        experience: "8 năm kinh nghiệm",
        age: 30,
        rating: 5.0,
        toursCompleted: 120,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Êđê"],
        bio: "D là chuyên gia về sinh thái rừng với nhiều năm nghiên cứu tại Vườn Quốc Gia Yok Đôn. Cô có kiến thức sâu rộng về động vật hoang dã và hệ sinh thái.",
        specialties: ["Sinh thái học", "Trekking", "Nhiếp ảnh động vật", "Bảo tồn"],
        certificates: [
          {
            name: "Chứng chỉ Hướng dẫn viên Du lịch Quốc gia",
            issuer: "Tổng cục Du lịch Việt Nam",
            year: 2020,
            verified: true
          },
          {
            name: "Chứng chỉ Sinh thái học",
            issuer: "Đại học Tây Nguyên",
            year: 2019,
            verified: true
          },
          {
            name: "Chứng chỉ An toàn Rừng",
            issuer: "Kiểm lâm Việt Nam",
            year: 2021,
            verified: true
          }
        ]
      },
      itinerary: {
        day1: {
          title: "Ngày 1: Khởi hành và khám phá",
          activities: [
            "06:00 - Tập trung tại điểm hẹn, khởi hành",
            "09:00 - Đến điểm đến, gặp gỡ hướng dẫn viên địa phương",
            "10:00 - Bắt đầu hành trình trekking",
            "12:00 - Nghỉ trưa và thưởng thức ẩm thực địa phương",
            "14:00 - Tiếp tục khám phá và trải nghiệm văn hóa",
            "18:00 - Check-in homestay/cắm trại",
            "19:30 - Bữa tối và giao lưu văn nghệ"
          ]
        },
        day2: {
          title: "Ngày 2: Thử thách và khám phá sâu",
          activities: [
            "06:00 - Thức dậy, ngắm bình minh",
            "07:00 - Ăn sáng và chuẩn bị",
            "08:00 - Trekking đến điểm cao nhất",
            "12:00 - Picnic trên đỉnh núi",
            "14:00 - Khám phá hang động/thác nước",
            "17:00 - Trở về camp, nghỉ ngơi",
            "19:00 - Bữa tối và đốt lửa trại"
          ]
        },
        day3: {
          title: "Ngày 3: Hoàn thành hành trình",
          activities: [
            "07:00 - Ăn sáng và dọn dẹp",
            "08:30 - Trekking trở về",
            "11:00 - Thăm làng nghề địa phương",
            "12:30 - Bữa trưa chia tay",
            "14:00 - Khởi hành về điểm ban đầu",
            "17:00 - Kết thúc hành trình"
          ]
        }
      },
      gallery: [
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"
      ],
      requirements: {
        fitness: "Yêu cầu thể lực tốt, có thể đi bộ liên tục 6-8 giờ trên địa hình khó.",
        ageRange: "Từ 20-50 tuổi. Không phù hợp cho người có vấn đề về tim mạch.",
        preparation: "Giày trekking chuyên dụng, ba lô 30L, túi ngủ, đèn pin, thuốc cá nhân."
      },
      maxPeople: 6,
      rating: 4.9,
      reviewCount: 15
    },
    {
      id: 5,
      title: "Lời Gọi Núi Thiêng",
      location: "Ngọc Linh, Kon Tum",
      duration: "2 ngày 1 đêm",
      difficulty: "Khó",
      price: 6990000,
      maxPrice: 8490000,
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Thử thách bản thân với hành trình chinh phục đỉnh Ngọc Linh - nóc nhà Trường Sơn Nam, khám phá làng nghề rèn sắt truyền thống.",
      highlights: [
        "Chinh phục đỉnh Ngọc Linh",
        "Cắm trại trên núi cao",
        "Thăm làng nghề rèn sắt",
        "Tìm hiểu y học cổ truyền",
      ],
      included: [
        "Hướng dẫn viên chuyên nghiệp",
        "Bảo hiểm du lịch cao cấp",
        "Thiết bị leo núi chuyên dụng",
        "Hỗ trợ y tế chuyên biệt",
      ],
      guide: {
        name: "Hoàng Văn E",
        avatar: "https://randomuser.me/api/portraits/men/89.jpg",
        experience: "12 năm kinh nghiệm",
        age: 38,
        rating: 5.0,
        toursCompleted: 80,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Xơ Đăng"],
        bio: "E là chuyên gia leo núi với hơn 12 năm kinh nghiệm chinh phục các đỉnh cao tại Việt Nam. Anh đã dẫn nhiều đoàn leo núi thành công và an toàn.",
        specialties: ["Leo núi", "Trekking khó", "Sinh tồn", "Y học cổ truyền"],
        certificates: [
          {
            name: "Chứng chỉ Hướng dẫn viên Du lịch Quốc gia",
            issuer: "Tổng cục Du lịch Việt Nam",
            year: 2017,
            verified: true
          },
          {
            name: "Chứng chỉ Leo núi Quốc tế",
            issuer: "UIAA",
            year: 2019,
            verified: true
          },
          {
            name: "Chứng chỉ Sơ cấp cứu Cao cấp",
            issuer: "Red Cross Vietnam",
            year: 2020,
            verified: true
          },
          {
            name: "Chứng chỉ Y học Cổ truyền",
            issuer: "Học viện Y Dược học Cổ truyền",
            year: 2021,
            verified: true
          }
        ]
      },
      itinerary: {
        day1: {
          title: "Ngày 1: Khởi hành và khám phá",
          activities: [
            "06:00 - Tập trung tại điểm hẹn, khởi hành",
            "09:00 - Đến điểm đến, gặp gỡ hướng dẫn viên địa phương",
            "10:00 - Bắt đầu hành trình trekking",
            "12:00 - Nghỉ trưa và thưởng thức ẩm thực địa phương",
            "14:00 - Tiếp tục khám phá và trải nghiệm văn hóa",
            "18:00 - Check-in homestay/cắm trại",
            "19:30 - Bữa tối và giao lưu văn nghệ"
          ]
        },
        day2: {
          title: "Ngày 2: Hoàn thành hành trình",
          activities: [
            "06:00 - Thức dậy, ngắm bình minh",
            "07:00 - Ăn sáng và dọn dẹp",
            "08:30 - Trekking và khám phá thêm",
            "11:00 - Thăm làng nghề địa phương",
            "12:30 - Bữa trưa chia tay",
            "14:00 - Khởi hành về điểm ban đầu",
            "17:00 - Kết thúc hành trình"
          ]
        }
      },
      gallery: [
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
        "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto"
      ],
      requirements: {
        fitness: "Yêu cầu thể lực rất tốt, có thể leo núi liên tục 8-10 giờ.",
        ageRange: "Từ 25-45 tuổi. Không phù hợp cho người có vấn đề về tim mạch hoặc hô hấp.",
        preparation: "Giày leo núi chuyên dụng, ba lô 40L, túi ngủ chống lạnh, đèn pin, thuốc cá nhân."
      },
      maxPeople: 4,
      rating: 5.0,
      reviewCount: 12
    },
  ],
  selectedTour: null,
  filters: {
    difficulty: "",
    duration: "",
    priceRange: [0, 10000000],
  },
  loading: false,
  error: null,
}

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    setSelectedTour: (state, action) => {
      state.selectedTour = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        difficulty: "",
        duration: "",
        priceRange: [0, 10000000],
      }
    },
  },
})

export const { setSelectedTour, setFilters, clearFilters } = toursSlice.actions
export default toursSlice.reducer
