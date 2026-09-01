# React Native & Appwrite — Complete Master Class Notes

Comprehensive technical documentation, code snippets, architectural patterns, and practical guides covering all 29 lessons of the Net Ninja React Native & Appwrite course.

---

## 📚 Table of Contents
1. [Lesson 1–2: Introduction & Core Components](#lesson-1-2-introduction--core-components)
2. [Lesson 3: File-Based Routing with Expo Router](#lesson-3-file-based-routing-with-expo-router)
3. [Lesson 4: Stack Layout & Screen Navigation Options](#lesson-4-stack-layout--screen-navigation-options)
4. [Lesson 5: Light & Dark Theme Systems](#lesson-5-light--dark-theme-systems)
5. [Lesson 6: Custom Themed Components & Reusability](#lesson-6-custom-themed-components--reusability)
6. [Lesson 7: Route Groups & Nested Layouts](#lesson-7-route-groups--nested-layouts)
7. [Lesson 8: Pressable vs Touchable Components](#lesson-8-pressable-vs-touchable-components)
8. [Lesson 9–10: Tab Navigation & Vector Icons](#lesson-9-10-tab-navigation--vector-icons)
9. [Lesson 11: Safe Area & Insets Management](#lesson-11-safe-area--insets-management)
10. [Lesson 12: Appwrite Backend & SDK Integration](#lesson-12-appwrite-backend--sdk-integration)
11. [Lesson 13–15: Authentication & User Sessions](#lesson-13-15-authentication--user-sessions)
12. [Lesson 16–18: Error Handling & Logout Flows](#lesson-16-18-error-handling--logout-flows)
13. [Lesson 19–20: Route Guards & Loading Spinners](#lesson-19-20-route-guards--loading-spinners)
14. [Lesson 21: Appwrite NoSQL Database Setup](#lesson-21-appwrite-nosql-database-setup)
15. [Lesson 22–24: Books Context & Database CRUD Queries](#lesson-22-24-books-context--database-crud-queries)
16. [Lesson 25: Virtualized List Performance with FlatList](#lesson-25-virtualized-list-performance-with-flatlist)
17. [Lesson 26: Real-Time WebSocket Subscriptions](#lesson-26-real-time-websocket-subscriptions)
18. [Lesson 27–29: Dynamic Route Parameters & Record Lifecycle](#lesson-27-29-dynamic-route-parameters--record-lifecycle)

---

## Lesson 1–2: Introduction & Core Components
React Native compiles JavaScript components into native platform views (`UIView` on iOS, `android.view.View` on Android).
- `<View>` maps directly to native layout containers.
- `<Text>` must wrap all text strings (raw text strings in `<View>` throw runtime errors).
- `<Image>` renders local or remote images with static `require()` or `{ uri }`.
- `<StyleSheet.create>` optimizes style declarations by converting style objects into numerical references.

```jsx
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Tracker App</Text>
      <Image source={require('../assets/img/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  logo: { width: 100, height: 100 },
});
```

---

## Lesson 3: File-Based Routing with Expo Router
Expo Router uses filesystem path hierarchy under `app/` to define application routes:
- `app/index.jsx` -> `/` (Home route)
- `app/about.jsx` -> `/about` (About route)
- `<Link href="/about">` performs client-side declarative navigation.

---

## Lesson 4: Stack Layout & Screen Navigation Options
`<Stack>` layout manages native stack transition animations (card push/pop).
`screenOptions` configures header background colors, tint colors, title styles, and screen titles.

```jsx
<Stack
  screenOptions={{
    headerStyle: { backgroundColor: '#1e293b' },
    headerTintColor: '#ffffff',
    headerTitleStyle: { fontWeight: 'bold' },
  }}
>
  <Stack.Screen name="index" options={{ title: 'Home' }} />
  <Stack.Screen name="about" options={{ title: 'About' }} />
</Stack>
```

---

## Lesson 5–6: Light & Dark Theme Systems & Custom Components
`useColorScheme()` returns `'light'` or `'dark'`.
By wrapping primitives in custom themed components (`ThemedView`, `ThemedText`), screens automatically adapt colors without inline logic duplicates.

---

## Lesson 7: Route Groups & Nested Layouts
Parentheses in directory names (e.g. `app/(auth)` or `app/(dashboard)`) isolate navigation stacks without adding path segments to the URL route.

---

## Lesson 8: Pressable vs Touchable Components
`<Pressable>` is the modern React Native interaction component supporting press state callbacks (`pressed`), ripple effects on Android, and custom hit slops.

```jsx
<Pressable
  onPress={onPress}
  style={({ pressed }) => [styles.button, pressed && styles.pressed]}
>
  <Text style={styles.text}>{title}</Text>
</Pressable>
```

---

## Lesson 9–10: Tab Navigation & Vector Icons
`<Tabs>` renders a native bottom tab bar controller. Using `@expo/vector-icons/Ionicons`, tab icons toggle focused/unfocused vector designs.

---

## Lesson 11: Safe Area & Insets Management
`react-native-safe-area-context` prevents UI elements from hiding behind notch, status bar, or home indicator software boundaries.

---

## Lesson 12: Appwrite Backend & SDK Integration
Appwrite provides backend services (Auth, Database, Storage, Realtime).
Initial SDK configuration requires setting the Endpoint URL and Project ID.

```javascript
import { Account, Client, Databases } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

export const account = new Account(client);
export const databases = new Databases(client);
```

---

## Lesson 13–18: Authentication, Forms & Session State
`AuthContext` provides global session state:
- `account.createEmailPasswordSession(email, password)` logs in users.
- `account.create(ID.unique(), email, password, name)` registers new accounts.
- `account.deleteSession('current')` terminates active sessions.
- `account.get()` restores session on launch.

---

## Lesson 19–20: Protected Routes & Loading Spinners
Route guards in `app/_layout.jsx` use `useSegments()` and `useRouter()` inside `useEffect` to redirect unauthenticated attempts to access dashboard screens to `/login`.
`LoadingSpinner` renders `<ActivityIndicator>` while initial auth checks run.

---

## Lesson 21–24: Appwrite Database CRUD Queries
Appwrite Databases store documents within collections.
- `databases.createDocument()` inserts records.
- `databases.listDocuments()` with `Query.equal('userId', userId)` fetches user-owned documents.
- `databases.getDocument()` fetches single document details.
- `databases.deleteDocument()` deletes document instances.

---

## Lesson 25: Virtualized List Performance with FlatList
`<FlatList>` virtualizes large datasets, rendering only visible viewport items to minimize memory overhead.

```jsx
<FlatList
  data={books}
  keyExtractor={(item) => item.$id}
  renderItem={({ item }) => <BookCard book={item} />}
  ListEmptyComponent={<Text>No books found.</Text>}
/>
```

---

## Lesson 26: Real-Time WebSocket Subscriptions
`client.subscribe()` listens to database collection channels. Realtime WebSocket events broadcast document changes live.

```javascript
const unsubscribe = client.subscribe(
  `databases.${dbId}.collections.${colId}.documents`,
  (response) => {
    if (response.events.some((e) => e.endsWith('.create'))) {
      // Handle new document
    }
  }
);
```

---

## Lesson 27–29: Dynamic Routes & Delete Lifecycle
Dynamic path parameter `app/(dashboard)/books/[id].jsx` extracts the parameter via `useLocalSearchParams()`, fetches document details via `databases.getDocument()`, and handles document deletion with `databases.deleteDocument()`.
