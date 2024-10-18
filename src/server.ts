import { fastify } from "fastify"
import { connectDB } from "./config/db-connect"

const app = fastify()

app.register(import("./router/categoriesRoutes"))
app.register(import("./router/creaturesRoutes"))
app.register(import("./router/itensRoutes"))
app.register(import("./router/locationsRoutes"))
app.register(import("./router/componentsRoutes"))

connectDB()

app.listen({
  port: 3333,
})
