import { Request, Response } from "express"

export class SessionController {
  create(request: Request, response: Response) {

    return response.json({ message: "OK" })
  }
}