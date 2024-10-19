import { FastifyRequest, FastifyReply } from "fastify"
import { ComponentDAO } from "../models/componentModel"
import { Component } from "../models/componentModel"
import { ComponentsRequestBody } from "../types/types"

export class ComponentController {
    async create(
        req: FastifyRequest<{ Body: ComponentsRequestBody[] }>,
        reply: FastifyReply,
    ) {
        const componentes = req.body;

        componentes.forEach(async (componentData) => {
            const { name, description, type, tier, base_value, sell_price, buy_price, craftable, image } = componentData;

            const component: Component = {
                name: name,
                description: description,
                type: type,
                tier: tier,
                base_value: base_value,
                sell_price: sell_price,
                buy_price: buy_price,
                craftable: craftable,
                image: image
            };

            try {
                await ComponentDAO.componentInsert(component);
            } catch (error) {
                console.log({ error });
                return reply.status(500).send({ error: "Erro ao criar componente" });
            }
        });

        return reply.status(201).send({ message: "Componentes criados com sucesso" });
    }


    async update(
        req: FastifyRequest<{ Body: ComponentsRequestBody }>,
        reply: FastifyReply,
    ) {
        const { name, description, type, tier, base_value, sell_price, buy_price, craftable, image } = req.body
        const { id } = req.params as { id: string }

        const component: Component = {
            name: name,
            description: description,
            type: type,
            tier: tier,
            base_value: base_value,
            sell_price: sell_price,
            buy_price: buy_price,
            craftable: craftable,
            image: image
        }

        try {
            const result = await ComponentDAO.componentUpdate(component, id)
            if (result.rowCount === 0) {
                return reply.status(404).send({ error: "Componente não encontrado" })
            }
            return reply.status(200).send({ message: "Componente atualizado com sucesso" })
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao atualizar componente" })
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        try {
            const component = await ComponentDAO.componentDelete(id)

            if (!component) {
                return reply.status(404).send({ error: "Componente não encontrado" })
            }

            return reply.send(component)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar componente" })
        }
    }

    async list(req: FastifyRequest, reply: FastifyReply) {
        try {
            const component = await ComponentDAO.componentList()
            return reply.status(200).send(component)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar componentes" })
        }
    }

    async getById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const component = await ComponentDAO.getComponentById(id)

            if (!component) {
                return reply.status(404).send({ error: "Componente não encontrado" })
            }

            return reply.status(200).send(component)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar componente" })
        }
    }
}
