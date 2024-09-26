const conf = {
  firebaseApiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  firebaseAuthDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  firebaseDatabaseURL: String(process.env.REACT_APP_FIREBASE_DATABASE_URL),
  firebaseProjectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
};

export default conf;
