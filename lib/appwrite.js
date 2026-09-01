import { Account, Client, Databases, Storage } from 'react-native-appwrite';
import 'react-native-url-polyfill/auto';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '6701a2b3001122334455',
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || 'book_tracker_db',
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || 'books',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };
