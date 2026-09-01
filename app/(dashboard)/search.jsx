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
