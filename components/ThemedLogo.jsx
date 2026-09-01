import { Image, StyleSheet } from 'react-native';

export function ThemedLogo({ size = 72, style, ...props }) {
  return (
    <Image
      source={require('../assets/img/logo.png')}
      style={[{ width: size, height: size }, styles.logo, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 16,
  },
});
