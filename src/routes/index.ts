import { Router } from "express";

import { taskRoute } from "./task-routes";
import { userRoute } from "./user-routes";
import { sessionRoute } from "./session-routes";
import { teamRoutes } from "./team-routes";
import { teamMemberRoutes } from "./team-member-routes";

export const routes = Router()


routes.use("/user", userRoute)
routes.use("/task", taskRoute)

routes.use("/session", sessionRoute)


routes.use("/team", teamRoutes)
routes.use("/teams-members", teamMemberRoutes)