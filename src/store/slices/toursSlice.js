import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tours: [
    {
      id: 1,
      title: "Hồn Churu giữa Đại Ngàn",
      location: "Đơn Dương, Lâm Đồng",
      duration: "2N1D",
      difficulty: "Dễ - Mức độ cho người bắt đầu",
      price: 3200000,
      activityType: ["Trekking"],
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Khám phá văn hóa Churu độc đáo tại Đơn Dương, trải nghiệm cuộc sống bản địa và thưởng thức ẩm thực truyền thống.",
      highlights: [
        "Trekking nhẹ quanh nông trại 200ha",
        "Thăm làng người Chil",
        "Thưởng thức cà phê rang thủ công",
        "Đốt lửa trại và BBQ",
        "Thăm nhà thờ cổ Ka Đơn",
        "Học kỹ thuật làm gốm truyền thống"
      ],
      included: [
        "Hướng dẫn viên địa phương",
        "Bảo hiểm du lịch",
        "Ăn uống đầy đủ (3 bữa/ngày)",
        "Lều trại và thiết bị",
        "Vận chuyển xe giường nằm"
      ],
      totalDistance: "14km (2 ngày cả đi cả về)",
      distanceBreakdown: {
        day1: "10km",
        day2: "4km"
      },
      guide: {
        name: "Nguyễn Văn A",
        avatar: "https://sdmntprwestus.oaiusercontent.com/files/00000000-806c-6230-a23e-30ec39521a83/raw?se=2025-08-04T14%3A37%3A53Z&sp=r&sv=2024-08-04&sr=b&scid=c983fda8-21ce-50ef-a72b-5e997686cceb&skoid=789f404f-91a9-4b2f-932c-c44965c11d82&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-04T10%3A12%3A13Z&ske=2025-08-05T10%3A12%3A13Z&sks=b&skv=2024-08-04&sig=AJQ5IoyAE6Sx3/dlJiGiVrrJ6zp9ctb8On1a2oL0Hv4%3D",
        experience: "5 năm kinh nghiệm",
        age: 32,
        rating: 5.0,
        toursCompleted: 100,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Churu"],
        bio: "A là một hướng dẫn viên giàu kinh nghiệm với niềm đam mê mãnh liệt với thiên nhiên và văn hóa Tây Nguyên. Anh đã dẫn hàng trăm tour thành công và luôn đảm bảo an toàn tuyệt đối cho khách hàng.",
        specialties: ["Trekking", "Văn hóa dân tộc", "Sinh tồn", "Nhiếp ảnh"],
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
          }
        ]
      },
      itinerary: {
        day0: {
          title: "Ngày 0: Khởi hành",
          activities: [
            "20:30: Tập trung tại Saigon Mall - 82 cao thắng, TP.HCM",
            "21:00: Khởi hành đến Đơn Dương"
          ]
        },
        day1: {
          title: "Ngày 1: Khám Phá Đại Ngàn",
          activities: [
            "5:00: Đến Laba Farm – nhận lều, nghỉ ngơi",
            "7:00: Ăn sáng",
            "8:00: Trekking nhẹ quanh nông trại 200ha – tham quan vườn rau, đồi hoa, suối nhỏ",
            "12:00: Dùng bữa trưa với nguyên liệu địa phương",
            "13:30: Trek đến làng người Chil – tham quan vườn cà phê, thưởng thức cà phê rang thủ công",
            "17:00: Về lại farm, nghỉ ngơi & ăn tối",
            "19:00: Đốt lửa trại, BBQ và ngắm sao"
          ]
        },
        day2: {
          title: "Ngày 2: Kết nối Văn hóa",
          activities: [
            "6:00: Dậy sớm ngắm bình minh, uống cà phê sáng",
            "7:30: Trekking đến nhà thờ cổ Ka Đơn, sau đó ghé làng gốm Churu để tìm hiểu kỹ thuật làm gốm truyền thống",
            "12:00: Dùng bữa trưa và nghỉ ngơi",
            "15:00: Trek về lại farm, thư giãn và ăn tối",
            "20:00: Đoàn xuất phát về TP.HCM"
          ]
        }
      },
      pricing: {
        breakfast: "100k/2 ngày",
        lunch: "200k/2 ngày",
        dinner: "200k/2 ngày"
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
      maxPeople: 10,
      rating: 4.8,
      reviewCount: 24
    },
    {
      id: 2,
      title: "Viên Ngọc Ẩn Giữa Cao Nguyên",
      location: "Chư Păh, Gia Lai",
      duration: "3N2D",
      difficulty: "Trung bình",
      price: 4300000,
      activityType: ["Trekking", "Camping"],
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Hành trình khám phá Chư Nâm - viên ngọc ẩn giữa đại ngàn Tây Nguyên, kết hợp trekking và tìm hiểu văn hóa Jrai.",
      highlights: [
        "Trekking lên đỉnh Chư Nâm",
        "Cắm trại giữa mây rừng",
        "Thăm làng Kép Ping",
        "Học nghệ thuật tạc tượng gỗ nhà mồ",
        "Khám phá núi Chư Đăng Ya",
        "Nghe sử thi Tây Nguyên"
      ],
      included: [
        "Hướng dẫn viên chuyên nghiệp",
        "Thiết bị cắm trại",
        "Bảo hiểm cao cấp",
        "Vận chuyển xe giường nằm",
        "Homestay và ăn uống"
      ],
      totalDistance: "20km",
      distanceBreakdown: {
        day1: "7km",
        day2: "10km",
        day3: "3km"
      },
      guide: {
        name: "Trần Văn B",
        avatar: "https://api.deepai.org/job-view-file/3001c7fd-9778-4ffa-a695-f8251495180c/outputs/output.jpg",
        experience: "7 năm kinh nghiệm",
        age: 28,
        rating: 4.9,
        toursCompleted: 150,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Jrai"],
        bio: "B là chuyên gia về văn hóa Tây Nguyên với nhiều năm kinh nghiệm dẫn tour tại khu vực này. Anh có kiến thức sâu rộng về văn hóa các dân tộc thiểu số.",
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
        day0: {
          title: "Ngày 0: Khởi hành",
          activities: [
            "4:30 Chiều: Tập trung tại Saigon Mall - 82 cao thắng",
            "5:00 Chiều: Xuất phát đi Gia Lai bằng xe giường nằm",
            "8:00 Tối: Ghé trạm dừng chân ăn tối sau đó tiếp tục di chuyển đến Gia Lai"
          ]
        },
        day1: {
          title: "Ngày 1: Trekking khám phá Viên Ngọc Chư Nâm - Giữa Đại Ngàn Tây Nguyên",
          activities: [
            "5:00: Đến homestay nhận phòng nghỉ ngơi",
            "7:00: Ăn sáng",
            "8:00: Bắt đầu hành trình trekking lên đỉnh Chư Nâm – xuyên qua rừng, dốc thoai thoải, mây mù mờ ảo như 'viên ngọc ẩn'",
            "12:00: Ăn trưa dã chiến giữa rừng – nghỉ ngơi nhẹ",
            "13:00: Tiếp tục trekking lên đỉnh Chư Nâm",
            "15:00: Check in cột mốc đỉnh Chư Nâm. Các thành viên nhận kỉ niệm chương và chụp ảnh lưu niệm tại cột mốc Chư Nâm.",
            "16:00: Về điểm Camping, nhận lều và vệ sinh cá nhận, sinh hoạt tự do.",
            "19:00: Ăn tối BBQ + lửa trại giữa núi – nghe kể chuyện sử thi Tây Nguyên"
          ]
        },
        day2: {
          title: "Ngày 2: Dấu ấn văn hóa – Làng nghề tạc tượng nhà mồ",
          activities: [
            "5:30: Dậy sớm ngắm bình minh và thưởng thức cà phê",
            "7:00: Ăn sáng và thu dọn hành lí",
            "08:00: Đoàn trekking xuống núi",
            "11:00: Ăn trưa và nghỉ ngơi tại homestay",
            "14:00: Thăm làng Kép Ping gặp nghệ nhân, tìm hiểu nghệ thuật tạc tượng gỗ nhà mồ, trải nghiệm chạm khắc",
            "17:00: Về homestay ăn tối."
          ]
        },
        day3: {
          title: "Ngày 3: Chư Đăng Ya – Ngọn núi lửa 'ẩn mình' tuyệt đẹp",
          activities: [
            "7:00: Ăn sáng thưởng thức cà phê tại homestay",
            "8:00: Trekking lên núi Chư Đăng Ya",
            "10:00: Về lại homestay ăn trưa nghỉ ngơi",
            "11:00: Lên xe quay trở về Hồ Chí Minh",
            "23:00: Dự kiến trở về điểm xuất phát - Kết thúc hành trình"
          ]
        }
      },
      notes: "Đổi giờ khởi hành, chỉ ở 1 đêm tại homestay - ĐÃ SỬA",
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
      maxPeople: 10,
      rating: 4.9,
      reviewCount: 32
    },
    {
      id: 3,
      title: "B'Lao The Tea Hill",
      location: "B'Lao, Lâm Đồng",
      duration: "2N2D",
      difficulty: "Dễ - Mức độ cho người bắt đầu",
      price: 3000000,
      activityType: ["Trekking"],
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Trải nghiệm văn hóa trà tại B'Lao, khám phá những đồi chè xanh mướt và tìm hiểu quy trình sản xuất trà.",
      highlights: [
        "Trekking quanh đồi chè B'Lao",
        "Thăm làng Châu Mạ",
        "Thưởng thức ẩm thực địa phương",
        "Ngắm bình minh tại 'Cổng Trời'",
        "Thưởng thức rượu cần",
        "Khám phá thác nước trắng"
      ],
      included: [
        "Hướng dẫn viên chuyên về trà",
        "Bảo hiểm du lịch",
        "Thưởng thức trà cao cấp",
        "Homestay tại đồi chè",
        "Vận chuyển xe giường nằm"
      ],
      totalDistance: "12km",
      distanceBreakdown: {
        day1: "8km",
        day2: "4km"
      },
      guide: {
        name: "Lê Văn C",
        avatar: "https://api.deepai.org/job-view-file/05bd549a-9457-4dfd-ba16-57ddc9f45aac/outputs/output.jpg",
        experience: "10 năm kinh nghiệm",
        age: 35,
        rating: 4.7,
        toursCompleted: 200,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Châu Mạ"],
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
          title: "Ngày 1: Khởi hành & Trekking B'Lao",
          activities: [
            "04:30: Tập trung tại Saigon Mall – 82 Cao Thắng.",
            "05:00: Khởi hành đi B'Lao – Bảo Lộc.",
            "07:30: Dừng chân ăn sáng dọc đường.",
            "10:30: Đến B'Lao, chuẩn bị và di chuyển đến điểm tập kết trekking.",
            "11:00: Bắt đầu trekking, khám phá con đường đất đỏ quanh co giữa thủ phủ trà B'Lao. Thưởng thức 'đặc sản' B'Lao bằng mọi giác quan, từ khứu giác đến vị giác, cảnh quan thiên nhiên đến con người giản dị của cao nguyên rộng lớn. Trải nghiệm con đường trekking qua những đồi chè với hương thơm tươi mát, dễ chịu của lá chè non còn đọng sương sớm.",
            "12:30: Ăn trưa picnic giữa thiên nhiên.",
            "13:30: Tiếp tục khám phá cao nguyên B'Lao bằng cách trekking đến thăm làng của người dân tộc Châu Mạ, nơi khách sẽ được nghe những câu chuyện về cuộc sống bình yên và phong tục địa phương. Thăm thác nước trắng chảy qua những cây cổ thụ.",
            "17:00: Di chuyển về nhà người dân tộc để nghỉ ngơi và chuẩn bị bữa tối.",
            "18:30: Dùng bữa tối cùng nhau tại nhà truyền thống của họ. Tụ họp thưởng thức hương vị cao nguyên với rau rừng, thịt nướng và chút rượu cần cay nồng do người dân địa phương ủ.",
            "21:00: Nghỉ đêm tại homestay."
          ]
        },
        day2: {
          title: "Ngày 2: Khám phá 'Cổng Trời'",
          activities: [
            "06:30: Ăn sáng và thưởng thức cà phê cao nguyên tại homestay.",
            "08:00: Check out và di chuyển đến 'Cổng Trời' – Linh Quy Pháp Ấn.",
            "09:00: Đoàn sẽ chiêm ngưỡng toàn cảnh núi non B'Lao từ trên cao, hít thở không khí trong lành và có thời gian yên tĩnh để nạp năng lượng từ thiên nhiên trước khi trở về thành phố và công việc hàng ngày.",
            "12:00: Ăn trưa.",
            "13:00: Khởi hành về TP.HCM.",
            "20:00 (dự kiến): Về đến điểm xuất phát tại Saigon Mall – 82 Cao Thắng. Kết thúc tour."
          ]
        }
      },
      notes: "Đổi giờ khởi hành, chỉ ở 1 đêm tại homestay - ĐÃ SỬA",
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
      maxPeople: 10,
      rating: 4.6,
      reviewCount: 18
    },
    {
      id: 4,
      title: "Dấu Chân Trên Rừng Voi",
      location: "Đăk Lăk",
      duration: "3N2D",
      difficulty: "Khó",
      price: 4500000,
      activityType: ["Trekking", "Caving", "Kayaking"],
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Hành trình mạo hiểm khám phá Vườn Quốc Gia Yok Đôn, tìm hiểu về voi rừng và hệ sinh thái đa dạng.",
      highlights: [
        "Trekking dọc sông Serepok",
        "Khám phá hang đá thác Dray Nur",
        "Cắm trại trong rừng Yok Đôn",
        "Thăm Buôn Đôn",
        "Học dệt vải với nghệ nhân",
        "Kayak trên Hồ Lắk"
      ],
      included: [
        "Hướng dẫn viên chuyên nghiệp",
        "Thiết bị leo núi chuyên dụng",
        "Bảo hiểm cao cấp",
        "Chuyên gia sinh thái",
        "Vận chuyển xe giường nằm"
      ],
      totalDistance: "24km",
      distanceBreakdown: {
        day1: "14km",
        day2: "6km",
        day3: "4km"
      },
      guide: {
        name: "Phạm Văn D",
        avatar: "https://api.deepai.org/job-view-file/64f9a0a8-9f3e-45e5-915b-b12d39568497/outputs/output.jpg",
        experience: "8 năm kinh nghiệm",
        age: 30,
        rating: 5.0,
        toursCompleted: 120,
        languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Êđê"],
        bio: "D là chuyên gia về sinh thái rừng với nhiều năm nghiên cứu tại Vườn Quốc Gia Yok Đôn. Anh có kiến thức sâu rộng về động vật hoang dã và hệ sinh thái.",
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
        day0: {
          title: "Ngày 0: Khởi hành",
          activities: [
            "19:30: Tập trung tại điểm hẹn.",
            "20:00: Khởi hành đi Buôn Ma Thuột bằng xe giường nằm."
          ]
        },
        day1: {
          title: "Ngày 1: Thác Dray Nur thiêng liêng & Cắm trại trong rừng Yok Đôn",
          activities: [
            "05:00: Đến Buôn Ma Thuột – vệ sinh cá nhân, ăn sáng.",
            "07:00: Khởi hành đi Thác Dray Nur (Thác Dray Nur) - trekking dọc sông Serepok.",
            "09:00: Khám phá hang đá ở chân thác – chụp ảnh, nghe truyền thuyết Dray Nur.",
            "11:30: Ăn trưa bên suối.",
            "13:30: Vào rừng Yok Đôn – trekking nhẹ trong rừng khô đặc trưng.",
            "16:30: Dựng trại – tắm suối – nghỉ ngơi.",
            "18:30: Ăn tối + giao lưu văn hóa Ê Đê: nghe người dẫn đường địa phương kể sử thi Đam San, uống rượu cần, nhảy xoang quanh lửa."
          ]
        },
        day2: {
          title: "Ngày 2: Buôn Đôn huyền thoại & Dấu chân voi",
          activities: [
            "06:00: Dậy sớm ngắm bình minh rừng.",
            "07:00: Ăn sáng, tháo dỡ trại.",
            "08:30: Thăm Buôn Đôn – tìm hiểu phong tục nuôi voi.",
            "10:00: (Nếu có lễ): Tham dự lễ cúng sức khỏe voi.",
            "11:30: Ăn trưa – nghỉ ngơi tại nhà dài Ê Đê.",
            "14:00: Học dệt vải với nghệ nhân địa phương.",
            "16:00: Về Hồ Lắk (Lak Lake) – nghỉ ngơi tại homestay.",
            "18:30: Ăn tối – thời gian tự do khám phá Hồ Lắk về đêm."
          ]
        },
        day3: {
          title: "Ngày 3: Hồ Lắk bình yên",
          activities: [
            "06:00: Dậy sớm – kayak ngắm bình minh (nếu điều kiện cho phép).",
            "07:30: Ăn sáng – trekking quanh Hồ Lắk – nhà dài M'Nông.",
            "10:00: Khởi hành về TP.HCM.",
            "20:00 (dự kiến): Về đến TP.HCM – kết thúc tour."
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
      maxPeople: 10,
      rating: 4.9,
      reviewCount: 15
    },
    {
      id: 5,
      title: "Lời Gọi Núi Thiêng",
      location: "Ngọc Linh, Kon Tum",
      duration: "2N1D",
      difficulty: "Khó",
      price: 4500000,
      activityType: ["Trekking", "Camping"],
      image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto",
      description:
        "Thử thách bản thân với hành trình chinh phục đỉnh Ngọc Linh - nóc nhà Trường Sơn Nam, khám phá làng nghề rèn sắt truyền thống.",
      highlights: [
        "Chinh phục đỉnh Ngọc Linh",
        "Cắm trại giữa mây rừng",
        "Thăm làng nghề rèn sắt",
        "Tìm hiểu y học cổ truyền",
        "Học cách làm thuốc Nam",
        "Tìm hiểu trồng sâm"
      ],
      included: [
        "Hướng dẫn viên chuyên nghiệp",
        "Bảo hiểm du lịch cao cấp",
        "Thiết bị leo núi chuyên dụng",
        "Hỗ trợ y tế chuyên biệt",
        "Vận chuyển máy bay"
      ],
      totalDistance: "Không xác định",
      distanceBreakdown: {
        day1: "Trekking lên đỉnh",
        day2: "Trekking xuống núi"
      },
      guide: {
        name: "Hoàng Văn E",
        avatar: "https://api.deepai.org/job-view-file/a1bb8bc7-d372-4ec6-9ef5-e84f05a83181/outputs/output.jpg",
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
        day0: {
          title: "Ngày 0: Khởi hành",
          activities: [
            "20:00: Tập trung tại sân bay Tân Sơn Nhất - Bay đến PLeiku",
            "22:00: Xe trung chuyển đưa về homestay ở Xã Ngọc Linh- nghỉ đêm"
          ]
        },
        day1: {
          title: "Ngày 1: Trekking Ngọc Linh – Cắm trại giữa mây rừng",
          activities: [
            "5:30: Dậy sớm – ăn sáng – chuẩn bị trang bị trekking",
            "6:30: Gặp người Xê Đăng bản địa dẫn đường – bắt đầu hành trình chinh phục Ngọc Linh",
            "8:00: Băng qua rừng nguyên sinh, rừng trúc lạnh, suối nhỏ – độ cao tăng dần",
            "11:30: Nghỉ trưa bên bờ suối – ăn trưa",
            "13:00: Trekking tiếp lên cao – cảm nhận mây mù và khí lạnh đặc trưng",
            "15:30: Đến điểm cắm trại gần đỉnh (2.000m+) – dựng trại, nghỉ ngơi",
            "17:30: Đốt lửa – ăn tối cùng người bản địa – chia sẻ chuyện rèn sắt, làm thuốc, trồng sâm",
            "20:00: Giao lưu – nghe kể về truyền thuyết đỉnh Ngọc Linh, nghi thức bản địa"
          ]
        },
        day2: {
          title: "Ngày 2: Chạm đỉnh – Trải nghiệm bản địa",
          activities: [
            "5:00: Dậy sớm – ăn sáng - trekking nhẹ chạm mốc đỉnh Ngọc Linh",
            "7:30: Chụp ảnh check-in, nhận kỷ niệm chương",
            "8:00: Xuống núi",
            "12:00: Về lại bản – ăn trưa, tắm rửa",
            "13:30: Tham quan làng nghề rèn sắt, xem cách làm thuốc Nam, trồng sâm",
            "15:30: Khởi hành về lai Pleiku – ra sân bay",
            "19:00: Bay về TP.HCM",
            "21:00: Kết thúc tour"
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
      maxPeople: 10,
      rating: 5.0,
      reviewCount: 12
    },
  ],
  selectedTour: null,
  filters: {
    difficulty: "",
    duration: "",
    priceRange: [0, 10000000],
    activityType: "",
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
        activityType: "",
      }
    },
  },
})

export const { setSelectedTour, setFilters, clearFilters } = toursSlice.actions
export default toursSlice.reducer
