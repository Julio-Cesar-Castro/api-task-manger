import { Router } from "express";

import { TaskController } from "@/controllers/task-controller";
import { verifyUserAuthenticate } from "@/middlewares/verifyUserAuthenticate";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

export const taskRoute = Router()
const taskController = new TaskController


taskRoute.get("/:user_id", taskController.index)
taskRoute.post("/:assigned_to/create/:team_id", taskController.create)
taskRoute.put("/:user_id/update/:task_id", taskController.update)
taskRoute.delete("/:user_id/delete/:task_id", taskController.delete)