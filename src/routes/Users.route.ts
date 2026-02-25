import { Router } from "express";
import {
  create_user,
  delete_user,
  get_user_by_id,
  update_user,
} from "../controllers/Users.controller.js";

const UsersRouter: Router = Router();

UsersRouter.get("/:id", get_user_by_id);
UsersRouter.post("/", create_user);
UsersRouter.patch("/:id", update_user);
UsersRouter.delete("/:id", delete_user);

export default UsersRouter;
