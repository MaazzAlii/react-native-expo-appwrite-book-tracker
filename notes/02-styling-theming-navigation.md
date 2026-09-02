# 🎨 Module 02: Styling, Dynamic Theming & Expo Router Navigation

## 📌 Concepts Mastered
In this module, I focused on building a scalable theme system supporting Light and Dark color schemes automatically while implementing file-based navigation with Expo Router.

Key concepts include:
- **System Theme Detection**: Using React Native's `useColorScheme()` hook to dynamically detect system theme preferences and switch theme tokens at runtime.
- **Custom Themed Primitive Components**: Encapsulating styling tokens into reusable primitives (`ThemedView`, `ThemedText`, `ThemedButton`, `ThemedTextInput`, `ThemedSafeAreaView`).
- **File-Based Routing Architecture**: Utilizing Expo Router to define nested Stack and Tab navigation structures based on directory hierarchy (`app/`, `(auth)/`, `(dashboard)/`, `(practice)/`).
- **Route Groups**: Organizing routes logically using parenthetical folders `(group)` without adding extra segments to the URL path.

---

## 🛠️ API Surface & Code Patterns Used

### 1. Theme Configuration Token Object (`constants/Colors.js`)
```javascript
export const Colors = {
  light: {
    text: '#1e293b',
    background: '#f8fafc',
    cardBackground: '#ffffff',
    navBackground: '#ffffff',
    border: '#e2e8f0',
    iconColor: '#64748b',
    iconColorFocused: '#6366f1',
    warning: '#ef4444',
  },
  dark: {
    text: '#f8fafc',
    background: '#0f172a',
    cardBackground: '#1e293b',
    navBackground: '#1e293b',
    border: '#334155',
    iconColor: '#94a3b8',
    iconColorFocused: '#818cf8',
    warning: '#f87171',
  },
};
```

### 2. Encapsulated Primitive Component (`components/ThemedText.jsx`)
```javascript
import { Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function ThemedText({ style, variant = 'body', children, ...props }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const variantStyles = {
    title: { fontSize: 24, fontWeight: '700', color: theme.text },
    subtitle: { fontSize: 16, color: theme.iconColor },
    body: { fontSize: 14, color: theme.text },
    caption: { fontSize: 12, color: theme.iconColor },
  };

  return (
    <Text style={[variantStyles[variant], style]} {...props}>
      {children}
    </Text>
  );
}
```

### 3. File-Based Tab Bar Configuration (`app/(dashboard)/_layout.jsx`)
```javascript
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function DashboardTabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="books/index"
        options={{
          title: 'My Books',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## ⚠️ Gotchas & Lessons Learned

1. **Tab Bar Screen Over-Registration**: In Expo Router `<Tabs>`, every file inside the route group directory automatically registers as a tab item unless explicitly configured or moved to a separate route group or subfolder. Moving practice screens (`search`, `stats`, `goal`) into `(practice)` reduced dashboard clutter to **exactly 3 clean tabs**.
2. **Theme Re-rendering Performance**: Reading `useColorScheme()` inside every small component is clean, but for complex screen layouts, memoizing theme styles or passing theme via React Context prevents redundant recalculations during scrolling.
3. **Route Group Invisibility**: Folders surrounded by parentheses like `(auth)` or `(dashboard)` do not add URL segments. Navigating to `/login` matches `app/(auth)/login.jsx` directly.
