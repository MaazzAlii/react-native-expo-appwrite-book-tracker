import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Spacer } from '../../components/Spacer';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password, name);
      router.push('/profile');
    } catch (error) {
      console.log('Registration failed:', error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Create Account</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Join Book Tracker today</ThemedText>
        <Spacer size={20} />

        <ThemedTextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <Spacer size={12} />
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

        <ThemedButton title={isLoading ? 'Creating Account...' : 'Register'} onPress={handleRegister} />
        <Spacer size={12} />
        <ThemedButton
          title="Already have an account? Sign In"
          variant="secondary"
          onPress={() => router.push('/login')}
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
