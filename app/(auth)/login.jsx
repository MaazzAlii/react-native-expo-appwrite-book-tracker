import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function Login() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Sign In</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Welcome back to Book Tracker</ThemedText>
        <Spacer size={24} />
        <ThemedButton title="Sign In" onPress={() => router.push('/profile')} />
        <Spacer size={12} />
        <ThemedButton
          title="Create an Account"
          variant="secondary"
          onPress={() => router.push('/register')}
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
});
