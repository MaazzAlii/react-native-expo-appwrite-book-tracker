import { useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';

export function ThemedView({ style, variant = 'background', ...props }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const backgroundColor = variant === 'card' ? theme.uiBackground : theme.background;

  return (
    <View
      style={[{ backgroundColor }, style]}
      {...props}
    />
  );
}
