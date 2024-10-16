import { FastifyRequest, FastifyReply } from 'fastify';
import { randomUUID } from 'crypto';
import { UserDAO } from '../models/userModel';
import { User } from '../models/userModel';
import { UserBodyType } from '../types/userTypes';

export class UserController {
    async create(req: FastifyRequest<{ Body: UserBodyType }>, reply: FastifyReply) {
        const { name, age } = req.body;
        const userId = randomUUID();

        const usuario: User = {
            userId: userId,
            name: name,
            age: age
        };

        await UserDAO.userInsert(usuario);

        return reply.status(204).send()
    }

    async list(req: FastifyRequest, reply: FastifyReply) {

        try {
            const users = await UserDAO.userList();
            return reply.send(users);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar usuários' });;
        }
    }

}
