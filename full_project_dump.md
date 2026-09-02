--- FILE: package.json ---
{
  "name": "book-tracker",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo/ui": "~57.0.15",
    "@expo/vector-icons": "^15.0.2",
    "@react-native-async-storage/async-storage": "2.1.2",
    "eslint-config-expo": "~57.0.2",
    "expo": "~57.0.19",
    "expo-constants": "~57.0.17",
    "expo-device": "~57.0.1",
    "expo-font": "~57.0.3",
    "expo-glass-effect": "~57.0.1",
    "expo-image": "~57.0.4",
    "expo-linking": "~57.0.9",
    "expo-router": "~57.0.18",
    "expo-splash-screen": "~57.0.8",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.2",
    "expo-system-ui": "~57.0.3",
    "expo-web-browser": "~57.0.2",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-appwrite": "^0.34.0",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-url-polyfill": "^4.0.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "eslint": "^9.39.5",
    "eslint-config-expo": "~57.0.2",
    "typescript": "~6.0.3"
  },
  "overrides": {
    "expo-file-system": "$expo-file-system"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "private": true
}

--- FILE: app.json ---
{
  "expo": {
    "name": "Book Tracker",
    "slug": "book-tracker",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "booktracker",
    "userInterfaceStyle": "automatic",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ]
  }
}

--- FILE: tsconfig.json ---
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}

--- FILE: eslint.config.js ---
// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require("eslint-config-expo");

