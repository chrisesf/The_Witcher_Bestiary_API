import { dbcon } from "../config/db-connect"

class Creature {
    name: string
    description: string
    image: string
    category_id: string

    constructor(name: string, description: string, image: string, category_id: string) {
        this.name = name
        this.description = description
        this.image = image
        this.category_id = category_id
    }
}

class CreatureDAO {
    static async creatureInsert(creature: Creature) {
        const sql = "INSERT INTO creature (name, description, image, category_id) VALUES ($1, $2, $3, $4)";
        const values = [creature.name, creature.description, creature.image, creature.category_id];

        try {
            const result = await dbcon.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir criatura:", error);
            throw new Error("Erro ao inserir criatura");
        }
    }


    static async creatureUpdate(creature: Creature, id: number) {
        const sql = "UPDATE creature SET name = $1, description = $2, image = $3, category_id = $4 WHERE creature_id = $5"
        const values = [creature.name, creature.description, creature.image, creature.category_id, id];

        try {
            const result = await dbcon.query(sql, values)
            return result
        } catch (error) {
            console.error("Erro ao atualizar criatura:", error)
            throw new Error("Erro ao atualizar criatura")
        }
    }

    static async creatureDelete(id: number) {
        const sql = "DELETE FROM creature WHERE creature_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows
        } catch (error) {
            console.error("Erro ao deletar criatura:", error)
            throw new Error("Erro ao deletar criatura")
        }
    }

    static async creatureList(page: number = 1, limit: number = 10) {
        const offset = (page - 1) * limit;

        const sql = `
            SELECT 
                creature.creature_id AS id,
                creature.name,
                creature.description,
                STRING_AGG(weakness.item_id::text, ',') AS weaknesses,
                creature.image,
                creature.category_id AS category,
                creature.created_at,
                creature.updated_at 
            FROM 
                creature 
            JOIN 
                weakness ON creature.creature_id = weakness.creature_id 
            GROUP BY 
                creature.creature_id, creature.name, creature.description, creature.image, creature.category_id, creature.created_at, creature.updated_at
            LIMIT $1 OFFSET $2;
            `
       
        const totalCountSQL = "SELECT COUNT(*) FROM creature;"

        try {
            const totalCountResult = await dbcon.query(totalCountSQL);
            const totalCount = parseInt(totalCountResult.rows[0].count, 10);

            const result = await dbcon.query(sql, [limit, offset]);

            const creatures = result.rows.map(creature => {
                const weaknessesArray = creature.weaknesses.split(',').map((item: string) => {
                    return `localhost:3333/item/${item.trim()}`;
                });

                const categoryArray = `localhost:3333/category/${creature.category}`

                return {
                    id: creature.id,
                    name: creature.name,
                    description: creature.description,
                    weaknesses: weaknessesArray,
                    image: creature.image,
                    category: [categoryArray],
                    created_at: creature.created_at,
                    updated_at: creature.updated_at,
                };
            });

            const totalPages = Math.ceil(totalCount / limit);

            let nextPage: string | null = null;
            let previousPage: string | null = null;

            if (page < totalPages) {
                nextPage = `localhost:3333/creature?page=${page + 1}&limit=${limit}`;
            } else {
                nextPage = null;
            }

            if (page > 1) {
                previousPage = `localhost:3333/creature?page=${page - 1}&limit=${limit}`;
            } else {
                previousPage = null;
            }

            const response = {
                count: totalCount,
                totalPages: totalPages,
                next: nextPage,
                previous: previousPage,
                results: creatures,
            };

            return response;
        } catch (error) {
            console.error("Erro ao buscar criaturas com paginação:", error);
            throw new Error("Erro ao buscar criaturas com paginação");
        }
    }

    static async getCreatureById(id: number) {
        const sql = "SELECT name, description, image, category_id AS category, created_at, updated_at FROM creature WHERE creature_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar criatura por ID:", error)
            throw new Error("Erro ao buscar criatura por ID")
        }
    }
}

export { Creature, CreatureDAO }
