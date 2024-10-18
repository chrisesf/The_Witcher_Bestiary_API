import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { ComponentController } from "../controllers/componentsController"
import { ComponentsRequestBody } from "../types/types"

const componentController = new ComponentController()

export default async function (app: FastifyInstance) {
    app.post("/components", async (req: FastifyRequest<{ Body: ComponentsRequestBody[] }>, reply: FastifyReply,) => {
        await componentController.create(req, reply)
    },
    )

    app.put("/components/:id", async (req: FastifyRequest<{ Body: ComponentsRequestBody }>, reply: FastifyReply) => {
        await componentController.update(req, reply)
    },
    )

    app.delete("/components/:id", async (req: FastifyRequest, reply: FastifyReply) => {
        await componentController.delete(req, reply)
    },
    )

    app.get("/components", async (req: FastifyRequest, reply: FastifyReply) => {
        await componentController.list(req, reply)
    })

    app.get("/components/:id", async (req: FastifyRequest, reply: FastifyReply) => {
        await componentController.getById(req, reply)
    })
}