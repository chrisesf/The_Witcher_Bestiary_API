import { FastifyRequest, FastifyReply } from "fastify"
import { LocationDAO } from "../models/locationsModel"
import { Location } from "../models/locationsModel"
import { LocationsRequestBody } from "../types/types"
import { randomUUID } from "node:crypto"

export class LocationController {
    async create(
        req: FastifyRequest<{ Body: LocationsRequestBody[] }>,
        reply: FastifyReply,
    ) {
        const locations = req.body;

        locations.forEach(async (locationData) => {
            const { name, description } = locationData;
            const newId = randomUUID()

            const location: Location = {
                newId: newId,
                name: name,
                description: description,
            };

            try {
                await LocationDAO.locationInsert(location);
            } catch (error) {
                console.log({ error });
                return reply.status(500).send({ error: "Erro ao criar localização" });
            }
        });

        return reply.status(201).send({ message: "Localizações criadas com sucesso" });
    }


    async update(
        req: FastifyRequest<{ Body: LocationsRequestBody }>,
        reply: FastifyReply,
    ) {
        const { name, description } = req.body
        const { id } = req.params as { id: string }

        const location: Location = {
            newId: id,
            name: name,
            description: description
        }

        try {
            const result = await LocationDAO.locationUpdate(location, id)
            if (result.rowCount === 0) {
                return reply.status(404).send({ error: "Localização não encontrada" })
            }
            return reply.status(200).send({ message: "Localização atualizada com sucesso" })
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao atualizar localização" })
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        try {
            const location = await LocationDAO.locationDelete(id)

            if (!location) {
                return reply.status(404).send({ error: "Localização não encontrada" })
            }

            return reply.send(location)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar localização" })
        }
    }

    async list(req: FastifyRequest, reply: FastifyReply) {
        try {
            const location = await LocationDAO.locationList()
            return reply.status(200).send(location)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar localizações" })
        }
    }

    async getById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const location = await LocationDAO.getLocationById(id)

            if (!location) {
                return reply.status(404).send({ error: "Localização não encontrado" })
            }

            return reply.status(200).send(location)
        } catch (error) {
            console.log({ error })
            return reply.status(500).send({ error: "Erro ao buscar localização" })
        }
    }
}
