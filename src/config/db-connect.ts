import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const dbcon = new pg.Client({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: false,
})

const connectDB = () => {
  dbcon.connect((err) => {
    if (err) {
      console.error("Não foi possível conectar ao banco:", err)
    } else {
      console.log("Banco conectado com sucesso.")
    }
  })
}

export { dbcon, connectDB }
