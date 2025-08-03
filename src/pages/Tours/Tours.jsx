"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Search, SlidersHorizontal } from "lucide-react"
import { setFilters, clearFilters } from "../../store/slices/toursSlice"
import TourCard from "../../components/TourCard/TourCard"
import styles from "./Tours.module.scss"

const Tours = () => {
  const dispatch = useDispatch()
  const { tours, filters } = useSelector((state) => state.tours)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  // Thêm state cho các bộ lọc nâng cao
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [maxPeople, setMaxPeople] = useState("")
  const [minRating, setMinRating] = useState("")

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
    setSearchTerm("")
  }

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = !filters.difficulty || tour.difficulty === filters.difficulty
    const matchesDuration = !filters.duration || tour.duration.includes(filters.duration)
    const matchesPrice = tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1]
    const matchesActivityType = !filters.activityType || (tour.activityType && tour.activityType.includes(filters.activityType))

    return matchesSearch && matchesDifficulty && matchesDuration && matchesPrice && matchesActivityType
  })

  return (
    <div className={styles.toursPage}>
      {/* Hero Section */}
      <section className={styles.toursHero}>
        <div className={styles.heroBackground}>
          <img src="https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/ATTA%20Trends_HERO/The-Latest-Trends-in-Adventure-Travel.jpg?tr=w-1008%2Ch-567%2Cfo-auto" alt="Tours Background" className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Tours trekking</h1>
            <p>Khám phá Tây Nguyên qua những hành trình độc đáo, an toàn và đầy cảm hứng</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.toursContent}>
          {/* Search and Filter Bar */}
          <div className={styles.searchFilterBar}>
            <div className={`${styles.searchBox} search-input`}>
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={20} />
              Bộ lọc
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.filterGroup}>
                <label>Độ khó:</label>
                <div className="select-wrapper">
                  <select value={filters.difficulty} onChange={(e) => handleFilterChange("difficulty", e.target.value)} className="select-primary">
                    <option value="">Tất cả độ khó</option>
                    <option value="Dễ - Mức độ cho người bắt đầu" className="option-highlighted">Dễ - Mức độ cho người bắt đầu</option>
                    <option value="Trung bình" className="option-highlighted">Trung bình - Cần thể lực tốt</option>
                    <option value="Khó" className="option-highlighted">Khó - Dành cho người có kinh nghiệm</option>
                  </select>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label>Thời gian:</label>
                <div className="select-wrapper">
                  <select value={filters.duration} onChange={(e) => handleFilterChange("duration", e.target.value)} className="select-primary">
                    <option value="">Tất cả thời gian</option>
                    <option value="2 ngày" className="option-highlighted">2 ngày 1 đêm</option>
                    <option value="3 ngày" className="option-highlighted">3 ngày 2 đêm</option>
                  </select>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label>Loại hoạt động:</label>
                <div className="select-wrapper">
                  <select value={filters.activityType} onChange={(e) => handleFilterChange("activityType", e.target.value)} className="select-primary">
                    <option value="">Tất cả hoạt động</option>
                    <option value="Trekking" className="option-highlighted">Trekking</option>
                    <option value="Camping" className="option-highlighted">Camping</option>
                    <option value="Caving" className="option-highlighted">Caving</option>
                    <option value="Kayaking" className="option-highlighted">Kayaking</option>
                  </select>
                </div>
              </div>

              {/* Lọc nâng cao */}
              <div className={styles.filterGroup}>
                <label>Từ ngày:</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="input-primary"
                />
              </div>
              <div className={styles.filterGroup}>
                <label>Đến ngày:</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="input-primary"
                />
              </div>
              {/* Số người tối đa */}
              <div className={styles.filterGroup}>
                <label>Số người tối đa:</label>
                <div className="select-wrapper">
                  <select
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                    className="select-primary"
                  >
                    <option value="">Tất cả</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20+</option>
                  </select>
                </div>
              </div>
              {/* Đánh giá tối thiểu */}
              <div className={styles.filterGroup}>
                <label>Đánh giá tối thiểu:</label>
                <div className="select-wrapper">
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="select-primary"
                  >
                    <option value="">Tất cả</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <button className="clear-btn" onClick={handleClearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          )}

          {/* Results */}
          {/* <div className={styles.resultsHeader}>
            <h2>Tìm thấy {filteredTours.length} tours</h2>
          </div> */}

          {/* Tours Grid */}
          <div className={styles.toursGrid}>
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className={styles.noResults}>
              <p>Không tìm thấy tours phù hợp với tiêu chí tìm kiếm.</p>
              <button className="btn primary" onClick={handleClearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tours
