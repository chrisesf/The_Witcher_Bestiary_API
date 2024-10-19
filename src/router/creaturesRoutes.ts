import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { CreatureController } from "../controllers/creaturesController"
import { CreatureRequestBody } from "../types/types"

const creaturesController = new CreatureController()

export default async function (app: FastifyInstance) {
  app.post(
    "/creature",
    async (
      req: FastifyRequest<{ Body: CreatureRequestBody[] }>,
      reply: FastifyReply,
    ) => {
      await creaturesController.create(req, reply)
    },
  )

  app.put(
    "/creature/:id",
    async (
      req: FastifyRequest<{ Body: CreatureRequestBody }>,
      reply: FastifyReply,
    ) => {
      await creaturesController.update(req, reply)
    },
  )

  app.delete(
    "/creature/:id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      await creaturesController.delete(req, reply)
    },
  )

  app.get("/creature", async (req: FastifyRequest, reply: FastifyReply) => {
    await creaturesController.list(req, reply)
  })

  app.get("/creature/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    await creaturesController.getById(req, reply)
  })
}
