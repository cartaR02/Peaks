import { registerRootComponent } from 'expo';
import { FIREBASE_APP } from './FirebaseConfig';
import App from './app/App';

registerRootComponent(App);

if (FIREBASE_APP) {
  console.log('Firebase intitialized successfully');
} else {
  console.log('Firebase has not intillizalize correctly');
}
