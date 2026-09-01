import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function Login() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Sign In</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Welcome back to Book Tracker</ThemedText>
        <Spacer size={20} />
        <Link href="/register" style={styles.link}>
          <ThemedText style={styles.linkText}>Need an account? Register</ThemedText>
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
