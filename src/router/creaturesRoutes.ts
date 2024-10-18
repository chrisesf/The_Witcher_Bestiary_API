import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { CreatureController } from "../controllers/creaturesController"
import { CreatureRequestBody } from "../types/types"

const creaturesController = new CreatureController()

export default async function (app: FastifyInstance) {
    app.post("/creatures", async (req: FastifyRequest<{ Body: CreatureRequestBody[] }>, reply: FastifyReply,) => {
        await creaturesController.create(req, reply)
    },
    )

    app.put("/creatures/:id", async (req: FastifyRequest<{ Body: CreatureRequestBody }>, reply: FastifyReply) => {
        await creaturesController.update(req, reply)
    },
    )

    app.delete("/creatures/:id", async (req: FastifyRequest, reply: FastifyReply) => {
        await creaturesController.delete(req, reply)
    },
    )

    app.get("/creatures", async (req: FastifyRequest, reply: FastifyReply) => {
        await creaturesController.list(req, reply)
    })

    app.get("/creatures/:id", async (req: FastifyRequest, reply: FastifyReply) => {
        await creaturesController.getById(req, reply)
    })
}