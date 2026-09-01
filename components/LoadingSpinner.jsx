import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { ThemedView } from './ThemedView';

export function LoadingSpinner({ size = 'large' }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size={size} color={theme.iconColorFocused} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
