import type { Request, Response } from "express";
import store from "../data/index.js";

const send_error = (res: Response, status: number, error: string) => {
  return res.status(status).json({ success: false, error });
};

const send_success = (res: Response, payload: object) => {
  return res.status(200).json({ success: true, error: null, ...payload });
};

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
