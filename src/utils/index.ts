import { randomUUID } from "node:crypto";
import { ServerResponse } from "node:http";

export function gen_id(): string {
  return randomUUID().slice(0, 8); // keep ids short for demo
}

export const toJson = (obj: object = {}): string => JSON.stringify(obj);

export const respond = (res: ServerResponse, status: number, payload: object): void => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(toJson(payload));
};
