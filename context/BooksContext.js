import { createContext, useContext, useEffect, useState } from 'react';
import { ID, Query } from 'react-native-appwrite';
import { appwriteConfig, client, databases } from '../lib/appwrite';

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

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchBooks = async (userId) => {
    if (!userId) {
      setBooks([]);
      return [];
    }
    setIsLoading(true);
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.equal('userId', userId)]
      );
      setBooks(response.documents || []);
      return response.documents || [];
    } catch (error) {
      console.error('Appwrite listDocuments error:', error);
      setBooks([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getBook = async (id) => {
    try {
      const doc = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        id
      );
      return doc;
    } catch (error) {
      console.error('Appwrite getDocument error:', error);
      throw error;
    }
  };

  const addBook = async (title, author, rating, userId) => {
    setIsLoading(true);
    try {
      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        ID.unique(),
        {
          title,
          author,
          rating: Number(rating),
          userId,
        }
      );
      setBooks((prev) => {
        if (prev.some((b) => b.$id === response.$id)) return prev;
        return [response, ...prev];
      });
      return response;
    } catch (error) {
      console.error('Appwrite createDocument error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        id
      );
      setBooks((prev) => prev.filter((b) => b.$id !== id));
    } catch (error) {
      console.error('Appwrite deleteDocument error:', error);
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
