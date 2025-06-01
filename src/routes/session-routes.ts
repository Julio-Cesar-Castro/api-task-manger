import { Router } from "express";

import { SessionController } from "@/controllers/session-controller";

export const sessionRoute = Router()

const sessionController = new SessionController()

sessionRoute.post("/", sessionController.create)