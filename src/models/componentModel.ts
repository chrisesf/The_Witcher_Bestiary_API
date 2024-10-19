import { dbcon } from "../config/db-connect"

class Component {
    name: string
    description: string
    type: string
    tier: string
    base_value: number
    sell_price: number
    buy_price: number
    craftable: boolean
    image: string

    constructor(
        name: string, description: string, type: string, tier: string, 
        base_value: number, sell_price: number, buy_price: number, craftable: boolean, image: string
    ) {
        this.name = name
        this.description = description
        this.type = type
        this.tier = tier
        this.base_value = base_value
        this.sell_price = sell_price
        this.buy_price = buy_price
        this.craftable = craftable
        this.image = image
    }
}

class ComponentDAO {
    static async componentInsert(component: Component) {
        const sql = 
            "INSERT INTO component (name, description, type, tier, base_value, sell_price, buy_price, craftable, image) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

        const values = [
            component.name, component.description, component.type, component.tier, 
            component.base_value, component.sell_price, component.buy_price, component.craftable, component.image
        ];

        try {
            const result = await dbcon.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir componente:", error);
            throw new Error("Erro ao inserir componente");
        }
    }


    static async componentUpdate(component: Component, id: number) {
        const sql = 
            "UPDATE component SET name = $1, description = $2, type = $3, tier = $4, base_value = $5, " +
            "sell_price = $6, buy_price = $7, craftable = $8, image = $9  WHERE component_id = $10"

        const values = [ 
            component.name, component.description, component.type, component.tier, component.base_value, 
            component.sell_price, component.buy_price, component.craftable, component.image, id
        ];

        try {
            const result = await dbcon.query(sql, values)
            return result
        } catch (error) {
            console.error("Erro ao atualizar componente:", error)
            throw new Error("Erro ao atualizar componente")
        }
    }

    static async componentDelete(id: number) {
        const sql = "DELETE FROM component WHERE component_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows
        } catch (error) {
            console.error("Erro ao deletar componente:", error)
            throw new Error("Erro ao deletar componente")
        }
    }

    static async componentList() {
        const sql = 
            "SELECT component_id AS id, name, description, type, tier, base_value, " +
            "sell_price, buy_price, craftable, image, created_at, updated_at FROM component"

        try {
            const result = await dbcon.query(sql)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar componentes:", error)
            throw new Error("Erro ao buscar componentes")
        }
    }

    static async getComponentById(id: number) {
        const sql = 
            "SELECT name, description, type, tier, base_value, " +
            "sell_price, buy_price, craftable, image, created_at, updated_at FROM component WHERE component_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar componente por ID:", error)
            throw new Error("Erro ao buscar componente por ID")
        }
    }
}

export { Component, ComponentDAO }
