# 📝 React Native & Expo Learning Log Index

Welcome to my personal React Native & Expo development learning log! This index summarizes the four core modules I mastered while building the cross-platform **Book Tracker** mobile application.

---

## 📚 Module Overview

| Module File | Topic / Focus | Core Concepts Covered |
|---|---|---|
| [`01-expo-foundations.md`](./01-expo-foundations.md) | Expo SDK Foundations & Toolchain | Expo SDK 57, Metro bundler, project structure, core primitives, vector icons, safe areas |
| [`02-styling-theming-navigation.md`](./02-styling-theming-navigation.md) | Styling, Dark/Light Themes & Navigation | Custom theme tokens, primitive components, Expo Router file-based Stack/Tab routing, route groups |
| [`03-auth-appwrite.md`](./03-auth-appwrite.md) | Authentication & Session Management | `react-native-appwrite` SDK, email/password auth, AuthContext state, persistent auto-login, protected route guards |
| [`04-database-realtime-dynamic-routes.md`](./04-database-realtime-dynamic-routes.md) | Appwrite NoSQL Database, Realtime & Dynamic Routing | Databases API, Query filtering, document CRUD, WebSocket channels (`client.subscribe`), dynamic parameters `[id].jsx` |

---

## 💡 Key Architectural Takeaways

- **Component Decoupling**: Building custom themed wrappers (`ThemedView`, `ThemedText`, `ThemedButton`, `ThemedTextInput`) isolates styling logic and enables effortless dark mode adaptation across all screens.
- **Declarative Navigation**: File-based routing with Expo Router provides type-safe and intuitive navigation hierarchies using filesystem structures (`app/`, `(auth)/`, `(dashboard)/`, `(practice)/`).
- **Resilient Authentication**: Persistent session restoration via `account.get()` on application launch eliminates unnecessary re-logins and creates a seamless native experience.
- **Reactive UI**: Combining Appwrite WebSocket realtime subscriptions with React Context updates keeps library state synchronized instantly across multi-device sessions without manual refreshes.
