import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { LocationController } from "../controllers/locationsController"
import { LocationsRequestBody } from "../types/types"

const locationsController = new LocationController()

export default async function (app: FastifyInstance) {
  app.post(
    "/location",
    async (
      req: FastifyRequest<{ Body: LocationsRequestBody[] }>,
      reply: FastifyReply,
    ) => {
      await locationsController.create(req, reply)
    },
  )

  app.put(
    "/location/:id",
    async (
      req: FastifyRequest<{ Body: LocationsRequestBody }>,
      reply: FastifyReply,
    ) => {
      await locationsController.update(req, reply)
    },
  )

  app.delete(
    "/location/:id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      await locationsController.delete(req, reply)
    },
  )

  app.get("/location", async (req: FastifyRequest, reply: FastifyReply) => {
    await locationsController.list(req, reply)
  })

  app.get("/location/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    await locationsController.getById(req, reply)
  })
}
