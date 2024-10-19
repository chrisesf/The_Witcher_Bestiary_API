import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { WeaknessController } from "../controllers/weaknessesController"
import { WeaknessRequestBody } from "../types/types"

const weaknessController = new WeaknessController()

export default async function (app: FastifyInstance) {
  app.post(
    "/weakness",
    async (
      req: FastifyRequest<{ Body: WeaknessRequestBody[] }>,
      reply: FastifyReply,
    ) => {
      await weaknessController.create(req, reply)
    },
  )

  app.put(
    "/weakness/:creatureId/:itemId",
    async (
      req: FastifyRequest<{ Body: WeaknessRequestBody }>,
      reply: FastifyReply,
    ) => {
      await weaknessController.update(req, reply)
    },
  )

  app.delete(
    "/weakness/:creatureId/:itemId",
    async (req: FastifyRequest, reply: FastifyReply) => {
      await weaknessController.delete(req, reply)
    },
  )

  app.get("/weakness", async (req: FastifyRequest, reply: FastifyReply) => {
    await weaknessController.list(req, reply)
  })

  app.get(
    "/weakness/creature/:creatureId",
    async (req: FastifyRequest, reply: FastifyReply) => {
      await weaknessController.weaknessGetById(req, reply)
    },
  )

  app.get(
    "/weakness/item/:itemId",
    async (req: FastifyRequest, reply: FastifyReply) => {
      await weaknessController.effectivenessGetById(req, reply)
    },
  )
}
