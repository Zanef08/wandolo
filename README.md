# Wandolo

## 🧭 Giới thiệu
**Wandolo** là ứng dụng web đặt tour du lịch trải nghiệm, tập trung vào các hành trình khám phá thiên nhiên, văn hóa bản địa và hoạt động ngoài trời tại Việt Nam. Ứng dụng xây dựng với React, Redux, Vite, hỗ trợ giao diện hiện đại, responsive, quản lý trạng thái mạnh mẽ và trải nghiệm người dùng mượt mà.

## ✨ Tính năng chính
- Xem danh sách tour, lọc theo độ khó, thời lượng, giá
- Xem chi tiết tour, điểm nổi bật, dịch vụ kèm theo
- Đặt tour trực tuyến, chọn số người, ngày đi, dịch vụ bổ sung
- Lưu lịch sử đặt tour, quản lý thông tin khách hàng
- Responsive UI, hỗ trợ mobile và desktop
- Thông báo, chatbot, menu di động

## 🛠️ Công nghệ sử dụng
- React 18 + Vite
- Redux Toolkit, React Redux
- React Router v6
- Sass/SCSS cho style hiện đại
- Lucide React cho icon
- ESLint, cấu hình code chuẩn

## 📁 Cấu trúc thư mục
```
├── public/
│   └── assets/           # Hình ảnh, icon, tài nguyên tĩnh
├── src/
│   ├── components/       # Các thành phần UI (Header, Footer, Hero, ...)
│   ├── pages/            # Các trang chính (Home, Tours, TourDetail, ...)
│   ├── store/            # Redux store & các slice quản lý state
│   ├── styles/           # SCSS toàn cục và module
│   ├── App.jsx           # Cấu trúc ứng dụng, định tuyến
│   └── main.jsx          # Điểm khởi tạo, tích hợp Redux, Router
├── package.json          # Thông tin, scripts, dependencies
├── vite.config.js        # Cấu hình Vite
└── README.md             # Tài liệu này
```

## 🚀 Hướng dẫn cài đặt & chạy dự án
### Yêu cầu
- Node.js >= 16
- npm >= 8

### Cài đặt
```bash
npm install
```

### Chạy dev server
```bash
npm run dev
```

Truy cập: [http://localhost:5173](http://localhost:5173)

### Build production
```bash
npm run build
```

### Kiểm tra code
```bash
npm run lint
```

## 🧩 Hướng dẫn phát triển
- Sử dụng Redux Toolkit để quản lý state (tours, booking, UI)
- Style chia module SCSS, biến theme trong `global.scss`
- Routing với React Router v6, cấu hình trong `App.jsx`
- Thêm component mới vào `src/components/`, trang mới vào `src/pages/`
- Tài nguyên ảnh để trong `public/assets/`

## 🖼️ Tài nguyên
- Hình ảnh tour: `public/assets/`
- Icon: Lucide React
- Favicon: `index.html`

---

# Wandolo (English)

## 🧭 Introduction
**Wandolo** is a web application for booking adventure and cultural tours, focusing on journeys that explore nature, local culture, and outdoor activities in Vietnam. The app is built with React, Redux, and Vite, featuring a modern, responsive interface, robust state management, and a smooth user experience.

## ✨ Features
- View the list of tours, filter by difficulty, duration, and price
- View detailed tour information, highlights, and included services
- Book tours online: select number of participants, date, and additional services
- Save booking history, manage customer information
- Responsive UI, supports both mobile and desktop
- Notifications, chatbot, mobile menu

## 🛠️ Tech Stack
- React 18 + Vite
- Redux Toolkit, React Redux
- React Router v6
- Sass/SCSS for modern styling
- Lucide React for icons
- ESLint for code quality

## 📁 Project Structure
```
├── public/
│   └── assets/           # Images, icons, static resources
├── src/
│   ├── components/       # UI components (Header, Footer, Hero, ...)
│   ├── pages/            # Main pages (Home, Tours, TourDetail, ...)
│   ├── store/            # Redux store & state slices
│   ├── styles/           # Global and module SCSS
│   ├── App.jsx           # App structure, routing
│   └── main.jsx          # Entry point, integrates Redux and Router
├── package.json          # Project info, scripts, dependencies
├── vite.config.js        # Vite configuration
└── README.md             # This documentation
```

## 🚀 Getting Started
### Requirements
- Node.js >= 16
- npm >= 8

### Install
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

### Build for production
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## 🧩 Development Guide
- Use Redux Toolkit for state management (tours, booking, UI)
- Modular SCSS styles, theme variables in `global.scss`
- Routing with React Router v6, configured in `App.jsx`
- Add new components to `src/components/`, new pages to `src/pages/`
- Place image assets in `public/assets/`

## 🖼️ Assets
- Tour images: `public/assets/`
- Icons: Lucide React
- Favicon: `index.html`

