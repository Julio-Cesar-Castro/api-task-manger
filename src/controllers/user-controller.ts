import { Request, Response } from "express";
import { z } from "zod"
import { prisma } from "@/database/database";
import { AppError } from "@/utils/AppError";
import { hashSync } from "bcrypt"

export class UserController {
  async create(request: Request, response: Response) {

    const bodySchema = z.object({
      name: z.string().min(1).trim(),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { name, email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email } })

    if (user) {
      throw new AppError("User Already exist!")
    }

    const passwordHashed = hashSync(password, 8)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: String(passwordHashed)
      }
    })

    const { password: _, ...userWithOoutPassword } = newUser

    return response.status(201).json(userWithOoutPassword)
  }
}