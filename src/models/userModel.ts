import { dbcon } from '../config/db-connect';

class User {
    userId: string;
    name: string;
    age: number;

    constructor(userId: string, name: string, age: number) {
        this.userId = userId;
        this.name = name;
        this.age = age;
    }
}

class UserDAO {
    static async userInsert(user: User) {
        const sql = 'INSERT INTO users (userId, name, age) VALUES ($1, $2, $3);';
        const values = [user.userId, user.name, user.age];

        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log({ error });
        }
    }

    static async userList() {
        const sql = 'SELECT * FROM users';

        try {
            const result = await dbcon.query(sql);
            return result.rows;
        } catch (error) {
            console.log({ error });
        }
    }
}

export { User, UserDAO };
