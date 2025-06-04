import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/auth";

interface TokenPayLoad {
  role: string,
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError("Unauthorized", 401)
    }

    const [_, token] = authHeader.split(" ")

    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayLoad

    request.user = {
      id: user_id,
      role,
    }

    return next()
  } catch (error) {

    throw new AppError("Unauthorized", 401)
  }
}