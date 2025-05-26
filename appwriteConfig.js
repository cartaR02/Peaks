import { Client, Account } from "react-native-appwrite";
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Access environment variables from app.config.js
const config = {
  APPWRITE_ENDPOINT: Constants.expoConfig.extra.appwriteEndpoint,
  APPWRITE_PROJECT: Constants.expoConfig.extra.appwriteProject,
  APPWRITE_BUNDLE_ID: Constants.expoConfig.extra.appwriteBundleId
};

const client = new Client()
  .setEndpoint(config.APPWRITE_ENDPOINT)
  .setProject(config.APPWRITE_PROJECT);

if (Platform.OS === 'ios') {
  client.setPlatform(config.APPWRITE_BUNDLE_ID);
}

const account = new Account(client);

export { account };