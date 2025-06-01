import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";

export class TaskController {
  index(request: Request, response: Response) {

    return response.json({ message: "OK" })
  }
}