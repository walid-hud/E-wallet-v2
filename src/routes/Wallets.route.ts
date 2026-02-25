import { Router } from "express";
import {
  create_wallet,
  get_wallets,
  get_wallet_by_id,
  update_wallet,
  delete_wallet,
  deposit_to_wallet,
  withdraw_from_wallet,
} from "../controllers/Wallets.controller.js";

const WalletsRouter: Router = Router();

WalletsRouter.post("/", create_wallet);
WalletsRouter.get("/", get_wallets);
WalletsRouter.get("/:id", get_wallet_by_id);
WalletsRouter.put("/:id", update_wallet);
WalletsRouter.delete("/:id", delete_wallet);
WalletsRouter.post("/:id/deposit", deposit_to_wallet);
WalletsRouter.post("/:id/withdraw", withdraw_from_wallet);

export default WalletsRouter;
