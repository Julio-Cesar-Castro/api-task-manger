import { Router } from "express";

import { TeamMemberController } from "@/controllers/team-member-controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthenticate } from "@/middlewares/verifyUserAuthenticate";

export const teamMemberRoutes = Router()

const teamMemberController = new TeamMemberController()

teamMemberRoutes.post("/:team_id/team/:user_id", ensureAuthenticated, verifyUserAuthenticate(["ADMIN"]), teamMemberController.create)
teamMemberRoutes.delete("/:team_member_id", ensureAuthenticated, verifyUserAuthenticate(["ADMIN"]), teamMemberController.remove)