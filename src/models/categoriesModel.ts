import { dbcon } from "../config/db-connect"

class Category {
  name: string
  description: string

  constructor(name: string, description: string) {
    this.name = name
    this.description = description
  }
}

class CategoryDAO {
  static async categoryInsert(category: Category) {
    const sql =
      "INSERT INTO categories (name, description) VALUES ($1, $2)"
    const values = [category.name, category.description]

    try {
      const result = await dbcon.query(sql, values)
      return result.rows[0]
    } catch (error) {
      console.error("Erro ao inserir categoria:", error)
      throw new Error("Erro ao inserir categoria")
    }
  }

  static async categoryUpdate(category: Category, id: number) {
    const sql =
      "UPDATE categories SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE category_id = $3"
    const values = [category.name, category.description, id]

    try {
      const result = await dbcon.query(sql, values)
      return result.rows[0]
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      throw new Error("Erro ao atualizar categoria")
    }
  }

  static async categoryDelete(id: number) {
    const sql = "DELETE FROM categories WHERE category_id = $1"

    try {
      const result = await dbcon.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      console.error("Erro ao deletar categoria:", error)
      throw new Error("Erro ao deletar categoria")
    }
  }

  static async categoryList() {
    const sql = "SELECT name AS Nome, description AS Descrição FROM categories"

    try {
      const result = await dbcon.query(sql)
      return result.rows
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      throw new Error("Erro ao buscar categorias")
    }
  }

  static async getCategoryById(id: number) {
    const sql =
      "SELECT name AS Nome, description AS Descrição FROM categories WHERE category_id = $1"

    try {
      const result = await dbcon.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      console.error("Erro ao buscar categoria por ID:", error)
      throw new Error("Erro ao buscar categoria por ID")
    }
  }
}

export { Category, CategoryDAO }
