import {
  ADMIN_EMAIL,
  ADMIN_PASS
} from "./constants";

import {
  SEED_PRODUCTS,
  SEED_USERS
} from "./seedData";

export function initData() {
  if (!localStorage.getItem("bz_users")) {
    localStorage.setItem("bz_users", JSON.stringify([
      { id: "admin", name: "Admin", email: ADMIN_EMAIL, password: ADMIN_PASS, avatar: "AD", joinedAt: Date.now(), role: "admin" },
      ...SEED_USERS
    ]));
  }
  if (!localStorage.getItem("bz_products")) localStorage.setItem("bz_products", JSON.stringify(SEED_PRODUCTS));
  if (!localStorage.getItem("bz_messages")) localStorage.setItem("bz_messages", JSON.stringify([]));
}