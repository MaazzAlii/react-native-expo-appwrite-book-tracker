import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export function ThemedButton({ title, onPress, style, textStyle, variant = 'primary', ...props }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <ThemedText style={[styles.buttonText, variant === 'secondary' && styles.secondaryText, textStyle]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryText: {
    color: '#475569',
  },
});
