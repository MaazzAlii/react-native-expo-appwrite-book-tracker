import { ScrollView, StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useBooks } from '../../context/BooksContext';

export default function ReadingStats() {
  const { books } = useBooks();

  const totalBooks = books.length;
  const totalRating = books.reduce((acc, b) => acc + (b.rating || 0), 0);
  const avgRating = totalBooks > 0 ? (totalRating / totalBooks).toFixed(1) : '0.0';

  const topBook = books.reduce((max, b) => {
    if (!max || (b.rating || 0) > (max.rating || 0)) return b;
    return max;
  }, null);

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: books.filter((b) => Number(b.rating) === star).length,
  }));

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText variant="title">Reading Statistics</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">Overview of your library performance</ThemedText>
        <Spacer size={20} />

        <ThemedView style={styles.grid}>
          <ThemedView variant="card" style={styles.statCard}>
            <ThemedText style={styles.statValue}>{totalBooks}</ThemedText>
            <Spacer size={4} />
            <ThemedText variant="subtitle">Total Books</ThemedText>
          </ThemedView>

          <ThemedView variant="card" style={styles.statCard}>
            <ThemedText style={styles.statValue}>{avgRating} ⭐</ThemedText>
            <Spacer size={4} />
            <ThemedText variant="subtitle">Avg Rating</ThemedText>
          </ThemedView>
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.sectionCard}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            Highest Rated Book
          </ThemedText>
          <Spacer size={8} />
          {topBook ? (
            <>
              <ThemedText variant="title" style={styles.topBookTitle}>
                {topBook.title}
              </ThemedText>
              <ThemedText variant="subtitle">by {topBook.author}</ThemedText>
              <Spacer size={4} />
              <ThemedText style={styles.starText}>⭐ {topBook.rating}/5</ThemedText>
            </>
          ) : (
            <ThemedText variant="subtitle">No books added yet.</ThemedText>
          )}
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.sectionCard}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            Rating Breakdown
          </ThemedText>
          <Spacer size={12} />
          {distribution.map((item) => (
            <ThemedView key={item.star} style={styles.distRow}>
              <ThemedText style={styles.distLabel}>{item.star} Stars</ThemedText>
              <ThemedView style={styles.distBarBg}>
                <ThemedView
                  style={[
                    styles.distBarFill,
                    {
                      width: `${totalBooks > 0 ? (item.count / totalBooks) * 100 : 0}%`,
                    },
                  ]}
                />
              </ThemedView>
              <ThemedText style={styles.distCount}>{item.count}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6366f1',
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  topBookTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  starText: {
    fontSize: 14,
    color: '#eab308',
    fontWeight: '600',
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 10,
  },
  distLabel: {
    width: 60,
    fontSize: 13,
    fontWeight: '600',
  },
  distBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  distBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 5,
  },
  distCount: {
    width: 24,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
});
