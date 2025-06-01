import { Router } from "express";

import { taskRoute } from "./task-routes";
import { userRoute } from "./user-routes";

export const routes = Router()


routes.use("/task", taskRoute)
routes.use("/user", userRoute)