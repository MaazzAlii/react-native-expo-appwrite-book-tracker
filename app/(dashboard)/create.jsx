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
import { useBooks } from '../../context/BooksContext';

export default function CreateBook() {
  const router = useRouter();
  const { user } = useAuth();
  const { addBook, isLoading } = useBooks();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('5');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !rating) {
      setError('Please fill in title, author, and rating.');
      return;
    }
    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      setError('Rating must be a number between 1 and 5.');
      return;
    }

    setError('');
    try {
      await addBook(title, author, numRating, user?.$id || 'guest_user');
      setTitle('');
      setAuthor('');
      setRating('5');
      router.push('/books');
    } catch (err) {
      setError(err.message || 'Failed to add book. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText variant="title">Add Book</ThemedText>
        <Spacer size={8} />
        <ThemedText variant="subtitle">Add a new book to your library</ThemedText>
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
          placeholder="Book Title"
          value={title}
          onChangeText={(val) => {
            setTitle(val);
            if (error) setError('');
          }}
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Author Name"
          value={author}
          onChangeText={(val) => {
            setAuthor(val);
            if (error) setError('');
          }}
        />
        <Spacer size={12} />
        <ThemedTextInput
          placeholder="Rating (1-5)"
          value={rating}
          onChangeText={(val) => {
            setRating(val);
            if (error) setError('');
          }}
          keyboardType="numeric"
        />
        <Spacer size={20} />

        <ThemedButton
          title={isLoading ? 'Adding Book...' : 'Add Book'}
          onPress={handleSubmit}
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
