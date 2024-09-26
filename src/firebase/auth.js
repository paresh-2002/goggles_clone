import firebase from "firebase/app";
import "firebase/auth";

export class AuthService {
  constructor() {
    // Initialize Firebase with your configuration
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: conf.firebaseApiKey,
        authDomain: conf.firebaseAuthDomain,
        projectId: conf.firebaseProjectId,
        // Add other config values as needed
      });
    }
  }

  async createAccount(email, password) {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase Auth service :: CreateAccount :: Error:", error);
      throw error; // rethrow error for handling in UI
    }
  }

  async login(email, password) {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase Auth service :: Login :: Error:", error);
      throw error; // rethrow error for handling in UI
    }
  }

  async getCurrentUser() {
    return firebase.auth().currentUser;
  }

  async logout() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Firebase Auth service :: Logout :: Error:", error);
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error(
        "Firebase Auth service :: SendPasswordResetEmail :: Error:",
        error
      );
    }
  }

  async updateUserProfile(profile) {
    const user = this.getCurrentUser();
    if (user) {
      try {
        await user.updateProfile(profile);
      } catch (error) {
        console.error(
          "Firebase Auth service :: UpdateUserProfile :: Error:",
          error
        );
      }
    }
  }

  async deleteUser() {
    const user = this.getCurrentUser();
    if (user) {
      try {
        await user.delete();
      } catch (error) {
        console.error("Firebase Auth service :: DeleteUser :: Error:", error);
      }
    }
  }
}

const authService = new AuthService();
export default authService;
