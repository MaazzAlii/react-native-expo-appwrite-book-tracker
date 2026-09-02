import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PracticeLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Practice Hub' }} />
      <Stack.Screen name="search" options={{ title: 'Search & Filter' }} />
      <Stack.Screen name="stats" options={{ title: 'Reading Stats' }} />
      <Stack.Screen name="goal" options={{ title: 'Annual Goal' }} />
    </Stack>
  );
}
