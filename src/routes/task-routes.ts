import { Router } from "express";

import { TaskController } from "@/controllers/task-controller";

export const taskRoute = Router()
const taskController = new TaskController


taskRoute.get("/", taskController.index)
taskRoute.post("/:assigned_to/create/:team_id", taskController.create)
taskRoute.put("/:user_id/update/:task_id", taskController.update)
taskRoute.delete("/:user_id/delete/:task_id", taskController.delete)