import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import conf from "../conf/conf"; // Ensure this file contains your Firebase config

class Service {
  constructor() {
    // Initialize Firebase if it hasn't been initialized already
    if (!firebase.apps.length) {
      firebase.initializeApp(conf.firebaseDatabaseURL);
    }
    this.db = firebase.database();
    this.storage = firebase.storage();
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.db.ref(`posts/${slug}`).set({
        title,
        content,
        featuredImage,
        status,
        userId,
      });
      return { slug };
    } catch (error) {
      console.log("Firebase service :: CreatePost :: Error:", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      await this.db.ref(`posts/${slug}`).update({
        title,
        content,
        featuredImage,
        status,
      });
      return { slug };
    } catch (error) {
      console.log("Firebase service :: UpdatePost :: Error:", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.db.ref(`posts/${slug}`).remove();
      return true;
    } catch (error) {
      console.log("Firebase service :: DeletePost :: Error:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const postSnapshot = await this.db.ref(`posts/${slug}`).once("value");
      return postSnapshot.exists() ? { id: slug, ...postSnapshot.val() } : null;
    } catch (error) {
      console.log("Firebase service :: GetPost :: Error:", error);
    }
  }

  async getPosts(status = "active") {
    try {
      const snapshot = await this.db
        .ref("posts")
        .orderByChild("status")
        .equalTo(status)
        .once("value");
      const posts = [];
      snapshot.forEach((childSnapshot) => {
        posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return posts;
    } catch (error) {
      console.log("Firebase service :: GetPosts :: Error:", error);
      return [];
    }
  }

  async uploadFile(file) {
    try {
      const fileRef = this.storage.ref().child(`uploads/${file.name}`);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      return { url };
    } catch (error) {
      console.log("Firebase service :: UploadFile :: Error:", error);
      return false;
    }
  }

  async deleteFile(filePath) {
    try {
      const fileRef = this.storage.ref().child(filePath);
      await fileRef.delete();
      return true;
    } catch (error) {
      console.log("Firebase service :: DeleteFile :: Error:", error);
      return false;
    }
  }

  getFilePreview(filePath) {
    return this.storage.ref().child(filePath).getDownloadURL();
  }
}

const service = new Service();
export default service;
