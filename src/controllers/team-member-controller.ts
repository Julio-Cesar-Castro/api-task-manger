import { prisma } from "@/database/database";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod"

export class TeamMemberController {
  async create(request: Request, response: Response) {

    const paramsSchema = z.object({
      team_id: z.string().uuid(),
      user_id: z.string().uuid()
    })

    const { team_id, user_id } = paramsSchema.parse(request.params)

    const member = await prisma.teamMember.create({
      data: {
        teamId: team_id,
        userId: user_id
      }
    })

    return response.json(member)
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      team_member_id: z.string().uuid()
    })

    const { team_member_id } = paramsSchema.parse(request.params)

    const teamMemberId = await prisma.teamMember.findFirst({ where: { id: team_member_id } })

    if (!teamMemberId) {
      throw new AppError("This user inside the team is already deleted")
    }

    await prisma.teamMember.delete({
      where: { id: team_member_id }
    })

    return response.json()
  }
}