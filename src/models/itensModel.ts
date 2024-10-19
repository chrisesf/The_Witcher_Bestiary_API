import { dbcon } from "../config/db-connect"

class Item {
    name: string
    description: string
    item_type: string
    image: string

    constructor(name: string, description: string, item_type: string, image: string) {
        this.name = name
        this.description = description
        this.image = image
        this.item_type = item_type
    }
}

class ItemDAO {
    static async itemInsert(item: Item) {
        const sql = "INSERT INTO item (name, description, image, item_type) VALUES ($1, $2, $3, $4)";
        const values = [item.name, item.description, item.image, item.item_type];

        try {
            const result = await dbcon.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir item:", error);
            throw new Error("Erro ao inserir item");
        }
    }


    static async itemUpdate(item: Item, id: number) {
        const sql = "UPDATE item SET name = $1, description = $2, image = $3, item_type = $4 WHERE item_id = $5"
        const values = [item.name, item.description, item.image, item.item_type, id];

        try {
            const result = await dbcon.query(sql, values)
            return result
        } catch (error) {
            console.error("Erro ao atualizar item:", error)
            throw new Error("Erro ao atualizar item")
        }
    }

    static async itemDelete(id: number) {
        const sql = "DELETE FROM item WHERE item_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows
        } catch (error) {
            console.error("Erro ao deletar item:", error)
            throw new Error("Erro ao deletar item")
        }
    }

    static async itemList() {
        const sql = "SELECT item_id AS id, name, description, image, item_type AS type, created_at, updated_at FROM item"

        try {
            const result = await dbcon.query(sql)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar item:", error)
            throw new Error("Erro ao buscar item")
        }
    }

    static async getItemById(id: number) {
        const sql = "SELECT name, description, image, item_type AS type, created_at, updated_at FROM item WHERE item_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar item por ID:", error)
            throw new Error("Erro ao buscar item por ID")
        }
    }
}

export { Item, ItemDAO }
