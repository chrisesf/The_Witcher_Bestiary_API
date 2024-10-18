import { dbcon } from "../config/db-connect"

class Location {
    newId: string
    name: string
    description: string

    constructor(newId: string, name: string, description: string) {
        this.newId = newId
        this.name = name
        this.description = description
    }
}

class LocationDAO {
    static async locationInsert(location: Location) {
        const sql = "INSERT INTO locations (location_id, name, description) VALUES ($1, $2, $3)";
        const values = [location.newId, location.name, location.description];

        try {
            const result = await dbcon.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir localização:", error);
            throw new Error("Erro ao inserir localização");
        }
    }


    static async locationUpdate(location: Location, id: string) {
        const sql = "UPDATE locations SET name = $1, description = $2  WHERE location_id = $3"
        const values = [location.name, location.description, id];

        try {
            const result = await dbcon.query(sql, values)
            return result
        } catch (error) {
            console.error("Erro ao atualizar localização:", error)
            throw new Error("Erro ao atualizar localização")
        }
    }

    static async locationDelete(id: string) {
        const sql = "DELETE FROM locations WHERE location_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows
        } catch (error) {
            console.error("Erro ao deletar localização:", error)
            throw new Error("Erro ao deletar localização")
        }
    }

    static async locationList() {
        const sql = "SELECT location_id AS id, name AS nome, description AS descrição FROM locations"

        try {
            const result = await dbcon.query(sql)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar localizações:", error)
            throw new Error("Erro ao buscar localizações")
        }
    }

    static async getLocationById(id: string) {
        const sql = "SELECT name AS nome, description AS descrição FROM locations WHERE location_id = $1"

        try {
            const result = await dbcon.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar localização por ID:", error)
            throw new Error("Erro ao buscar localização por ID")
        }
    }
}

export { Location, LocationDAO }
