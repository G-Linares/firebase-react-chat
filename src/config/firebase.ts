// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD2hi0A-hRG1AQdp4d3uP776JcpIr6XbG0',
    authDomain: 'chatapp-32961.firebaseapp.com',
    projectId: 'chatapp-32961',
    storageBucket: 'chatapp-32961.appspot.com',
    messagingSenderId: '944480568313',
    appId: '1:944480568313:web:1f6dd80fa881dd2d8a7328',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
