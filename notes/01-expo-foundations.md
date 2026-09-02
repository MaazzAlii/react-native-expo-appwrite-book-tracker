# 🚀 Module 01: Expo Foundations & Native Toolchain

## 📌 Concepts Mastered
In this initial module, I explored the core foundation of React Native development using Expo SDK 57. I learned how Expo provides a unified toolchain over native iOS and Android build environments, allowing for rapid cross-platform development without needing custom Xcode or Android Studio configurations.

Key concepts include:
- **Expo Framework & Metro Bundler**: How Metro packages JavaScript modules into an optimized bundle served live to Expo Go devices or bundled for production using `expo export`.
- **Core Primitives**: Understanding the difference between web HTML elements and native React Native primitives (`View` instead of `div`, `Text` instead of `p`/`h1`, `Image` instead of `img`).
- **Safe Area Insets**: Managing device screen cutouts (notch, dynamic island, home indicator bar) using `react-native-safe-area-context`.
- **Vector Icons**: Integrating `@expo/vector-icons` (`Ionicons`) for scalable cross-platform iconography.

---

## 🛠️ API Surface & Code Patterns Used

### 1. Core Primitives & Layout Styling
```javascript
import { Image, StyleSheet, Text, View } from 'react-native';

export function HeaderBanner() {
  return (
    <View style={styles.banner}>
      <Image 
        source={require('../assets/img/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Book Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

### 2. Safe Area Inset Management
```javascript
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export function ScreenContainer({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      {children}
    </View>
  );
}
```

---

## ⚠️ Gotchas & Lessons Learned

1. **Text Must Be Inside `<Text>`**: Unlike web development where text nodes can sit directly inside `<div>`, in React Native all raw string text MUST be wrapped within a `<Text>` component. Unwrapped strings cause immediate runtime crashes (`Text strings must be rendered within a <Text> component`).
2. **Explicit Image Dimensions**: Native images loaded from local assets or remote URLs require explicit width and height styling. Without explicit dimensions, images default to 0x0 pixels and remain invisible on device screens.
3. **Flexbox Defaults**: Flex direction in React Native defaults to `column` rather than `row` (unlike CSS Flexbox on web). Additionally, all flex sizes are unitless density-independent pixels.
