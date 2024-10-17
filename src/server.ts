import { fastify } from "fastify"
import { connectDB } from "./config/db-connect"

const app = fastify()

app.register(import("./router/categoriesRoutes"))

connectDB()

app.listen({
  port: 3333,
})
