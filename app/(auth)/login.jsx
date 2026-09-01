import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/profile');
    } catch (error) {
      console.log('Login failed:', error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Sign In</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Welcome back to Book Tracker</ThemedText>
        <Spacer size={20} />

        <ThemedTextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
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
});
