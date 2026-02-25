import { Transaction, User, Wallet, type Result } from "./classes.js";

class Store {
  Users: Users;
  Transactions: Transactions;
  Wallets: Wallets;
  constructor() {
    this.Users = new Users();
    this.Transactions = new Transactions();
    this.Wallets = new Wallets(this.Transactions);
  }
}

class Users {
  data: Map<string, User>;
  constructor() {
    this.data = new Map();
  }

  create(name: string): User | false {
    const U = new User(name);
    if (this.get(U.id)) return false;
    this.data.set(U.id, U);
    return U;
  }

  get(id: string): User | undefined {
    return this.data.get(id);
  }

  update(id: string, U: User): boolean {
    const old_user = this.get(id);
    if (!old_user) return false;
    this.data.set(id, U);
    return true;
  }

  delete(id: string): boolean {
    const user = this.get(id);
    if (!user) return false;
    this.data.delete(id);
    return true;
  }
}

class Wallets {
  data: Map<string, Wallet>;
  transactions: Transactions;

  constructor(transactions: Transactions) {
    this.data = new Map();
    this.transactions = transactions;
  }

  create(name: string, user_id: string): Wallet | false {
    const W = new Wallet(name, 0, user_id);
    if (this.get(W.id)) return false;
    this.data.set(W.id, W);
    return W;
  }

  add(W: Wallet): boolean {
    const existing_wallet = this.get(W.id);
    if (existing_wallet) return false;
    this.data.set(W.id, W);
    return true;
  }

  get(id: string): Wallet | undefined {
    return this.data.get(id);
  }

  get_all(): Wallet[] {
    return Array.from(this.data.values());
  }

  update(id: string, W: Wallet): boolean {
    const wallet = this.get(id);
    if (!wallet) return false;
    this.data.set(id, W);
    return true;
  }

  delete(id: string): boolean {
    const wallet = this.get(id);
    if (!wallet) return false;
    this.data.delete(id);
    return true;
  }

  deposit(wallet_id: string, amount: number): Result {
    let wallet = this.get(wallet_id);
    if (!wallet) {
      return { success: false, error: { reason: "wallet not found" } };
    }
    const result = wallet.deposit(amount);
    if (!result.success) return result;

    this.update(wallet_id, wallet);
    const T = new Transaction(amount, wallet_id, "deposit");
    this.transactions.create(T);
    return { success: true };
  }

  withdraw(wallet_id: string, amount: number): Result {
    let wallet = this.get(wallet_id);
    if (!wallet) {
      return { success: false, error: { reason: "wallet not found" } };
    }
    const result = wallet.withdraw(amount);
    if (!result.success) return result;

    this.update(wallet_id, wallet);
    const T = new Transaction(amount, wallet_id, "withdraw");
    this.transactions.create(T);
    return { success: true };
  }
}

class Transactions {
  data: Map<string, Transaction>;
  constructor() {
    this.data = new Map();
  }

  create(T: Transaction): boolean {
    const existing_transaction = this.get(T.id);
    if (existing_transaction) return false;
    this.data.set(T.id, T);
    return true;
  }

  get(id: string): Transaction | undefined {
    return this.data.get(id);
  }

  get_all(): Transaction[] {
    return Array.from(this.data.values());
  }

  update(id: string, T: Transaction): boolean {
    const transaction = this.get(id);
    if (!transaction) return false;
    this.data.set(id, T);
    return true;
  }

  delete(id: string): boolean {
    const transaction = this.get(id);
    if (!transaction) return false;
    this.data.delete(id);
    return true;
  }
}

export default Store;
