import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BookCard } from '../../../components/BookCard';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Spacer } from '../../../components/Spacer';
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
  }, [user?.$id, fetchBooks]);

  if (isLoading && books.length === 0) {
    return <LoadingSpinner />;
  }

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
        ListEmptyComponent={
          <ThemedView variant="card" style={styles.emptyCard}>
            <ThemedText variant="title">No Books Found</ThemedText>
            <Spacer size={8} />
            <ThemedText variant="subtitle">
              Your personal reading library is currently empty.
            </ThemedText>
            <Spacer size={12} />
            <ThemedText variant="body" style={styles.emptyDescription}>
              Tap the &quot;Add Book&quot; tab to add your first title!
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
  listContent: {
    padding: 16,
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
  emptyDescription: {
    textAlign: 'center',
  },
});
