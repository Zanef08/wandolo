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
