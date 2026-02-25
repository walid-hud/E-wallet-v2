import { log  } from "node:console";
import Store from "./store.js";
import type { User } from "./classes.js";
const store = new Store();

const user = store.Users.create("user") as User;
const wallet = store.Wallets.create("user wallet", user.id  );
log(wallet , user);

export default store;
