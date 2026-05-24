import {
  collection,
  addDoc,
  getDocs,
  query,
  where
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

  await addDoc(collection(db, "users"), {
    uid: user.uid,
    email: user.email,
    name: user.name,
    role: "user",
    createdAt: Date.now()
  });
}

  export async function getUserByUID(uid) {

    const q = query(
      collection(db, "users"),
      where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    };
  }