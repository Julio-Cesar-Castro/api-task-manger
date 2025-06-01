import { z } from "zod"

export const env = z.object({
  port: z.number(),
  database: z.string().url()
})