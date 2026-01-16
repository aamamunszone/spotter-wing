<div align="center">

# ✈️ Spotter-Wing

### Real-time Flight Intelligence Dashboard

_Discover the best flight deals with stunning visualizations, intelligent filtering, and a premium glassmorphic interface._

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-2563EB?style=for-the-badge)](https://spotter-wing.vercel.app)
[![GitHub](https://img.shields.io/badge/📦_GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/aamamunszone/spotter-wing)
[![License](https://img.shields.io/badge/📄_License-MIT-10B981?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Key Features

| Feature                           | Description                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| ✈️ **Real-time Flight Search**    | Search flights worldwide using the Amadeus Self-Service API with intelligent autocomplete |
| 📊 **Interactive Price Insights** | Beautiful area charts powered by Recharts showing price trends, min/avg/max statistics    |
| 🌓 **Glassmorphic UI**            | Premium frosted-glass design with seamless Light/Dark mode switching                      |
| 📱 **Fully Responsive**           | Mobile-first design that looks stunning on all devices                                    |
| 🎯 **Smart Filtering**            | Sticky sidebar with real-time price slider and sort options (Cheapest/Fastest)            |
| ⚡ **Debounced Search**           | Optimized API calls with 400ms debouncing for smooth autocomplete                         |
| 🔄 **Live Status Indicator**      | Pulsing indicator showing real-time API connection status                                 |
| 🛡️ **Error Resilience**           | Comprehensive error handling with retry logic and user-friendly messages                  |

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="150">

**Frontend**

</td>
<td>

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![MUI](https://img.shields.io/badge/MUI_v7-007FFF?style=flat-square&logo=mui&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

</td>
</tr>
<tr>
<td align="center">

**Animations**

</td>
<td>

![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

</td>
</tr>
<tr>
<td align="center">

**Charts**

</td>
<td>

![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)

</td>
</tr>
<tr>
<td align="center">

**API**

</td>
<td>

![Amadeus](https://img.shields.io/badge/Amadeus_API-1A1F71?style=flat-square&logo=amadeus&logoColor=white)

</td>
</tr>
<tr>
<td align="center">

**Build Tool**

</td>
<td>

![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)

</td>
</tr>
</table>

---

## 🎯 Project Highlights

### 🔒 Sticky Filter Sidebar

The filter sidebar (Price Graph + Slider + Sort Tabs) uses `position: sticky` with `align-items: flex-start` to remain perfectly fixed while scrolling through flight results. This ensures a seamless filtering experience without any layout jumps.

### 🔍 Dynamic Airport Suggestions

Real-time airport autocomplete powered by the Amadeus Locations API with:

- **400ms debouncing** to minimize API calls
- **Smart caching** of search results
- **Graceful error handling** that never breaks the UI

### 🎨 Premium Glassmorphic Design

- **Mesh gradient backgrounds** that adapt to theme mode
- **Frosted glass effects** with `backdrop-filter: blur(15px)`
- **Floating navbar** with rounded corners and subtle shadows
- **Smooth 0.3s transitions** on all interactive elements

### ⚡ Performance Optimized

- **React.memo** on FlightCard and PriceGraph components
- **useMemo** for flight filtering/sorting logic
- **useCallback** for stable function references
- **Lazy loading** ready architecture

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Amadeus API credentials ([Get them here](https://developers.amadeus.com/))

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/aamamunszone/spotter-wing.git
cd spotter-wing

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Add your Amadeus API credentials to .env.local
# (See Environment Variables section below)

# 5. Start development server
npm run dev

# 6. Open http://localhost:5173 in your browser
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Amadeus API Credentials
# Get yours at: https://developers.amadeus.com/

VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here
```

> ⚠️ **Important:** Never commit your `.env.local` file. It's already in `.gitignore`.

---

## 📁 Architecture

Spotter-Wing uses a **Feature-based Folder Structure** for scalability and maintainability:

```
src/
├── api/                    # API layer
│   └── amadeus.js          # Amadeus API integration with retry logic
├── components/
│   └── common/             # Shared UI components
│       ├── ErrorBoundary.jsx
│       ├── LiveStatusIndicator.jsx
│       ├── LoadingSkeleton.jsx
│       └── ThemeToggle.jsx
├── features/               # Feature modules
│   ├── graph/
│   │   └── PriceGraph.jsx
│   ├── results/
│   │   └── FlightCard.jsx
│   └── search/
│       └── SearchForm.jsx
├── hooks/                  # Custom React hooks
│   ├── useDebounce.js
│   └── useFlightSearch.js
├── theme/                  # MUI theme configuration
│   └── AppTheme.js
├── utils/                  # Utility functions
│   ├── errorHandler.js
│   └── formatters.js
├── App.jsx                 # Main application component
└── main.jsx                # Entry point
```

---

## 🎨 Screenshots

<div align="center">

| Light Mode                                                                    | Dark Mode                                                                    |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ![Light Mode](https://i.ibb.co.com/4nt8qdbW/Screenshot-2026-01-17-032631.png) | ![Dark Mode](https://i.ibb.co.com/SDRpd6rN/Screenshot-2026-01-17-032653.png) |

</div>

---

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality              |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Abdullah Al Mamun**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aamamunszone)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/aamamunszone)

</div>

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ for the Spotter Assignment

</div>
