import { Pressable, StyleSheet } from 'react-native';
import { Spacer } from './Spacer';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function BookCard({ book, onPress }) {
  const stars = '⭐'.repeat(Math.min(5, Math.max(1, book.rating || 5)));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
    >
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title" style={styles.title}>
          {book.title}
        </ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle" style={styles.author}>
          by {book.author}
        </ThemedText>
        <Spacer size={8} />
        <ThemedText style={styles.rating}>
          {stars} ({book.rating}/5)
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  card: {
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  author: {
    fontSize: 14,
    color: '#64748b',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#eab308',
  },
});
