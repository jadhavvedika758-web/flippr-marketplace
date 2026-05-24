import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export async function signup(email, password) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logout() {
  return await signOut(auth);
}

export async function googleLogin() {
  return await signInWithPopup(auth, provider);
}