export function getUsers() {
  return JSON.parse(localStorage.getItem("bz_users") || "[]");
}

export function getProducts() {
  return JSON.parse(localStorage.getItem("bz_products") || "[]");
}

export function getMessages() {
  return JSON.parse(localStorage.getItem("bz_messages") || "[]");
}

export function saveUsers(u) {
  localStorage.setItem("bz_users", JSON.stringify(u));
}

export function saveProducts(p) {
  localStorage.setItem("bz_products", JSON.stringify(p));
}

export function saveMessages(m) {
  localStorage.setItem("bz_messages", JSON.stringify(m));
}