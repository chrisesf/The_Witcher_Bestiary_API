import { dbcon } from "../config/db-connect"

class Weakness {
    item_id: number
    creature_id: number

    constructor(item_id: number, creature_id: number) {
        this.item_id = item_id
        this.creature_id = creature_id
    }
}

class WeaknessDAO {
    static async weaknessInsert(weakness: Weakness) {
        const sql = "INSERT INTO weakness (item_id, creature_id) VALUES ($1, $2)";
        const values = [weakness.item_id, weakness.creature_id];

        try {
            const result = await dbcon.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir fraqueza:", error);
            throw new Error("Erro ao inserir fraqueza");
        }
    }


    static async weaknessUpdate(weakness: Weakness, creatureId: number, itemId: number) {
        const sql = "UPDATE weakness SET item_id = $1 WHERE creature_id = $2 AND item_id = $3"
        const values = [weakness.item_id, creatureId, itemId];

        try {
            const result = await dbcon.query(sql, values)
            return result
        } catch (error) {
            console.error("Erro ao atualizar fraqueza:", error)
            throw new Error("Erro ao atualizar fraqueza")
        }
    }

    static async weaknessDelete(creatureId: number, itemId: number) {
        const sql = "DELETE FROM weakness WHERE creature_id = $1 AND item_id = $2"
        const values = [creatureId, itemId];

        try {
            const result = await dbcon.query(sql, values)
            return result.rows
        } catch (error) {
            console.error("Erro ao deletar fraqueza:", error)
            throw new Error("Erro ao deletar fraqueza")
        }
    }

    static async weaknessList() {
        const sql = "SELECT item_id, creature_id, created_at, updated_at FROM weakness"

        try {
            const result = await dbcon.query(sql)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar fraquezas:", error)
            throw new Error("Erro ao buscar fraquezas")
        }
    }

    static async getWeaknessById(id: number) {
        const sql = "SELECT item_id, creature_id, created_at, updated_at FROM weakness WHERE creature_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar fraqueza por ID:", error)
            throw new Error("Erro ao buscar fraqueza por ID")
        }
    }

    static async getEffectivenessById(id: number) {
        const sql = "SELECT item_id, creature_id, created_at, updated_at FROM weakness WHERE item_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar eficácia por ID:", error)
            throw new Error("Erro ao buscar eficácia por ID")
        }
    }
}

export { Weakness, WeaknessDAO }
