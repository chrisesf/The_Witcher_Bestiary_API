import { FastifyRequest, FastifyReply } from "fastify"
import { CreatureDAO } from "../models/creaturesModel"
import { Creature } from "../models/creaturesModel"
import { CreatureRequestBody } from "../types/types"
import { randomUUID } from "node:crypto"

export class CreatureController {
    async create(
        req: FastifyRequest<{ Body: CreatureRequestBody[] }>,
        reply: FastifyReply,
    ) {
        const creatures = req.body;

        creatures.forEach(async (creatureData) => {
            const { name, description, image, category_id } = creatureData;
            const newId = randomUUID()

            const creature: Creature = {
                newId: newId,
                name: name,
                description: description,
                image: image,
                category_id: category_id
            };

            try {
                await CreatureDAO.creatureInsert(creature);
            } catch (error) {
                console.log({ error });
                return reply.status(500).send({ error: "Erro ao criar criatura" });
            }
        });

        return reply.status(201).send({ message: "Criaturas criadas com sucesso" });
    }


    async update(
        req: FastifyRequest<{ Body: CreatureRequestBody }>,
        reply: FastifyReply,
    ) {
        const { name, description, image, category_id } = req.body
        const { id } = req.params as { id: string }

        const creature: Creature = {
            newId: id,
            name: name,
            description: description,
            image: image,
            category_id: category_id
        }

        try {
            const result = await CreatureDAO.creatureUpdate(creature, id)
            if (result.rowCount === 0) {
                return reply.status(404).send({ error: "Criatura não encontrada" })
            }
            return reply.status(200).send({ message: "Criatura atualizada com sucesso" })
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao atualizar criatura" })
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        try {
            const creature = await CreatureDAO.creatureDelete(id)

            if (!creature) {
                return reply.status(404).send({ error: "Criatura não encontrada" })
            }

            return reply.send(creature)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar criatura" })
        }
    }

    async list(req: FastifyRequest, reply: FastifyReply) {
        try {
            const creature = await CreatureDAO.creatureList()
            return reply.status(200).send(creature)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar criaturas" })
        }
    }

    async getById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const creature = await CreatureDAO.getCreatureById(id)

            if (!creature) {
                return reply.status(404).send({ error: "Criatura não encontrada" })
            }

            return reply.status(200).send(creature)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar criatura" })
        }
    }
}
