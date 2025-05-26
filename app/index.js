import { Redirect } from 'expo-router';
import { useAuth } from './src/context/AuthContext';

export default function Root() {
  const { session } = useAuth();
  
  if (session) {
    return <Redirect href="/(app)" />;
  } else {
    return <Redirect href="/(auth)/signIn" />;
  }
}