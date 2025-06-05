import { Router } from "express";

import { taskRoute } from "./task-routes";
import { userRoute } from "./user-routes";
import { sessionRoute } from "./session-routes";
import { teamRoutes } from "./team-routes";
import { teamMemberRoutes } from "./team-member-routes";

import { verifyUserAuthenticate } from "@/middlewares/verifyUserAuthenticate";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

export const routes = Router()


routes.use("/user", userRoute)
routes.use("/task", taskRoute)

routes.use("/session", sessionRoute)

// Privates Routes
routes.use(ensureAuthenticated)
routes.use("/team", verifyUserAuthenticate(["ADMIN"]), teamRoutes)
routes.use("/teams-members", verifyUserAuthenticate(["ADMIN"]), teamMemberRoutes)