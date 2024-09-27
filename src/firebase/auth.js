import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  onAuthStateChanged
} from "firebase/auth";
import { ref as dbRef, set, getDatabase, ref, get } from "firebase/database";
import conf from "../conf/conf";

const firebaseConfig = {
  apiKey: conf.firebaseApiKey,
  authDomain: conf.firebaseAuthDomain,
  projectId: conf.firebaseProjectId,
  // Add other config values as needed
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export class AuthService {
  async createAccount({ email, password, username }) {
  
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("Invalid email format.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        await set(dbRef(getDatabase(), `userDetails/${userCredential.user.uid}`), {
          email,
          password,
          username,
        });
      }
  
      return userCredential.user;
  
    } catch (error) {
      console.error("CreateAccount Error:", error);
      throw new Error("Could not create account. Please try again.");
    }
  }
  

  async login({email, password}) {
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("Invalid email format.");
    }
    if (!password || password.length < 6) {
      throw new Error("Wrong Password");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async getCurrentUser({uid}) {
    console.log({uid});
    
    try {
      const dbRef = ref(getDatabase(), `userDetails/${uid}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("No user data found.");
      }
    } catch (error) {
      console.error("GetCurrentUser Error:", error);
      throw new Error("Could not retrieve user data.");
    }
  }
  async logout() {
    try {
      signOut(auth)
      .catch((error) => {
        console.log(error.message);
      });
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
      throw new Error("Logout failed. Please try again.");
    }
  }

  async sendPasswordResetEmail({email}) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("SendPasswordResetEmail Error:", error);
      throw new Error("Failed to send reset email. Please check the email address.");
    }
  }

  async updateUserProfile({profile}) {
    const user = this.getCurrentUser();
    if (user) {
      try {
        await updateProfile(user, profile);
      } catch (error) {
        console.error("UpdateUserProfile Error:", error);
        throw new Error("Failed to update profile. Please try again.");
      }
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  async deleteUser({id}) {
    const user = this.getCurrentUser();
    if (user) {
      try {
        await deleteUser(user);
      } catch (error) {
        console.error("DeleteUser Error:", error);
        throw new Error("Failed to delete user. Please try again.");
      }
    } else {
      throw new Error("No user is currently logged in.");
    }
  }
}

const authService = new AuthService();
export default authService;
