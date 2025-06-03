import { Router } from "express";

import { TeamController } from "@/controllers/team-controller";

export const teamRoutes = Router()

const teamController = new TeamController()

teamRoutes.post("/:user_id", teamController.create)