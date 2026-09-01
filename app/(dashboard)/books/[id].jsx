import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../../components/Spacer';
import { ThemedButton } from '../../../components/ThemedButton';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Book Details</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Viewing Record ID: {id}</ThemedText>
        <Spacer size={20} />
        <ThemedButton
          title="Back to My Books"
          variant="secondary"
          onPress={() => router.back()}
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
