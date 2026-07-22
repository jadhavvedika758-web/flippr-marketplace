import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export async function addProduct(product) {
  await addDoc(collection(db, "products"), {
    ...product,
    createdAt: Date.now(),
    active: true
  });
}

export async function getProductsFromDB() {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function createProduct(product) {
  await addDoc(collection(db, "products"), {
    ...product,
    createdAt: Date.now(),
    active: true
  });
}

export async function createUser(user) {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    name: user.name,
    role: "user",
    createdAt: Date.now(),
  });
}

export async function getUserByUID(uid) {
  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}