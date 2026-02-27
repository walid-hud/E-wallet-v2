import type { Request, Response } from "express";
import store from "../data/index.js";
import { send_error, send_success } from "../utils/index.js";

export const get_user_by_id = (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) {
    return send_error(res, 400, "invalid request");
  }

  const user = store.Users.get(id);
  if (!user) {
    return send_error(res, 404, "user not found");
  }

  return send_success(res, { user });
};

export const create_user = (req: Request, res: Response) => {
  const { name } = req.body ?? {};
  if (!name) {
    return send_error(res, 400, "invalid request");
  }

  const new_user = store.Users.create(name);
  if (!new_user) {
    return send_error(res, 400, "user already exist");
  }

  return send_success(res, { user: new_user });
};

export const delete_user = (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) {
    return send_error(res, 400, "invalid request");
  }

  const user = store.Users.get(id);
  if (!user) {
    return send_error(res, 404, "user not found");
  }

  const deleted = store.Users.delete(user.id);
  if (!deleted) {
    return send_error(res, 400, "user couldn't be deleted");
  }

  return send_success(res, { user });
};

export const update_user = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name } = req.body ?? {};

  if (!id || !name) {
    return send_error(res, 400, "invalid request");
  }

  const user = store.Users.get(id);
  if (!user) {
    return send_error(res, 404, "user not found");
  }

  user.name = name;
  return send_success(res, { user });
};
