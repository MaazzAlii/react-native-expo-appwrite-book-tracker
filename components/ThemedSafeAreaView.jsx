import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

export function ThemedSafeAreaView({ style, ...props }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: theme.background }, style]}
      {...props}
    />
  );
}
