import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/database"

describe("UsersController", () => {

  let user_id: string

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("should create a new user", async () => {
    const response = await request(app).post("/user").send({
      name: "User Test",
      email: "user.test@gmail.com",
      password: "123456"
    })

    expect(response.body).toHaveProperty("id")
    expect(response.body.name).toBe("User Test")

    user_id = response.body.id
  })

  it("should throw a error if user with same email already exist", async () => {
    const response = await request(app).post("/user").send({
      name: "User Test",
      email: "user.test@gmail.com",
      password: "123456"
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Email already exist!")
  })

})