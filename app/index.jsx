import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Spacer } from '../components/Spacer';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedLogo } from '../components/ThemedLogo';
import { ThemedSafeAreaView } from '../components/ThemedSafeAreaView';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedLogo size={72} />
        <Spacer size={12} />
        <ThemedText variant="title">Book Tracker</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Track your personal library & reading goals</ThemedText>
        <Spacer size={16} />
        <ThemedText variant="body" style={styles.description}>
          Built with React Native, Expo Router, and Appwrite BaaS for cloud synchronization and realtime updates.
        </ThemedText>
        <Spacer size={24} />

        <View style={styles.buttonContainer}>
          <ThemedButton
            title={user ? 'Go to My Library' : 'Sign In / Register'}
            onPress={() => router.push(user ? '/books' : '/login')}
          />
          <Spacer size={12} />
          <ThemedButton
            title="About This App"
            variant="secondary"
            onPress={() => router.push('/about')}
          />
        </View>
      </ThemedView>
    </ThemedSafeAreaView>
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
  buttonContainer: {
    width: '100%',
  },
});
