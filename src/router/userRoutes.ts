import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/userController";

const userController = new UserController()

export type CreateUserRequestBody = {
    name: string;
    age: number;
};

export default async function (app: FastifyInstance) {

    app.post('/', async (req: FastifyRequest <{ Body: CreateUserRequestBody }>, reply: FastifyReply) => {
        await userController.create(req, reply);
        return reply.status(201).send();
    });

    app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        await userController.list(req, reply);
        return reply.status(200).send();
    });


}