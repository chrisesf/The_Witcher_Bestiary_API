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

    static async creatureList() {
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
            LEFT JOIN 
                weakness ON creature.creature_id = weakness.creature_id 
            GROUP BY 
                creature.creature_id
            ORDER BY
                creature.creature_id;
            `
       
        const totalCountSQL = "SELECT COUNT(*) FROM creature;"

        try {
            const totalCountResult = await dbcon.query(totalCountSQL);
            const totalCount = parseInt(totalCountResult.rows[0].count, 10);

            const result = await dbcon.query(sql);

            const creatures = result.rows.map(creature => {
                const categoryArray = `localhost:3333/category/${creature.category}`

                if (creature.weaknesses != null) {
                    const weaknessesArray = creature.weaknesses.split(',').map((item: string) => {
                        return `localhost:3333/item/${item.trim()}`;
                    });

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

                } else {
                    return {
                        id: creature.id,
                        name: creature.name,
                        description: creature.description,
                        weaknesses: [null],
                        image: creature.image,
                        category: [categoryArray],
                        created_at: creature.created_at,
                        updated_at: creature.updated_at,
                    };
                }
                
            });

            const response = {
                count: totalCount,
                results: creatures,
            };

            return response;
        } catch (error) {
            console.error("Erro ao buscar criaturas:", error);
            throw new Error("Erro ao buscar criaturas");
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
