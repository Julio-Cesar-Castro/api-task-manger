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

  async update(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    })

    const paramsSchema = z.object({
      team_id: z.string().uuid()
    })

    const { description, name } = bodySchema.parse(request.body)

    const { team_id } = paramsSchema.parse(request.params)

    const team = await prisma.teams.findFirst({ where: { id: team_id } })

    if (!team) {
      throw new AppError("Team not found!")
    }

    if (!name && !description) {
      throw new AppError("You should choose at least one information to update")
    }

    const teamUpdated = await prisma.teams.update({
      data: {
        name,
        description,
      },
      where: { id: team_id }
    })

    return response.json(teamUpdated)
  }
}