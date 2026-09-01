import { createContext, useContext, useState } from 'react';

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

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        isLoading,
        setIsLoading,
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
