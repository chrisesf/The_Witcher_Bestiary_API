import { FastifyRequest, FastifyReply } from "fastify"
import { ItemDAO } from "../models/itensModel"
import { Item } from "../models/itensModel"
import { ItensRequestBody } from "../types/types"

export class ItemController {
    async create(
        req: FastifyRequest<{ Body: ItensRequestBody[] }>,
        reply: FastifyReply,
    ) {
        const itens = req.body;

        itens.forEach(async (itemData) => {
            const { name, description, image, item_type } = itemData;

            const creature: Item = {
                name: name,
                description: description,
                image: image,
                item_type: item_type
            };

            try {
                await ItemDAO.itemInsert(creature);
            } catch (error) {
                console.log({ error });
                return reply.status(500).send({ error: "Erro ao criar item" });
            }
        });

        return reply.status(201).send({ message: "Itens criados com sucesso" });
    }


    async update(
        req: FastifyRequest<{ Body: ItensRequestBody }>,
        reply: FastifyReply,
    ) {
        const { name, description, image, item_type } = req.body
        const { id } = req.params as { id: string }

        const creature: Item = {
            name: name,
            description: description,
            image: image,
            item_type: item_type
        }

        try {
            const result = await ItemDAO.itemUpdate(creature, id)
            if (result.rowCount === 0) {
                return reply.status(404).send({ error: "Item não encontrado" })
            }
            return reply.status(200).send({ message: "Item atualizado com sucesso" })
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao atualizar item" })
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        try {
            const creature = await ItemDAO.itemDelete(id)

            if (!creature) {
                return reply.status(404).send({ error: "Item não encontrado" })
            }

            return reply.send(creature)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar item" })
        }
    }

    async list(req: FastifyRequest, reply: FastifyReply) {
        try {
            const creature = await ItemDAO.itemList()
            return reply.status(200).send(creature)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar itens" })
        }
    }

    async getById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const creature = await ItemDAO.getItemById(id)

            if (!creature) {
                return reply.status(404).send({ error: "Item não encontrado" })
            }

            return reply.status(200).send(creature)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar item" })
        }
    }
}
