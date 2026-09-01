import { StyleSheet, Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function ThemedText({ style, variant = 'body', ...props }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const textColor = variant === 'title' ? theme.title : theme.text;
  const variantStyle = styles[variant] || styles.body;

  return (
    <Text
      style={[{ color: textColor }, variantStyle, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
