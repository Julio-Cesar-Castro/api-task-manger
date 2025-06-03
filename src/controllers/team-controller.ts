import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/database";
import { AppError } from "@/utils/AppError";

export class TeamController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
    })

    const parmsSchema = z.object({
      user_id: z.string().uuid()
    })

    const { name, description } = bodySchema.parse(request.body)

    const { user_id } = parmsSchema.parse(request.params)

    const user = await prisma.user.findFirst({ where: { id: user_id } })

    if (!user) {
      throw new AppError("User not found!")
    }

    await prisma.teams.create({
      data: {
        name,
        description,
      }
    })

    return response.status(201).json()
  }
}