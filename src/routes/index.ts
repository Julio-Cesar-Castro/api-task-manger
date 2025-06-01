import { Router } from "express";

import { taskRoute } from "./task-routes";

export const routes = Router()


routes.use("/task", taskRoute)