# 📚 Book Tracker — Cross-Platform Mobile App

[![Expo SDK 57](https://img.shields.io/badge/Expo-SDK%2057-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![Appwrite](https://img.shields.io/badge/Appwrite-Cloud%20%2F%20Self--Hosted-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A production-grade, cross-platform mobile application built with **React Native**, **Expo SDK 57**, **Expo Router**, and **Appwrite Cloud**.

This application features user authentication (email/password), full cloud NoSQL CRUD database operations, real-time WebSocket subscriptions, light/dark theme detection, protected navigation guards, virtualized list rendering, and standalone practice screens for book search/filtering, reading stats, and annual goal tracking.

---

## 🌟 Key Features

- **🔐 Appwrite Authentication**: Complete user registration, login, logout, and persistent session auto-login on app launch.
- **🛡️ Navigation Guards & Protected Routes**: Route group access control preventing unauthorized navigation to private screens.
- **⚡ Real-Time Sync**: Live WebSocket collection subscriptions updating UI instantly upon document creation or deletion across devices.
- **📱 Modern File-Based Navigation**: Stack and Tab navigation hierarchy built using Expo Router file convention.
- **🎨 Dynamic Theme Support**: Light and Dark mode scheme switching using custom themed components (`ThemedView`, `ThemedText`, `ThemedButton`, `ThemedTextInput`, `ThemedSafeAreaView`).
- **📊 Reading Statistics & Analytics**: Live calculations for library book count, rating distributions, and top-rated titles.
- **🔍 Search & Chip Filtering**: Real-time title/author string searching combined with star-rating chip filters.
- **🎯 Reading Goal Tracker**: Interactive annual goal target setting, dynamic completion progress bar, and milestone celebration banners.
- **⚡ Native Performance**: Virtualized rendering with `<FlatList>` and safe inset management with `react-native-safe-area-context`.

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
|---|---|---|
| **Framework** | Expo SDK 57 | React Native application toolchain (`~57.0.19`) |
| **Core UI** | React Native 0.86.3 | Native UI rendering engine for iOS and Android |
| **Routing** | Expo Router `~57.0.18` | File-based Stack and Tab navigation |
| **Backend** | `react-native-appwrite` `^0.34.0` | Authentication, Databases, and Realtime WebSocket SDK |
| **Icons** | `@expo/vector-icons` | Vector iconography (`Ionicons`) |
| **Safe Areas** | `react-native-safe-area-context` | Notch and window inset management |
| **Linting** | ESLint 9 + Expo Config | Quality control and zero-warning code quality |

---

## 📂 Project Architecture & Navigation Hierarchy

```
react-native-expo-appwrite-book-tracker/
├── app/
│   ├── _layout.jsx             # Root layout, AuthProvider & Route Protection Guard
│   ├── index.jsx               # Landing Welcome Screen
│   ├── about.jsx               # About Screen
│   ├── (auth)/                 # Route Group: Authentication
│   │   ├── _layout.jsx         # Auth Stack Layout
│   │   ├── login.jsx           # User Login Screen
│   │   └── register.jsx        # User Registration Screen
│   └── (dashboard)/            # Route Group: Protected Dashboard
│       ├── _layout.jsx         # Bottom Tabs Navigation & BooksProvider
│       ├── books/
│       │   ├── index.jsx       # Virtualized FlatList My Books Screen
│       │   └── [id].jsx        # Dynamic Route Book Details & Delete Screen
│       ├── create.jsx          # Add New Book Form Screen
│       ├── search.jsx          # Search & Star Filter Practice Screen
│       ├── stats.jsx           # Reading Analytics & Stats Practice Screen
│       ├── goal.jsx            # Reading Goal Progress Practice Screen
│       └── profile.jsx         # User Profile & Sign Out Screen
├── components/                 # Custom Themed Components & UI Helpers
├── constants/                  # Color Schemes (Light & Dark)
├── context/                    # React Context (AuthContext & BooksContext)
├── docs/                       # Technical Documentation & Schemas
├── lib/                        # Appwrite Client Configuration
├── assets/                     # Application Media & Vector Fonts
├── .agent-state.md             # Task Progress Tracking State
├── React_Native_Complete_Notes.md # Complete Course Lesson Summaries
└── README.md                   # Repository Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher (`v24.x` recommended)
- **npm**: `v10.x` or higher
- **Expo Go App**: Installed on physical iOS/Android device OR iOS Simulator / Android Emulator

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MaazzAlii/react-native-expo-appwrite-book-tracker.git
   cd react-native-expo-appwrite-book-tracker
   ```

2. **Install Managed Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory following `.env.example`:
   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=book_tracker_db
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=books
   ```

4. **Start Development Server**:
   ```bash
   npx expo start
   ```
   Scan the generated QR code using the **Expo Go** app on your physical smartphone!

---

## 🏷️ Course Roadmap & Git Tags Index

Every lesson task in this repository is committed and tagged atomically. You can checkout any specific lesson state using `git checkout <tag-name>`:

| Lesson Tag | Topic / Feature Implemented |
|---|---|
| `lesson-01` | React Native Project Setup & Welcome Screen |
| `lesson-02` | Core Components (`View`, `Text`, `Image`, `StyleSheet`) |
| `lesson-03` | File-Based Routing with Expo Router (`app/about.jsx`) |
| `lesson-04` | Stack Layout Navigation & Header Styles (`app/_layout.jsx`) |
| `lesson-05` | Light & Dark Color Theme System (`constants/Colors.js`) |
| `lesson-06` | Custom Themed Primitive Components (`components/`) |
| `lesson-07` | Route Groups & Nested Layouts (`(auth)`, `(dashboard)`) |
| `lesson-08` | Custom Pressable Buttons & Interactivity (`ThemedButton.jsx`) |
| `lesson-09` | Bottom Tabs Navigation (`app/(dashboard)/_layout.jsx`) |
| `lesson-10` | Tab Bar Vector Icons & Styling (`Ionicons`) |
| `lesson-11` | Safe Area & Inset Handling (`ThemedSafeAreaView.jsx`) |
| `lesson-12` | Appwrite Client & SDK Initialization (`lib/appwrite.js`) |
| `lesson-13` | Login & Register Form Inputs (`ThemedTextInput.jsx`) |
| `lesson-14` | Global Auth State Management (`context/AuthContext.js`) |
| `lesson-15` | Appwrite User Session Login Integration |
| `lesson-16` | Context Error Handling & Inline Warning Banners |
| `lesson-17` | User Sign Out Flow (`account.deleteSession`) |
| `lesson-18` | Persistent Auto-Login Session Restoration on Launch |
| `lesson-19` | Protected Navigation Guard Logic (`useSegments`, `useRouter`) |
| `lesson-20` | Activity Indicator Loading Overlay (`LoadingSpinner.jsx`) |
| `lesson-21` | Appwrite Database & Collection Schema (`docs/appwrite-schema.md`) |
| `lesson-22` | Global Books Context Store (`context/BooksContext.js`) |
| `lesson-23` | Document Creation Form & Appwrite Insert (`createDocument`) |
| `lesson-24` | User-Filtered Collection Fetching (`listDocuments`, `Query.equal`) |
| `lesson-25` | Virtualized Book List Rendering (`<FlatList>`, `BookCard.jsx`) |
| `lesson-26` | Real-Time WebSocket Channel Subscriptions (`client.subscribe`) |
| `lesson-27` | Dynamic Parameter Routing (`app/(dashboard)/books/[id].jsx`) |
| `lesson-28` | Single Record Retrieval by ID (`databases.getDocument`) |
| `lesson-29` | Document Deletion Lifecycle (`databases.deleteDocument`) |

---

## 🧪 Quality Verification & Audit

This project maintains 100% strict verification compliance:

1. **Linting Check**:
   ```bash
   npx expo lint
   ```
   *(Passes cleanly with 0 errors and 0 warnings)*

2. **Project Integrity Check**:
   ```bash
   npx expo-doctor
   ```
   *(Passes 21/21 diagnostic checks)*

3. **Production Android Export Verification**:
   ```bash
   npx expo export --platform android
   ```
   *(Generates optimized bytecode bundle under `dist/` cleanly)*

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