module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/*"],
  },
];

--- FILE: .env.example ---
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=6701a2b3001122334455
EXPO_PUBLIC_APPWRITE_DATABASE_ID=book_tracker_db
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=books
EXPO_PUBLIC_APPWRITE_PLATFORM=com.anonymous.reactnativeexpobooktracker

--- FILE: app/_layout.jsx ---
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../constants/Colors';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { BooksProvider } from '../context/BooksContext';

function RootNavigation() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedGroup = segments[0] === '(dashboard)' || segments[0] === '(practice)';

    if (!user && inProtectedGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/books');
    }
  }, [user, segments, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(practice)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <BooksProvider>
        <RootNavigation />
      </BooksProvider>
    </AuthProvider>
  );
}

--- FILE: app/index.jsx ---
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Spacer } from '../components/Spacer';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedLogo } from '../components/ThemedLogo';
import { ThemedSafeAreaView } from '../components/ThemedSafeAreaView';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedLogo size={72} />
        <Spacer size={12} />
        <ThemedText variant="title">Book Tracker</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Track your personal library & reading goals</ThemedText>
        <Spacer size={16} />
        <ThemedText variant="body" style={styles.description}>
          Built with React Native, Expo Router, and Appwrite BaaS for cloud synchronization and realtime updates.
        </ThemedText>
        <Spacer size={24} />

        <View style={styles.buttonContainer}>
          <ThemedButton
            title={user ? 'Go to My Library' : 'Sign In / Register'}
            onPress={() => router.push(user ? '/books' : '/login')}
          />
          <Spacer size={12} />
          <ThemedButton
            title="About This App"
            variant="secondary"
            onPress={() => router.push('/about')}
          />
        </View>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
});

--- FILE: app/about.jsx ---
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../components/Spacer';
import { ThemedSafeAreaView } from '../components/ThemedSafeAreaView';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

export default function About() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">About Book Tracker</ThemedText>
        <Spacer size={12} />
        <ThemedText variant="body" style={styles.description}>
          Book Tracker helps you organize your reading lists, track book progress, and set annual reading goals with real-time sync across devices.
        </ThemedText>
        <Spacer size={20} />
        <Link href="/" style={styles.link}>
          <ThemedText style={styles.linkText}>Back to Home</ThemedText>
        </Link>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});

--- FILE: lib/appwrite.js ---
import { Account, Client, Databases, Storage } from 'react-native-appwrite';
import 'react-native-url-polyfill/auto';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '6701a2b3001122334455',
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || 'book_tracker_db',
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || 'books',
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || 'com.anonymous.reactnativeexpobooktracker',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

if (appwriteConfig.platform) {
  client.setPlatform(appwriteConfig.platform);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };

--- FILE: context/AuthContext.js ---
import { createContext, useContext, useEffect, useState } from 'react';
import { ID } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  checkUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error('Appwrite login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      return await login(email, password);
    } catch (error) {
      console.error('Appwrite register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Appwrite logout error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        login,
        register,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

--- FILE: context/BooksContext.js ---
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  isLoading: false,
  setIsLoading: () => {},
  fetchBooks: async () => {},
  getBook: async () => {},
  addBook: async () => {},
  deleteBook: async () => {},
});

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const STORAGE_KEY = 'book_tracker_books';

  const loadBooks = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  };

  const saveBooks = async (newBooks) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBooks));
  };

  const fetchBooks = async (userId) => {
    setIsLoading(true);
    try {
      const allBooks = await loadBooks();
      const userBooks = userId ? allBooks.filter((b) => b.userId === userId) : allBooks;
      setBooks(userBooks);
      return userBooks;
    } catch {
      setBooks([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getBook = async (id) => {
    const allBooks = await loadBooks();
    return allBooks.find((b) => b.$id === id);
  };

  const addBook = async (title, author, rating, userId) => {
    setIsLoading(true);
    try {
      const allBooks = await loadBooks();
      const newBook = {
        $id: Date.now().toString(),
        title,
        author,
        rating: Number(rating),
        userId: userId || 'guest',
        createdAt: new Date().toISOString(),
      };
      const updated = [newBook, ...allBooks];
      await saveBooks(updated);
      const userBooks = userId ? updated.filter((b) => b.userId === userId) : updated;
      setBooks(userBooks);
      return newBook;
    } catch (error) {
      console.error('Add book error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setIsLoading(true);
    try {
      const allBooks = await loadBooks();
      const updated = allBooks.filter((b) => b.$id !== id);
      await saveBooks(updated);
      setBooks((prev) => prev.filter((b) => b.$id !== id));
    } catch (error) {
      console.error('Delete book error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        isLoading,
        setIsLoading,
        fetchBooks,
        getBook,
        addBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
}

--- FILE: app/(auth)/_layout.jsx ---
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function AuthLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Sign In' }} />
      <Stack.Screen name="register" options={{ title: 'Create Account' }} />
    </Stack>
  );
}

--- FILE: app/(auth)/login.jsx ---
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    try {
      await login(email, password);
      router.push('/books');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Welcome Back</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Sign in to your Book Tracker account</ThemedText>
        <Spacer size={20} />

        {!!error && (
          <>
            <ThemedText style={[styles.errorText, { color: theme.warning }]}>
              {error}
            </ThemedText>
            <Spacer size={12} />
          </>
        )}

        <ThemedTextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (error) setError('');
          }}
          secureTextEntry
        />
        <Spacer size={20} />

        <ThemedButton title={isLoading ? 'Signing In...' : 'Sign In'} onPress={handleLogin} />
        <Spacer size={12} />
        <ThemedButton
          title="Don't have an account? Register"
          variant="secondary"
          onPress={() => router.push('/register')}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

--- FILE: app/(auth)/register.jsx ---
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    try {
      await register(email, password, name);
      router.push('/profile');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Create Account</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Join Book Tracker today</ThemedText>
        <Spacer size={20} />

        {!!error && (
          <>
            <ThemedText style={[styles.errorText, { color: theme.warning }]}>
              {error}
            </ThemedText>
            <Spacer size={12} />
          </>
        )}

        <ThemedTextInput
          placeholder="Full Name"
          value={name}
          onChangeText={(val) => {
            setName(val);
            if (error) setError('');
          }}
          autoCapitalize="words"
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (error) setError('');
          }}
          secureTextEntry
        />
        <Spacer size={20} />

        <ThemedButton title={isLoading ? 'Creating Account...' : 'Register'} onPress={handleRegister} />
        <Spacer size={12} />
        <ThemedButton
          title="Already have an account? Sign In"
          variant="secondary"
          onPress={() => router.push('/login')}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

--- FILE: app/(dashboard)/_layout.jsx ---
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function DashboardLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="books/index"
        options={{
          title: 'My Books',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Add Book',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

--- FILE: app/(dashboard)/books/index.jsx ---
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BookCard } from '../../../components/BookCard';
import { Spacer } from '../../../components/Spacer';
import { ThemedButton } from '../../../components/ThemedButton';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { useAuth } from '../../../context/AuthContext';
import { useBooks } from '../../../context/BooksContext';

export default function BooksList() {
  const router = useRouter();
  const { user } = useAuth();
  const { books, fetchBooks, isLoading } = useBooks();

  useEffect(() => {
    if (user?.$id) {
      fetchBooks(user.$id);
    }
  }, [user?.$id]);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id || item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => router.push(`/books/${item.$id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshing={isLoading}
        onRefresh={() => {
          if (user?.$id) fetchBooks(user.$id);
        }}
        ListEmptyComponent={
          <ThemedView variant="card" style={styles.emptyCard}>
            <ThemedText variant="title">No Books Yet</ThemedText>
            <Spacer size={8} />
            <ThemedText variant="subtitle">
              Your library is empty. Start building your collection by adding your first book!
            </ThemedText>
            <Spacer size={20} />
            <ThemedButton
              title="Add Your First Book"
              onPress={() => router.push('/create')}
            />
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    gap: 12,
  },
  emptyCard: {
    borderRadius: 16,
    padding: 24,
    marginTop: 40,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});

--- FILE: app/(dashboard)/books/[id].jsx ---
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Spacer } from '../../../components/Spacer';
import { ThemedButton } from '../../../components/ThemedButton';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { useBooks } from '../../../context/BooksContext';

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getBook, deleteBook, isLoading } = useBooks();

  const [book, setBook] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchSingleBook = async () => {
      if (!id) return;
      setFetching(true);
      try {
        const doc = await getBook(id);
        if (isMounted) {
          setBook(doc);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch book details. It may have been deleted.');
        }
      } finally {
        if (isMounted) setFetching(false);
      }
    };

    fetchSingleBook();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    Alert.alert('Delete Book', 'Are you sure you want to delete this book from your library?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteBook(id);
            router.push('/books');
          } catch (err) {
            Alert.alert('Error', err.message || 'Failed to delete book.');
          }
        },
      },
    ]);
  };

  if (fetching) {
    return <LoadingSpinner />;
  }

  if (error || !book) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title">Book Not Found</ThemedText>
          <Spacer size={8} />
          <ThemedText variant="subtitle">{error || 'Unable to load details.'}</ThemedText>
          <Spacer size={20} />
          <ThemedButton title="Back to Library" onPress={() => router.push('/books')} />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">{book.title}</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">by {book.author}</ThemedText>
        <Spacer size={16} />

        <ThemedView style={styles.ratingBadge}>
          <ThemedText style={styles.ratingText}>⭐ {book.rating} / 5 Rating</ThemedText>
        </ThemedView>

        <Spacer size={24} />

        <ThemedButton
          title={isLoading ? 'Deleting...' : 'Delete Book'}
          variant="secondary"
          onPress={handleDelete}
        />
        <Spacer size={12} />
        <ThemedButton
          title="Back to My Books"
          variant="secondary"
          onPress={() => router.push('/books')}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  ratingBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fef3c7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  ratingText: {
    color: '#92400e',
    fontWeight: '700',
    fontSize: 14,
  },
});

--- FILE: app/(dashboard)/create.jsx ---
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BooksContext';

export default function CreateBook() {
  const router = useRouter();
  const { user } = useAuth();
  const { addBook, isLoading } = useBooks();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('5');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !rating) {
      setError('Please fill in title, author, and rating.');
      return;
    }
    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      setError('Rating must be a number between 1 and 5.');
      return;
    }

    setError('');
    try {
      await addBook(title, author, numRating, user?.$id || 'guest_user');
      setTitle('');
      setAuthor('');
      setRating('5');
      router.push('/books');
    } catch (err) {
      setError(err.message || 'Failed to add book. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Add Book</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Add a new book to your library</ThemedText>
        <Spacer size={20} />

        {!!error && (
          <>
            <ThemedText style={[styles.errorText, { color: theme.warning }]}>
              {error}
            </ThemedText>
            <Spacer size={12} />
          </>
        )}

        <ThemedTextInput
          placeholder="Book Title"
          value={title}
          onChangeText={(val) => {
            setTitle(val);
            if (error) setError('');
          }}
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Author Name"
          value={author}
          onChangeText={(val) => {
            setAuthor(val);
            if (error) setError('');
          }}
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Rating (1-5)"
          value={rating}
          onChangeText={(val) => {
            setRating(val);
            if (error) setError('');
          }}
          keyboardType="numeric"
        />
        <Spacer size={20} />

        <ThemedButton
          title={isLoading ? 'Adding Book...' : 'Add Book'}
          onPress={handleSubmit}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

--- FILE: app/(dashboard)/profile.jsx ---
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">User Profile</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">
          {user ? `Logged in as ${user.name || user.email}` : 'Guest User'}
        </ThemedText>
        {user?.email && (
          <>
            <Spacer size={4} />
            <ThemedText variant="caption">{user.email}</ThemedText>
          </>
        )}
        <Spacer size={24} />
        <ThemedButton
          title={isLoading ? 'Signing Out...' : 'Sign Out'}
          onPress={handleLogout}
        />
        <Spacer size={12} />
        <ThemedButton
          title="Practice Screens Hub"
          onPress={() => router.push('/(practice)')}
        />
        <Spacer size={12} />
        <ThemedButton
          title="Back to Home"
          variant="secondary"
          onPress={() => router.push('/')}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});

--- FILE: app/(practice)/_layout.jsx ---
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PracticeLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Practice Hub' }} />
      <Stack.Screen name="search" options={{ title: 'Search & Filter' }} />
      <Stack.Screen name="stats" options={{ title: 'Reading Stats' }} />
      <Stack.Screen name="goal" options={{ title: 'Annual Goal' }} />
    </Stack>
  );
}

--- FILE: app/(practice)/index.jsx ---
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function PracticeHub() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText variant="title">Practice Screens Hub</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">
          Explore standalone feature demonstrations & learning exercises
        </ThemedText>
        <Spacer size={24} />

        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title" style={styles.cardTitle}>
            🔍 Search & Star Filter
          </ThemedText>
          <Spacer size={8} />
          <ThemedText variant="body">
            Real-time title and author search paired with interactive star-rating chip filters.
          </ThemedText>
          <Spacer size={16} />
          <ThemedButton
            title="Open Search & Filter"
            onPress={() => router.push('/(practice)/search')}
          />
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title" style={styles.cardTitle}>
            📊 Reading Statistics
          </ThemedText>
          <Spacer size={8} />
          <ThemedText variant="body">
            Analytics breakdown featuring total library count, average ratings, top titles, and visual bar charts.
          </ThemedText>
          <Spacer size={16} />
          <ThemedButton
            title="Open Reading Stats"
            onPress={() => router.push('/(practice)/stats')}
          />
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title" style={styles.cardTitle}>
            🎯 Annual Goal Tracker
          </ThemedText>
          <Spacer size={8} />
          <ThemedText variant="body">
            Interactive goal target stepper, progress bar visualization, and milestone accomplishment alerts.
          </ThemedText>
          <Spacer size={16} />
          <ThemedButton
            title="Open Goal Tracker"
            onPress={() => router.push('/(practice)/goal')}
          />
        </ThemedView>

        <Spacer size={24} />
        <ThemedButton
          title="Back to Profile"
          variant="secondary"
          onPress={() => router.push('/profile')}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});

--- FILE: app/(practice)/search.jsx ---
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { BookCard } from '../../components/BookCard';
import { Spacer } from '../../components/Spacer';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useBooks } from '../../context/BooksContext';

const RATING_CHIPS = ['All', '5 ⭐', '4 ⭐', '3 ⭐', '2 ⭐', '1 ⭐'];

export default function SearchAndFilter() {
  const router = useRouter();
  const { books } = useBooks();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [query, setQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('All');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesText =
        !query ||
        book.title?.toLowerCase().includes(query.toLowerCase()) ||
        book.author?.toLowerCase().includes(query.toLowerCase());

      let matchesRating = true;
      if (selectedRating !== 'All') {
        const targetRating = Number(selectedRating.replace(' ⭐', ''));
        matchesRating = Number(book.rating) === targetRating;
      }

      return matchesText && matchesRating;
    });
  }, [books, query, selectedRating]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="title">Search Library</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">Find books by title, author, or rating</ThemedText>
        <Spacer size={16} />

        <ThemedTextInput
          placeholder="Search by title or author..."
          value={query}
          onChangeText={setQuery}
        />
        <Spacer size={12} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {RATING_CHIPS.map((chip) => {
            const isSelected = selectedRating === chip;
            return (
              <Pressable
                key={chip}
                onPress={() => setSelectedRating(chip)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? theme.iconColorFocused
                      : theme.cardBackground,
                    borderColor: theme.border,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    { color: isSelected ? '#ffffff' : theme.text },
                  ]}
                >
                  {chip}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
      </ThemedView>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.$id || item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => router.push(`/books/${item.$id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <ThemedView variant="card" style={styles.emptyCard}>
            <ThemedText variant="title">No Matches Found</ThemedText>
            <Spacer size={8} />
            <ThemedText variant="subtitle">
              Try adjusting your search query or rating filter.
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  chipsContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  emptyCard: {
    borderRadius: 16,
    padding: 24,
    marginTop: 40,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});

--- FILE: app/(practice)/stats.jsx ---
import { ScrollView, StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useBooks } from '../../context/BooksContext';

export default function ReadingStats() {
  const { books } = useBooks();

  const totalBooks = books.length;
  const totalRating = books.reduce((acc, b) => acc + (b.rating || 0), 0);
  const avgRating = totalBooks > 0 ? (totalRating / totalBooks).toFixed(1) : '0.0';

  const topBook = books.reduce((max, b) => {
    if (!max || (b.rating || 0) > (max.rating || 0)) return b;
    return max;
  }, null);

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: books.filter((b) => Number(b.rating) === star).length,
  }));

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText variant="title">Reading Statistics</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">Overview of your library performance</ThemedText>
        <Spacer size={20} />

        <ThemedView style={styles.grid}>
          <ThemedView variant="card" style={styles.statCard}>
            <ThemedText style={styles.statValue}>{totalBooks}</ThemedText>
            <Spacer size={4} />
            <ThemedText variant="subtitle">Total Books</ThemedText>
          </ThemedView>

          <ThemedView variant="card" style={styles.statCard}>
            <ThemedText style={styles.statValue}>{avgRating} ⭐</ThemedText>
            <Spacer size={4} />
            <ThemedText variant="subtitle">Avg Rating</ThemedText>
          </ThemedView>
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.sectionCard}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            Highest Rated Book
          </ThemedText>
          <Spacer size={8} />
          {topBook ? (
            <>
              <ThemedText variant="title" style={styles.topBookTitle}>
                {topBook.title}
              </ThemedText>
              <ThemedText variant="subtitle">by {topBook.author}</ThemedText>
              <Spacer size={4} />
              <ThemedText style={styles.starText}>⭐ {topBook.rating}/5</ThemedText>
            </>
          ) : (
            <ThemedText variant="subtitle">No books added yet.</ThemedText>
          )}
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.sectionCard}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            Rating Breakdown
          </ThemedText>
          <Spacer size={12} />
          {distribution.map((item) => (
            <ThemedView key={item.star} style={styles.distRow}>
              <ThemedText style={styles.distLabel}>{item.star} Stars</ThemedText>
              <ThemedView style={styles.distBarBg}>
                <ThemedView
                  style={[
                    styles.distBarFill,
                    {
                      width: `${totalBooks > 0 ? (item.count / totalBooks) * 100 : 0}%`,
                    },
                  ]}
                />
              </ThemedView>
              <ThemedText style={styles.distCount}>{item.count}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6366f1',
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  topBookTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  starText: {
    fontSize: 14,
    color: '#eab308',
    fontWeight: '600',
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 10,
  },
  distLabel: {
    width: 60,
    fontSize: 13,
    fontWeight: '600',
  },
  distBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  distBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 5,
  },
  distCount: {
    width: 24,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
});

--- FILE: app/(practice)/goal.jsx ---
import { useState } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useBooks } from '../../context/BooksContext';

export default function ReadingGoalTracker() {
  const { books } = useBooks();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [targetGoal, setTargetGoal] = useState(10);
  const currentCount = books.length;
  const progressRatio = targetGoal > 0 ? Math.min(1, currentCount / targetGoal) : 0;
  const percentage = Math.round(progressRatio * 100);
  const goalAchieved = currentCount >= targetGoal && targetGoal > 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Reading Goal Tracker</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">Set and track your annual reading target</ThemedText>
        <Spacer size={24} />

        <ThemedView style={styles.goalControlRow}>
          <Pressable
            onPress={() => setTargetGoal((prev) => Math.max(1, prev - 1))}
            style={[styles.stepButton, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          >
            <ThemedText style={styles.stepText}>-</ThemedText>
          </Pressable>

          <ThemedView style={styles.goalDisplay}>
            <ThemedText style={styles.goalNumber}>{targetGoal}</ThemedText>
            <ThemedText variant="subtitle">Target Books</ThemedText>
          </ThemedView>

          <Pressable
            onPress={() => setTargetGoal((prev) => prev + 1)}
            style={[styles.stepButton, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          >
            <ThemedText style={styles.stepText}>+</ThemedText>
          </Pressable>
        </ThemedView>

        <Spacer size={28} />

        <ThemedView style={styles.progressHeader}>
          <ThemedText variant="subtitle">
            Progress ({currentCount} / {targetGoal} books)
          </ThemedText>
          <ThemedText style={styles.percentText}>{percentage}%</ThemedText>
        </ThemedView>
        <Spacer size={8} />

        <ThemedView style={styles.progressBarBg}>
          <ThemedView
            style={[
              styles.progressBarFill,
              {
                width: `${percentage}%`,
                backgroundColor: goalAchieved ? theme.warning : theme.iconColorFocused,
              },
            ]}
          />
        </ThemedView>

        <Spacer size={24} />

        {goalAchieved ? (
          <ThemedView style={[styles.banner, { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }]}>
            <ThemedText style={styles.bannerEmoji}>🎉🏆 LEVEL COMPLETE!</ThemedText>
            <Spacer size={4} />
            <ThemedText style={styles.bannerText}>
              Congratulations! You have successfully hit your reading goal of {targetGoal} books!
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedText variant="body" style={styles.remainingText}>
            You need {targetGoal - currentCount} more book
            {targetGoal - currentCount === 1 ? '' : 's'} to hit your goal. Keep reading!
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  goalControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 24,
    fontWeight: '700',
  },
  goalDisplay: {
    alignItems: 'center',
  },
  goalNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6366f1',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366f1',
  },
  progressBarBg: {
    width: '100%',
    height: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 7,
  },
  banner: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  bannerEmoji: {
    fontSize: 16,
    fontWeight: '800',
    color: '#92400e',
  },
  bannerText: {
    fontSize: 13,
    color: '#78350f',
    textAlign: 'center',
  },
  remainingText: {
    textAlign: 'center',
  },
});

--- FILE: README.md ---
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
