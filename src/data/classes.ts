import { gen_id } from "../utils/index.js";

export class Serializable {
  id: string;
  constructor() {
    this.id = gen_id();
  }

  json(): string {
    return JSON.stringify(this, (_, v) => {
      if (typeof v === "function") {
        return null;
      }
      return v;
    });
  }
}

export interface User {
  name: string;
  id: string;
}

export class User extends Serializable {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

export interface Wallet {
  balance: number;
  user_id: string;
  name: string;
  id: string;
}

export type Result = { success: boolean; error?: { reason?: string }; };

export class Wallet extends Serializable {
  balance: number;
  user_id: string;
  name: string;

  constructor(name: string, balance: number, user_id: string) {
    super();
    this.balance = balance;
    this.user_id = user_id;
    this.name = name;
  }

  deposit(amount: number): Result {
    if (isNaN(amount) || amount < 1 || !Number.isInteger(amount)) {
      return { success: false, error: { reason: "invalid amount" } };
    }
    this.balance += amount;
    return { success: true };
  }

  withdraw(amount: number): Result {
    if (isNaN(amount) || amount < 1 || !Number.isInteger(amount)) {
      return { success: false, error: { reason: "invalid amount" } };
    }
    if (this.balance - amount < 0) {
      return { success: false, error: { reason: "insufficient balance" } };
    }
    this.balance -= amount;
    return { success: true };
  }
}

export interface Transaction {
  amount: number;
  wallet_id: string;
  type: "deposit" | "withdraw";
  id: string;
  date: Date;
}

export class Transaction extends Serializable {
  amount: number;
  wallet_id: string;
  type: "withdraw" | "deposit";
  date: Date;

  constructor(amount: number, wallet_id: string, type: "withdraw" | "deposit") {
    super();
    this.amount = amount;
    this.wallet_id = wallet_id;
    this.type = type;
    this.date = new Date();
  }
}
