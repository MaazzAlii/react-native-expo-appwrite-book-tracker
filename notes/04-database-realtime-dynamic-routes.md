# ⚡ Module 04: Database CRUD, Realtime Sync & Dynamic Parameters

## 📌 Concepts Mastered
In this final core module, I built cloud database operations using Appwrite Databases, implemented real-time WebSocket subscriptions, and handled dynamic route navigation with Expo Router.

Key concepts include:
- **NoSQL Document Modeling**: Structuring collection schema attributes (`title`, `author`, `rating`, `userId`) and establishing document permissions.
- **Database Operations**: Performing document insertion (`databases.createDocument`), scoped queries (`databases.listDocuments` with `Query.equal`), record fetching (`databases.getDocument`), and document deletion (`databases.deleteDocument`).
- **Realtime WebSocket Subscriptions**: Subscribing to database events (`client.subscribe`) to automatically update UI lists whenever documents are created or deleted on remote clients.
- **Dynamic Expo Router Routes**: Creating parameter-driven route files (`app/(dashboard)/books/[id].jsx`) to fetch and render single book details dynamically.

---

## 🛠️ API Surface & Code Patterns Used

### 1. Document Queries & Database Operations (`context/BooksContext.js`)
```javascript
import { ID, Query } from 'react-native-appwrite';
import { appwriteConfig, databases } from '../lib/appwrite';

// Fetch books for authenticated user
const fetchBooks = async (userId) => {
  const response = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.collectionId,
    [Query.equal('userId', userId)]
  );
  return response.documents;
};

// Create new book document
const addBook = async (title, author, rating, userId) => {
  return await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionId,
    ID.unique(),
    { title, author, rating: Number(rating), userId }
  );
};
```

### 2. Realtime WebSocket Event Subscriptions
```javascript
useEffect(() => {
  const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collectionId}.documents`;
  
  const unsubscribe = client.subscribe(channel, (response) => {
    const { events, payload } = response;

    if (events.some((e) => e.endsWith('.create'))) {
      setBooks((prev) => {
        if (prev.some((b) => b.$id === payload.$id)) return prev;
        return [payload, ...prev];
      });
    }

    if (events.some((e) => e.endsWith('.delete'))) {
      setBooks((prev) => prev.filter((b) => b.$id !== payload.$id));
    }
  });

  return () => unsubscribe();
}, []);
```

### 3. Dynamic Route Parameter Retrieval (`app/(dashboard)/books/[id].jsx`)
```javascript
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useBooks } from '../../../context/BooksContext';

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const { getBook, deleteBook } = useBooks();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      getBook(id).then(setBook).catch(console.error);
    }
  }, [id]);
}
```

---

## ⚠️ Gotchas & Lessons Learned

1. **User Scope Query Filtering**: Without `[Query.equal('userId', userId)]`, Appwrite queries return all public documents in the collection regardless of who created them. Enforcing document-level user ID matching guarantees strict user privacy.
2. **Duplicate Realtime Payload Deduplication**: When a client creates a document locally, both local state updates and remote WebSocket events fire. In `client.subscribe`, checking `prev.some(b => b.$id === payload.$id)` prevents duplicate items from rendering in `<FlatList>`.
3. **Dynamic Route Parameter Parsing**: `useLocalSearchParams()` returns parameters as strings. When querying documents by ID or validating numerical fields like `rating`, ensure type conversions are explicitly handled.
