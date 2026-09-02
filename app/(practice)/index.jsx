import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function PracticeHub() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText variant="title">Practice Screens Hub</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">
          Explore standalone feature demonstrations & learning exercises
        </ThemedText>
        <Spacer size={24} />

        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title" style={styles.cardTitle}>
            🔍 Search & Star Filter
          </ThemedText>
          <Spacer size={8} />
          <ThemedText variant="body">
            Real-time title and author search paired with interactive star-rating chip filters.
          </ThemedText>
          <Spacer size={16} />
          <ThemedButton
            title="Open Search & Filter"
            onPress={() => router.push('/(practice)/search')}
          />
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title" style={styles.cardTitle}>
            📊 Reading Statistics
          </ThemedText>
          <Spacer size={8} />
          <ThemedText variant="body">
            Analytics breakdown featuring total library count, average ratings, top titles, and visual bar charts.
          </ThemedText>
          <Spacer size={16} />
          <ThemedButton
            title="Open Reading Stats"
            onPress={() => router.push('/(practice)/stats')}
          />
        </ThemedView>

        <Spacer size={16} />

        <ThemedView variant="card" style={styles.card}>
          <ThemedText variant="title" style={styles.cardTitle}>
            🎯 Annual Goal Tracker
          </ThemedText>
          <Spacer size={8} />
          <ThemedText variant="body">
            Interactive goal target stepper, progress bar visualization, and milestone accomplishment alerts.
          </ThemedText>
          <Spacer size={16} />
          <ThemedButton
            title="Open Goal Tracker"
            onPress={() => router.push('/(practice)/goal')}
          />
        </ThemedView>

        <Spacer size={24} />
        <ThemedButton
          title="Back to Profile"
          variant="secondary"
          onPress={() => router.push('/profile')}
        />
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
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});
