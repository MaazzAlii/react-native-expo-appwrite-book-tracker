import { useState } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useBooks } from '../../context/BooksContext';

export default function ReadingGoalTracker() {
  const { books } = useBooks();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [targetGoal, setTargetGoal] = useState(10);
  const currentCount = books.length;
  const progressRatio = targetGoal > 0 ? Math.min(1, currentCount / targetGoal) : 0;
  const percentage = Math.round(progressRatio * 100);
  const goalAchieved = currentCount >= targetGoal && targetGoal > 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Reading Goal Tracker</ThemedText>
        <Spacer size={4} />
        <ThemedText variant="subtitle">Set and track your annual reading target</ThemedText>
        <Spacer size={24} />

        <ThemedView style={styles.goalControlRow}>
          <Pressable
            onPress={() => setTargetGoal((prev) => Math.max(1, prev - 1))}
            style={[styles.stepButton, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          >
            <ThemedText style={styles.stepText}>-</ThemedText>
          </Pressable>

          <ThemedView style={styles.goalDisplay}>
            <ThemedText style={styles.goalNumber}>{targetGoal}</ThemedText>
            <ThemedText variant="subtitle">Target Books</ThemedText>
          </ThemedView>

          <Pressable
            onPress={() => setTargetGoal((prev) => prev + 1)}
            style={[styles.stepButton, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          >
            <ThemedText style={styles.stepText}>+</ThemedText>
          </Pressable>
        </ThemedView>

        <Spacer size={28} />

        <ThemedView style={styles.progressHeader}>
          <ThemedText variant="subtitle">
            Progress ({currentCount} / {targetGoal} books)
          </ThemedText>
          <ThemedText style={styles.percentText}>{percentage}%</ThemedText>
        </ThemedView>
        <Spacer size={8} />

        <ThemedView style={styles.progressBarBg}>
          <ThemedView
            style={[
              styles.progressBarFill,
              {
                width: `${percentage}%`,
                backgroundColor: goalAchieved ? theme.warning : theme.iconColorFocused,
              },
            ]}
          />
        </ThemedView>

        <Spacer size={24} />

        {goalAchieved ? (
          <ThemedView style={[styles.banner, { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }]}>
            <ThemedText style={styles.bannerEmoji}>🎉🏆 LEVEL COMPLETE!</ThemedText>
            <Spacer size={4} />
            <ThemedText style={styles.bannerText}>
              Congratulations! You have successfully hit your reading goal of {targetGoal} books!
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedText variant="body" style={styles.remainingText}>
            You need {targetGoal - currentCount} more book
            {targetGoal - currentCount === 1 ? '' : 's'} to hit your goal. Keep reading!
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  goalControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 24,
    fontWeight: '700',
  },
  goalDisplay: {
    alignItems: 'center',
  },
  goalNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6366f1',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366f1',
  },
  progressBarBg: {
    width: '100%',
    height: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 7,
  },
  banner: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  bannerEmoji: {
    fontSize: 16,
    fontWeight: '800',
    color: '#92400e',
  },
  bannerText: {
    fontSize: 13,
    color: '#78350f',
    textAlign: 'center',
  },
  remainingText: {
    textAlign: 'center',
  },
});
