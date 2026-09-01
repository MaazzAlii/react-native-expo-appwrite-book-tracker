import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    try {
      await login(email, password);
      router.push('/profile');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Sign In</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Welcome back to Book Tracker</ThemedText>
        <Spacer size={20} />

        {!!error && (
          <>
            <ThemedText style={[styles.errorText, { color: theme.warning }]}>
              {error}
            </ThemedText>
            <Spacer size={12} />
          </>
        )}

        <ThemedTextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (error) setError('');
          }}
          secureTextEntry
        />
        <Spacer size={20} />

        <ThemedButton title={isLoading ? 'Signing In...' : 'Sign In'} onPress={handleLogin} />
        <Spacer size={12} />
        <ThemedButton
          title="Create an Account"
          variant="secondary"
          onPress={() => router.push('/register')}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
