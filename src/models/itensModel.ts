import { dbcon } from "../config/db-connect"

class Item {
    newId: string
    name: string
    description: string
    item_type: string
    image: string

    constructor(newId: string, name: string, description: string, item_type: string, image: string) {
        this.newId = newId
        this.name = name
        this.description = description
        this.image = image
        this.item_type = item_type
    }
}

class ItemDAO {
    static async itemInsert(item: Item) {
        const sql = "INSERT INTO itens (item_id, name, description, image, item_type) VALUES ($1, $2, $3, $4, $5)";
        const values = [item.newId, item.name, item.description, item.image, item.item_type];

        try {
            const result = await dbcon.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir item:", error);
            throw new Error("Erro ao inserir item");
        }
    }


    static async itemUpdate(item: Item, id: string) {
        const sql = "UPDATE itens SET name = $1, description = $2, image = $3, item_type = $4 WHERE item_id = $5"
        const values = [item.name, item.description, item.image, item.item_type, id];

        try {
            const result = await dbcon.query(sql, values)
            return result
        } catch (error) {
            console.error("Erro ao atualizar item:", error)
            throw new Error("Erro ao atualizar item")
        }
    }

    static async itemDelete(id: string) {
        const sql = "DELETE FROM itens WHERE item_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows
        } catch (error) {
            console.error("Erro ao deletar item:", error)
            throw new Error("Erro ao deletar item")
        }
    }

    static async itemList() {
        const sql = "SELECT item_id AS id, name AS nome, description AS descrição, image AS imagem, item_type AS tipo FROM itens"

        try {
            const result = await dbcon.query(sql)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar itens:", error)
            throw new Error("Erro ao buscar itens")
        }
    }

    static async getItemById(id: string) {
        const sql = "SELECT name AS nome, description AS descrição, image AS imagem, item_type AS tipo FROM itens WHERE item_id = $1"

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
