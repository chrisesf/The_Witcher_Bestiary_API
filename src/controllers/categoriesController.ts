import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryDAO } from '../models/categoriesModel';
import { Category } from '../models/categoriesModel';
import { CreateCategoryRequestBody } from '../types/categoriesTypes';

export class CategoryController {

    async create(req: FastifyRequest<{ Body: CreateCategoryRequestBody }>, reply: FastifyReply) {
        const { name, description } = req.body;

        const category: Category = {
            name: name,
            description: description
        };

        try {
            await CategoryDAO.categoryInsert(category);
            return reply.status(201).send({ message: 'Categoria criada com sucesso' });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao criar categoria' });
        }
    }

    async update(req: FastifyRequest<{ Body: CreateCategoryRequestBody }>, reply: FastifyReply) {
        const { name, description } = req.body;
        const { id } = req.params as { id: number };

        const category: Category = {
            name: name,
            description: description
        };

        try {
            const result = await CategoryDAO.categoryUpdate(category, id);
            if (result.rowCount === 0) {
                return reply.status(404).send({ error: 'Categoria não encontrada' });
            }
            return reply.status(200).send({ message: 'Categoria atualizada com sucesso' });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao atualizar categoria' });
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number };

        try {
            const result = await CategoryDAO.categoryDelete(id);
            if (result.rowCount === 0) {
                return reply.status(404).send({ error: 'Categoria não encontrada' });
            }
            return reply.status(201).send({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao deletar categoria' });
        }
    }

    async list(req: FastifyRequest, reply: FastifyReply) {
        try {
            const categories = await CategoryDAO.categoryList();
            return reply.status(200).send(categories);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar categorias' });
        }
    }

    async getById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: number };
            const category = await CategoryDAO.getCategoryById(id);

            if (!category) {
                return reply.status(404).send({ error: 'Categoria não encontrada' });
            }

            return reply.status(200).send(category);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar categoria' });
        }
    }

}
