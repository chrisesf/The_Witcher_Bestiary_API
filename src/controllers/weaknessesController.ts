import { FastifyRequest, FastifyReply } from "fastify"
import { WeaknessDAO } from "../models/weaknessesModel"
import { Weakness } from "../models/weaknessesModel"
import { WeaknessRequestBody } from "../types/types"

export class WeaknessController {
  async create(
    req: FastifyRequest<{ Body: WeaknessRequestBody[] }>,
    reply: FastifyReply,
  ) {
    const weaknesses = req.body

    weaknesses.forEach(async (weaknessData) => {
      const { creature_id, item_id } = weaknessData

      const weakness: Weakness = {
        creature_id: creature_id,
        item_id: item_id,
      }

      try {
        await WeaknessDAO.weaknessInsert(weakness)
      } catch (error) {
        console.log({ error })
        return reply.status(500).send({ error: "Erro ao criar fraqueza" })
      }
    })

    return reply.status(201).send({ message: "Fraquezas criadas com sucesso" })
  }

  async update(
    req: FastifyRequest<{ Body: WeaknessRequestBody }>,
    reply: FastifyReply,
  ) {
    const { creature_id, item_id } = req.body
    const { creatureId, itemId } = req.params as {
      creatureId: number
      itemId: number
    }

    const weakness: Weakness = {
      creature_id: creature_id,
      item_id: item_id,
    }

    try {
      const result = await WeaknessDAO.weaknessUpdate(
        weakness,
        creatureId,
        itemId,
      )
      if (result.rowCount === 0) {
        return reply.status(404).send({ error: "Fraqueza não encontrada" })
      }
      return reply
        .status(200)
        .send({ message: "Fraqueza atualizada com sucesso" })
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao atualizar fraqueza" })
    }
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { creatureId, itemId } = req.params as {
      creatureId: number
      itemId: number
    }

    try {
      const weakness = await WeaknessDAO.weaknessDelete(creatureId, itemId)

      if (!weakness) {
        return reply.status(404).send({ error: "Fraqueza não encontrada" })
      }

      return reply.send(weakness)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar fraqueza" })
    }
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    try {
      const weakness = await WeaknessDAO.weaknessList()
      return reply.status(200).send(weakness)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar fraquezas" })
    }
  }

  async weaknessGetById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: number }
      const weakness = await WeaknessDAO.getWeaknessById(id)

      if (!weakness) {
        return reply.status(404).send({ error: "Fraqueza não encontrado" })
      }

      return reply.status(200).send(weakness)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar fraqueza" })
    }
  }

  async effectivenessGetById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: number }
      const weakness = await WeaknessDAO.getWeaknessById(id)

      if (!weakness) {
        return reply.status(404).send({ error: "Eficácia não encontrado" })
      }

      return reply.status(200).send(weakness)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar eficácia" })
    }
  }
}
