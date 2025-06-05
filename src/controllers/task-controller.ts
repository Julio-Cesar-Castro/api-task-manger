import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod"
import { prisma } from "@/database/database";


export class TaskController {
  async index(request: Request, response: Response) {

    const paramsSchema = z.object({
      user_id: z.string().uuid()
    })

    const { user_id } = paramsSchema.parse(request.params)

    const tasks = await prisma.task.findMany({ where: { assignedTo: user_id } })

    if (!tasks) {
      throw new AppError("No task found!")
    }

    return response.json()
  }

  async create(request: Request, response: Response) {

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
      priority: z.enum(["low", "medium", "high"]).default("low"),
    })

    const paramsSchema = z.object({
      assigned_to: z.string().uuid(),
      team_id: z.string().uuid()
    })

    const { title, description, status, priority } = bodySchema.parse(request.body)

    const { assigned_to, team_id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUnique({ where: { id: assigned_to } })

    if (!user) {
      throw new AppError("User not found!")
    }

    const team = prisma.teams.findUnique({ where: { id: team_id } })

    if (!team) {
      throw new AppError("Team not found!")
    }

    await prisma.task.create({
      data: {
        title,
        description,
        status: status ? "pending" : status,
        priority: priority ? "low" : priority,
        assignedTo: assigned_to,
        teamId: team_id,
      }
    })


    return response.status(201).json()
  }

  async update(request: Request, response: Response) {

    const bodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(["pending", "in_progress", "completed"]).optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
    })

    const paramsSchema = z.object({
      user_id: z.string().uuid(),
      task_id: z.string().uuid()
    })

    const { title, description, priority, status } = bodySchema.parse(request.body)

    const { user_id, task_id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUnique({ where: { id: user_id } })

    if (!user) {
      throw new AppError("User not found!")
    }

    const task = await prisma.task.findFirst({ where: { assignedTo: user_id, id: task_id } })

    if (!task) {
      throw new AppError("Task not found!")
    }

    if (!title && !description) {
      throw new AppError("You should insert a new value in title or description to update")
    }

    await prisma.task.update({
      data: {
        title,
        description,
        priority,
        status,
      },
      where: {
        id: task_id
      }
    })


    return response.json()
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      user_id: z.string().uuid(),
      task_id: z.string().uuid(),
    })

    const { user_id, task_id } = paramsSchema.parse(request.params)

    const task = await prisma.task.findUnique({ where: { id: task_id, assignedTo: user_id } })

    if (!task) {
      throw new AppError("You can't delete a task that doesn't exist")
    }

    await prisma.task.delete({ where: { id: task_id, assignedTo: user_id } })

    return response.json()
  }
}