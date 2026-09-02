# 🔐 Module 03: Authentication & Session Management with Appwrite

## 📌 Concepts Mastered
In this module, I integrated user authentication using the official `react-native-appwrite` SDK. I implemented registration, login, logout, session persistence, and declarative navigation guards.

Key concepts include:
- **Appwrite Client Setup**: Initializing the Appwrite `Client` with endpoint and project ID configuration.
- **Account API Operations**: Calling `account.create()` for user registration, `account.createEmailPasswordSession()` for authentication, and `account.deleteSession()` for sign out.
- **Global Auth Context Store**: Centralizing authentication state (`user`, `isLoading`, `login`, `register`, `logout`) inside a React Context provider (`AuthProvider`).
- **Persistent Session Auto-Login**: Invoking `account.get()` on initial application mount to seamlessly restore active sessions without forcing users to re-login.
- **Protected Navigation Guards**: Using Expo Router hooks (`useSegments`, `useRouter`) to inspect active route groups and automatically redirect unauthenticated users to `/login` and authenticated users to `/books`.

---

## 🛠️ API Surface & Code Patterns Used

### 1. Appwrite SDK Initialization (`lib/appwrite.js`)
```javascript
import { Account, Client } from 'react-native-appwrite';
import 'react-native-url-polyfill/auto';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || 'book_tracker_db',
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || 'books',
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export { client };
```

### 2. Authentication Context Provider (`context/AuthContext.js`)
```javascript
import { createContext, useContext, useEffect, useState } from 'react';
import { ID } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const currentAccount = await account.get();
      setUser(currentAccount);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const currentAccount = await account.get();
      setUser(currentAccount);
      return currentAccount;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 3. Route Guard Navigation (`app/_layout.jsx`)
```javascript
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
```

---

## ⚠️ Gotchas & Lessons Learned

1. **URL Polyfill Requirement**: React Native environments do not natively support standard `URL` objects required by Appwrite's client library. Importing `'react-native-url-polyfill/auto'` before instantiating the Appwrite Client is mandatory to prevent network exception crashes.
2. **Session Cleanup on Logout**: When logging out, calling `account.deleteSession('current')` invalidates the server-side token. Failing to pass `'current'` or clear local state leaves stale user data in context.
3. **Guard Loop Race Conditions**: Navigation guards must check `isLoading` before attempting redirects. Triggering redirects while the initial session check is still in-flight leads to infinite render loops or abrupt flashing screens.
