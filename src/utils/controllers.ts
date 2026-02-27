import type { Response } from "express";

export const send_error = (res: Response, status: number, error: string) => {
  return res.status(status).json({ success: false, error });
};

export const send_success = (res: Response, payload: object) => {
  return res.status(200).json({ success: true, error: null, ...payload });
};

export const is_valid_positive_integer = (value: unknown): value is number => {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
};