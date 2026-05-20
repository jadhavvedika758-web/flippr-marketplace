import {
  collection,
  addDoc,
  getDocs
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