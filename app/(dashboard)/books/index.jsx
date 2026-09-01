import { StyleSheet } from 'react-native';
import { Spacer } from '../../../components/Spacer';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';

export default function BooksList() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">My Books</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Your personal book tracker collection</ThemedText>
        <Spacer size={16} />
        <ThemedText variant="body" style={styles.description}>
          No books added yet. Use the Add Book tab to add your first book!
        </ThemedText>
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
  description: {
    textAlign: 'center',
  },
});
