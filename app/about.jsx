import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>About Book Tracker</Text>
        <Text style={styles.description}>
          Book Tracker helps you organize your reading lists, track book progress, and set annual reading goals with real-time sync across devices.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Back to Home</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 8,
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
