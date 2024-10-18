import { dbcon } from "../config/db-connect"

class Category {
  newID: string
  name: string
  description: string

  constructor(newID: string, name: string, description: string) {
    this.newID = newID
    this.name = name
    this.description = description
  }
}

class CategoryDAO {
  static async categoryInsert(category: Category) {
    const sql = "INSERT INTO categories (category_id, name, description) VALUES ($1, $2, $3)";
    const values = [category.newID, category.name, category.description];

    try {
      const result = await dbcon.query(sql, values);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao inserir categoria:", error);
      throw new Error("Erro ao inserir categoria");
    }
  }


  static async categoryUpdate(category: Category, id: string) {
    const sql = "UPDATE categories SET category_id = $1, name = $2, description = $3 WHERE category_id = $4"
    const values = [category.newID, category.name, category.description, id]

    try {
      const result = await dbcon.query(sql, values)
      return result
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      throw new Error("Erro ao atualizar categoria")
    }
  }

  static async categoryDelete(id: string) {
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
    const sql = "SELECT category_id AS id, name AS nome, description AS descrição FROM categories"

    try {
      const result = await dbcon.query(sql)
      return result.rows
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      throw new Error("Erro ao buscar categorias")
    }
  }

  static async getCategoryById(id: string) {
    const sql = "SELECT name AS nome, description AS descrição FROM categories WHERE category_id = $1"

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
