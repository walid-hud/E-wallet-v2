import type { Request, Response } from "express";
import store from "../data/index.js";
import { is_valid_positive_integer, send_error, send_success } from "../utils/index.js";

export const create_wallet = (req: Request, res: Response) => {
  const { name, user_id } = req.body ?? {};
  if (!name || !user_id) {
    return send_error(res, 400, "invalid request");
  }

  const user = store.Users.get(user_id);
  if (!user) {
    return send_error(res, 404, "user not found");
  }

  const new_wallet = store.Wallets.create(name, user_id);
  if (!new_wallet) {
    return send_error(res, 400, "wallet already exists");
  }

  return send_success(res, { wallet: new_wallet });
};

export const get_wallets = (_req: Request, res: Response) => {
  const wallets = store.Wallets.get_all();
  return send_success(res, { wallets });
};

export const get_wallet_by_id = (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) {
    return send_error(res, 400, "invalid request");
  }

  const wallet = store.Wallets.get(id);
  if (!wallet) {
    return send_error(res, 404, "wallet not found");
  }

  return send_success(res, { wallet });
};

export const update_wallet = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name } = req.body ?? {};

  if (!id || !name) {
    return send_error(res, 400, "invalid request");
  }

  const wallet = store.Wallets.get(id);
  if (!wallet) {
    return send_error(res, 404, "wallet not found");
  }

  wallet.name = name;
  store.Wallets.update(id, wallet);

  return send_success(res, { wallet });
};

export const delete_wallet = (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) {
    return send_error(res, 400, "invalid request");
  }

  const wallet = store.Wallets.get(id);
  if (!wallet) {
    return send_error(res, 404, "wallet not found");
  }

  const deleted = store.Wallets.delete(wallet.id);
  if (!deleted) {
    return send_error(res, 400, "wallet couldn't be deleted");
  }

  return send_success(res, { wallet });
};

export const deposit_to_wallet = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { amount } = req.body ?? {};

  if (!id) {
    return send_error(res, 400, "invalid request");
  }

  if (!is_valid_positive_integer(amount)) {
    return send_error(res, 400, "invalid amount");
  }

  const result = store.Wallets.deposit(id, amount);
  if (!result.success) {
    const error_reason = result.error?.reason || "deposit failed";
    return send_error(res, 400, error_reason);
  }

  const wallet = store.Wallets.get(id);
  return send_success(res, { wallet });
};

export const withdraw_from_wallet = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { amount } = req.body ?? {};

  if (!id) {
    return send_error(res, 400, "invalid request");
  }

  if (!is_valid_positive_integer(amount)) {
    return send_error(res, 400, "invalid amount");
  }

  const result = store.Wallets.withdraw(id, amount);
  if (!result.success) {
    const error_reason = result.error?.reason || "withdraw failed";
    return send_error(res, 400, error_reason);
  }

  const wallet = store.Wallets.get(id);
  return send_success(res, { wallet });
};

