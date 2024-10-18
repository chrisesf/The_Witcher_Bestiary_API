import { FastifyRequest, FastifyReply } from "fastify"
import { CategoryDAO } from "../models/categoriesModel"
import { Category } from "../models/categoriesModel"
import { CategoryRequestBody } from "../types/types"
import { randomUUID } from "node:crypto"

export class CategoryController {
  async create(
    req: FastifyRequest<{ Body: CategoryRequestBody[] }>,
    reply: FastifyReply,
  ) {
    const categories = req.body;

    categories.forEach(async (categoryData) => {
      const { name, description } = categoryData;
      const newId = randomUUID()

      const component: Category = {
        newId: newId,
        name: name,
        description: description
      };

      try {
        await CategoryDAO.categoryInsert(component);
      } catch (error) {
        console.log({ error });
        return reply.status(500).send({ error: "Erro ao criar componente" });
      }
    });

    return reply.status(201).send({ message: "Componentes criados com sucesso" });
  }


  async update(
    req: FastifyRequest<{ Body: CategoryRequestBody }>,
    reply: FastifyReply,
  ) {
    const { name, description } = req.body
    const { id } = req.params as { id: string }

    const category: Category = {
      newId: id,
      name: name,
      description: description,
    }

    try {
      const result = await CategoryDAO.categoryUpdate(category, id)
      if (result.rowCount === 0) {
        return reply.status(404).send({ error: "Categoria não encontrada" })
      }
      return reply.status(200).send({ message: "Categoria atualizada com sucesso" })
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao atualizar categoria" })
    }
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }

    try {
      const category = await CategoryDAO.categoryDelete(id)

      if (!category) {
        return reply.status(404).send({ error: "Categoria não encontrada" })
      }

      return reply.send(category)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar categoria" })
    }
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    try {
      const categorie = await CategoryDAO.categoryList()
      return reply.status(200).send(categorie)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar categorias" })
    }
  }

  async getById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string }
      const category = await CategoryDAO.getCategoryById(id)

      if (!category) {
        return reply.status(404).send({ error: "Categoria não encontrada" })
      }

      return reply.status(200).send(category)
    } catch (error) {
      console.log({ error })
      return reply.status(500).send({ error: "Erro ao buscar categoria" })
    }
  }
}
