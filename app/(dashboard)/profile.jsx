import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function Profile() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">User Profile</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Manage your account and reading settings</ThemedText>
        <Spacer size={24} />
        <ThemedButton
          title="Back to Home"
          variant="secondary"
          onPress={() => router.push('/')}
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
