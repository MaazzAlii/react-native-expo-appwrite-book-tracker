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
