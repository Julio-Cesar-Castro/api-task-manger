import { Request, Response } from "express"
import { z } from "zod"
import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken'
import { prisma } from "@/database/database"
import { AppError } from "@/utils/AppError"
import { authConfig } from "@/config/auth"

/* 
  Recuperar usuário
  Comparar
  Gerar JWT
*/


export class SessionController {
  async create(request: Request, response: Response) {

    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const { password, email } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email, } })

    if (!user) {
      throw new AppError("email or password invalid, please try again!")
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("email or password invalid, please try again!")
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: _, ...userWithOutPassword } = user

    return response.json()
  }
}