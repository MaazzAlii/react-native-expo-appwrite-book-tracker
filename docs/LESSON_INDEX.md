# 🏷️ Lesson Tag Index & Repository Audit Table

This document provides a comprehensive, 29-row index of all tagged lessons in the **Book Tracker** repository (`lesson-01` through `lesson-29`).

---

## 📅 Lesson Index Table

| Lesson | Topic | Key Concepts | Files Touched | Git Tag |
|---|---|---|---|---|
| **01** | Project Setup & Welcome Screen | Expo SDK 57 setup, Metro bundler, basic welcome screen layout | `app/index.jsx`, `app.json`, `package.json` | `lesson-01` |
| **02** | Core UI Primitives | Native primitives (`View`, `Text`, `Image`, `StyleSheet`), native flexbox | `app/index.jsx`, `assets/img/logo.png` | `lesson-02` |
| **03** | File-Based Routing | Expo Router file routing, static screen navigation | `app/about.jsx`, `app/index.jsx` | `lesson-03` |
| **04** | Stack Layout & Header Styles | Root Stack Navigator configuration, custom header styles | `app/_layout.jsx` | `lesson-04` |
| **05** | Light & Dark Color Theme System | `useColorScheme` hook, dynamic theme color tokens | `constants/Colors.js` | `lesson-05` |
| **06** | Custom Themed Primitive Components | `ThemedView`, `ThemedText`, `Spacer` component wrappers | `components/ThemedView.jsx`, `components/ThemedText.jsx`, `components/Spacer.jsx` | `lesson-06` |
| **07** | Route Groups & Nested Layouts | Parenthetical route groups `(auth)` and `(dashboard)` | `app/(auth)/_layout.jsx`, `app/(dashboard)/_layout.jsx` | `lesson-07` |
| **08** | Custom Interactive Buttons | `Pressable` component feedback, primary & secondary button variants | `components/ThemedButton.jsx` | `lesson-08` |
| **09** | Bottom Tabs Navigation | Expo Router `<Tabs>` navigation layout | `app/(dashboard)/_layout.jsx` | `lesson-09` |
| **10** | Tab Bar Vector Icons | Vector iconography with `@expo/vector-icons` (`Ionicons`), active focus states | `app/(dashboard)/_layout.jsx` | `lesson-10` |
| **11** | Safe Area & Inset Handling | Device notches, bottom home bars, `ThemedSafeAreaView` wrapper | `components/ThemedSafeAreaView.jsx` | `lesson-11` |
| **12** | Appwrite SDK Initialization | `react-native-appwrite` SDK setup, endpoint & project configuration | `lib/appwrite.js`, `.env.example` | `lesson-12` |
| **13** | Authentication Form Inputs | Text inputs with `ThemedTextInput`, password masking, form state | `components/ThemedTextInput.jsx`, `app/(auth)/login.jsx`, `app/(auth)/register.jsx` | `lesson-13` |
| **14** | Global Auth State Context | React Context provider (`AuthProvider`), global user state | `context/AuthContext.js` | `lesson-14` |
| **15** | Appwrite User Session Login | `account.createEmailPasswordSession` integration & account fetching | `context/AuthContext.js`, `app/(auth)/login.jsx` | `lesson-15` |
| **16** | Context Error Handling | Form validation, inline error messaging, warning banner styles | `app/(auth)/login.jsx`, `app/(auth)/register.jsx` | `lesson-16` |
| **17** | User Sign Out Lifecycle | Session destruction via `account.deleteSession('current')` | `app/(dashboard)/profile.jsx`, `context/AuthContext.js` | `lesson-17` |
| **18** | Persistent Auto-Login Restoration | Session verification on launch using `account.get()` | `context/AuthContext.js` | `lesson-18` |
| **19** | Protected Route Navigation Guard | `useSegments` route inspection and automatic auth redirects | `app/_layout.jsx` | `lesson-19` |
| **20** | Loading Spinner Overlay | Fullscreen `ActivityIndicator` loading state while checking session | `components/LoadingSpinner.jsx` | `lesson-20` |
| **21** | Appwrite Database Schema Design | Collection attributes (`title`, `author`, `rating`, `userId`), data types & permissions | `docs/appwrite-schema.md` | `lesson-21` |
| **22** | Global Books Context Store | Library state management provider (`BooksProvider`) | `context/BooksContext.js` | `lesson-22` |
| **23** | Document Creation Form | Book submission form, rating validation, `databases.createDocument` | `app/(dashboard)/create.jsx`, `context/BooksContext.js` | `lesson-23` |
| **24** | User-Filtered Collection Query | Document queries filtered by owner ID (`Query.equal('userId', userId)`) | `context/BooksContext.js`, `app/(dashboard)/books/index.jsx` | `lesson-24` |
| **25** | Virtualized Book List Rendering | Performance rendering with `<FlatList>` & reusable `BookCard` components | `components/BookCard.jsx`, `app/(dashboard)/books/index.jsx` | `lesson-25` |
| **26** | Realtime WebSocket Subscriptions | Remote live sync with `client.subscribe` for real-time document events | `context/BooksContext.js` | `lesson-26` |
| **27** | Dynamic Parameter Routing | Parameterized route paths `app/(dashboard)/books/[id].jsx` | `app/(dashboard)/books/[id].jsx` | `lesson-27` |
| **28** | Single Document Retrieval | Fetching specific records using `databases.getDocument` | `app/(dashboard)/books/[id].jsx`, `context/BooksContext.js` | `lesson-28` |
| **29** | Document Deletion Lifecycle | Record deletion with `databases.deleteDocument` & context state sync | `app/(dashboard)/books/[id].jsx`, `context/BooksContext.js` | `lesson-29` |
