import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CategoryController } from "../controllers/classesController";
import { CreateCategoryRequestBody } from "../types/classesTypes";

const categoryController = new CategoryController()

export default async function (app: FastifyInstance) {

    app.post('/category', async (req: FastifyRequest<{ Body: CreateCategoryRequestBody }>, reply: FastifyReply) => {
        await categoryController.create(req, reply);
    });

    app.put('/category/:id', async (req: FastifyRequest<{ Body: CreateCategoryRequestBody }>, reply: FastifyReply) => {
        await categoryController.update(req, reply);
    });

    app.delete('/category/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        await categoryController.delete(req, reply);
    });

    app.get('/category', async (req: FastifyRequest, reply: FastifyReply) => {
        await categoryController.list(req, reply);
    });

    app.get('/category/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        await categoryController.getById(req, reply);
    });

}