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
        const sql = "SELECT creature_id AS id, name, description, image, category_id AS category, created_at, updated_at FROM creature"

        try {
            const result = await dbcon.query(sql)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar criaturas:", error)
            throw new Error("Erro ao buscar criaturas")
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
