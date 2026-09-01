import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../components/Spacer';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

export default function About() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">About Book Tracker</ThemedText>
        <Spacer size={12} />
        <ThemedText variant="body" style={styles.description}>
          Book Tracker helps you organize your reading lists, track book progress, and set annual reading goals with real-time sync across devices.
        </ThemedText>
        <Spacer size={20} />
        <Link href="/" style={styles.link}>
          <ThemedText style={styles.linkText}>Back to Home</ThemedText>
        </Link>
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
    lineHeight: 22,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
