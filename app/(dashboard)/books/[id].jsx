import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Spacer } from '../../../components/Spacer';
import { ThemedButton } from '../../../components/ThemedButton';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { Colors } from '../../../constants/Colors';
import { useBooks } from '../../../context/BooksContext';

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getBook, books } = useBooks();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBook() {
      // Check local cache first
      const local = books.find((b) => b.$id === id);
      if (local) {
        setBook(local);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const doc = await getBook(id);
        setBook(doc);
      } catch (_err) {
        setError('Book not found or failed to load.');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadBook();
    }
  }, [id, getBook, books]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const stars = book ? '⭐'.repeat(Math.min(5, Math.max(1, book.rating || 5))) : '';

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        {error ? (
          <>
            <ThemedText style={[styles.errorText, { color: theme.warning }]}>
              {error}
            </ThemedText>
            <Spacer size={16} />
          </>
        ) : book ? (
          <>
            <ThemedText variant="title" style={styles.title}>
              {book.title}
            </ThemedText>
            <Spacer size={8} />
            <ThemedText variant="subtitle" style={styles.author}>
              by {book.author}
            </ThemedText>
            <Spacer size={12} />
            <ThemedText style={styles.rating}>
              Rating: {stars} ({book.rating}/5)
            </ThemedText>
            <Spacer size={20} />
          </>
        ) : null}

        <ThemedButton
          title="Back to My Books"
          variant="secondary"
          onPress={() => router.back()}
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#eab308',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
