import { Router } from "express";

import { TeamController } from "@/controllers/team-controller";
import { verifyUserAuthenticate } from "@/middlewares/verifyUserAuthenticate";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

export const teamRoutes = Router()

const teamController = new TeamController()


teamRoutes.post("/:user_id", ensureAuthenticated, verifyUserAuthenticate(["ADMIN"]), teamController.create)
teamRoutes.put("/:team_id", ensureAuthenticated, verifyUserAuthenticate(["ADMIN"]), teamController.update)