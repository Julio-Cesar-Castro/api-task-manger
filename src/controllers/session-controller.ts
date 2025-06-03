import { Request, Response } from "express"

export class SessionController {
  async create(request: Request, response: Response) {

    return response.json({ message: "OK" })
  }
}