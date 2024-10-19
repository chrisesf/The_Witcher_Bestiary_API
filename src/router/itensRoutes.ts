import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { ItemController } from "../controllers/itensController"
import { ItensRequestBody } from "../types/types"

const itensController = new ItemController()

export default async function (app: FastifyInstance) {
  app.post(
    "/item",
    async (
      req: FastifyRequest<{ Body: ItensRequestBody[] }>,
      reply: FastifyReply,
    ) => {
      await itensController.create(req, reply)
    },
  )

  app.put(
    "/item/:id",
    async (
      req: FastifyRequest<{ Body: ItensRequestBody }>,
      reply: FastifyReply,
    ) => {
      await itensController.update(req, reply)
    },
  )

  app.delete("/item/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    await itensController.delete(req, reply)
  })

  app.get("/item", async (req: FastifyRequest, reply: FastifyReply) => {
    await itensController.list(req, reply)
  })

  app.get("/item/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    await itensController.getById(req, reply)
  })
}
