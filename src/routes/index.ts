import { Router } from "express";

import { taskRoute } from "./task-routes";
import { userRoute } from "./user-routes";
import { sessionRoute } from "./session-routes";

export const routes = Router()


routes.use("/task", taskRoute)
routes.use("/user", userRoute)
routes.use("/session", sessionRoute)