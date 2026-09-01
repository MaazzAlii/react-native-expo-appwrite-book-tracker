import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function ThemedTextInput({ style, ...props }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <TextInput
      placeholderTextColor={theme.iconColor}
      style={[
        styles.input,
        {
          color: theme.text,
          borderColor: theme.border,
          backgroundColor: theme.navBackground,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    width: '100%',
  },
});
