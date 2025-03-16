import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAf6eMV9YBF552FYmRd1m10sZeNCNkhs3E",
  authDomain: "skillshare-355e2.firebaseapp.com",
  projectId: "skillshare-355e2",
  storageBucket: "skillshare-355e2.appspot.com",
  messagingSenderId: "561840984280",
  appId: "1:561840984280:android:bdf7a1319353290a3907ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;