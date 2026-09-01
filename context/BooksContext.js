import { createContext, useContext, useState } from 'react';
import { ID } from 'react-native-appwrite';
import { appwriteConfig, databases } from '../lib/appwrite';

const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  isLoading: false,
  setIsLoading: () => {},
  fetchBooks: async () => {},
  addBook: async () => {},
  deleteBook: async () => {},
});

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setBooks((prev) => [response, ...prev]);
      return response;
    } catch (error) {
      console.error('Appwrite createDocument error:', error);
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
        addBook,
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
