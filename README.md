# react-native-expo-appwrite-book-tracker

![Expo](https://img.shields.io/badge/Expo-SDK--51-black?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.74+-61DAFB?style=for-the-badge&logo=react)
![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-F02E65?style=for-the-badge&logo=appwrite)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

> Cross-platform mobile app built with React Native, Expo, and Expo Router, using Appwrite for authentication, cloud database CRUD, and realtime sync. Features themed light/dark UI, protected routes, tab and stack navigation, dynamic routes, and FlatList rendering — plus standalone practice screens and lesson-by-lesson notes.

## 📌 Repository Topics
`react-native` · `expo` · `expo-router` · `appwrite` · `mobile-app` · `android` · `ios` · `cross-platform` · `react-context` · `authentication` · `crud` · `realtime` · `flatlist` · `dark-mode` · `javascript` · `react-hooks` · `book-tracker`

---

## 📑 Overview
This application is built following the complete 29-lesson React Native course playlist by Net Ninja. It serves as both a full-featured cross-platform personal Book Tracker mobile app and an engineering portfolio demonstrating modern React Native & BaaS development practices.

---

## 🛠 Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Framework** | Expo SDK (latest) | Cross-platform runtime & tools |
| **Routing** | Expo Router | File-based Stack, Tabs & Route Groups |
| **Language** | JavaScript (JSX) | ES6+ standard |
| **State Management** | React Context API + Hooks | `AuthContext`, `BooksContext` |
| **Backend / BaaS** | Appwrite Cloud | Authentication, Databases, Realtime WebSockets |
| **Styling** | React Native StyleSheet | Dynamic Light / Dark theme design system |
| **Storage** | Async Storage | Local state persistence (Practice screens) |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (≥18 LTS)
- npm or yarn
- Expo Go app installed on your physical iOS/Android device, or an iOS Simulator / Android Emulator.

### 2. Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/react-native-expo-appwrite-book-tracker.git
cd react-native-expo-appwrite-book-tracker

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env
```

### 3. Environment Variables
Edit your `.env` file with your Appwrite project configuration:
```bash
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_PLATFORM=dev.yourname.booktracker
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_APPWRITE_BOOKS_COLLECTION_ID=your_books_collection_id
```

> **Security Warning:** Environment variables prefixed with `EXPO_PUBLIC_` are bundled into the client JavaScript code. Never place secret API keys in this file. Security and document permissions are handled by Appwrite document-level access control.

### 4. Running the Application
```bash
npx expo start
```
Scan the QR code with Expo Go on Android or the Camera app on iOS.

---

## 📖 Lesson Index & Notes
- [Lesson Index](docs/LESSON_INDEX.md) — 29-lesson breakdown mapping commits and Git tags (`lesson-01` … `lesson-29`).
- [Practice Screens](docs/PRACTICE_SCREENS.md) — Documentation for standalone practice modules.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
