# 📚 Book Tracker – React Native (Expo)

A mobile app to manage your personal library, track reading progress, and set annual goals – built with React Native, Expo Router, and AsyncStorage for offline data persistence.

## ✨ Features
- **Add, View, Delete** books (title, author, rating 1–5)
- **Search & Filter** by title, author, or star rating
- **Reading Statistics** – total books, average rating, top book, rating distribution
- **Annual Goal Tracker** – set a target and see progress with a visual progress bar
- **Dark / Light theme** – automatically adapts to system preference
- **Offline-first** – all book data stored locally via AsyncStorage (no cloud setup needed)
- **Authentication** – user registration/login using Appwrite (email/password, min 8 characters)

## 🛠️ Tech Stack
- React Native (Expo SDK 57)
- Expo Router (file-based navigation)
- AsyncStorage (local persistence)
- Appwrite (authentication)
- React Context (state management)

## 🚀 Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/MaazzAlii/react-native-expo-appwrite-book-tracker.git
   cd react-native-expo-appwrite-book-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**  
   - Scan the QR code with **Expo Go** (Android/iOS)  
   - Or press `a` for Android emulator / `w` for Web preview

> **No `.env` configuration is required** – book data is stored locally via AsyncStorage.  
> Credentials in `.env` are pre-configured for Appwrite authentication.

## 📖 What I Learned
- Core React Native components (`View`, `Text`, `FlatList`, `TextInput`, `Pressable`)
- Styling with Flexbox and reusable themed components
- File-based routing with Expo Router (nested layouts, dynamic routes)
- Managing global state with React Context (`AuthContext`, `BooksContext`)
- CRUD operations with **AsyncStorage** (persist data across app restarts)
- Real-time search and filtering using `useMemo`
- Building a multi-screen app with tabs and nested stacks
- Handling forms, validation, and error states
- Integrating third-party authentication (Appwrite)

## 🧪 Practice Screens (for the course)
- **Search & Filter** – dynamic filtering with rating chips
- **Reading Stats** – aggregate analytics and bar chart
- **Goal Tracker** – interactive target stepper with progress

## 📁 Project Structure
```
app/
├── (auth)/          – Login / Register screens
├── (dashboard)/     – Main tabs (Books, Add, Profile)
├── (practice)/      – Extra screens for the assignment
components/          – Reusable UI (ThemedButton, BookCard, etc.)
context/             – AuthContext, BooksContext (AsyncStorage)
constants/           – Colors, themes
lib/                 – Appwrite client configuration
```

## 📝 Notes for Evaluator
- The app runs **completely offline** for book tracking – no cloud database setup required.
- Authentication uses Appwrite – register with any valid email and password (minimum 8 characters).
- All features are fully functional and the code passes `npx expo lint` with **0 errors and 0 warnings**.

---

**Made with ❤️ for the React Native course**
