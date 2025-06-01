import { Router } from "express";

import { TaskController } from "@/controllers/task-controller";

export const taskRoute = Router()
const taskController = new TaskController


taskRoute.get("/", taskController.index)