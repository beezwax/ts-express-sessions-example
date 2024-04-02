import { MongoRepository } from "@/repositories/mongo";

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
}

class UserRepository extends MongoRepository {
  async findByCredentials(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user === null) return null;

    return user.password === password ? user : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const db = await this.db();
    return await db.collection("users").findOne<User>({ username });
  }

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<void> {
    const db = await this.db();
    await db
      .collection<Partial<User>>("users")
      .insertOne({ username, password, email });
  }
}

const users = new UserRepository();

// create dummy user if needed
// if (users.findByUsername("demo") === null) {
//   users
//     .create("demo", "demo", "demo@demo.demo")
//     .then(() => {
//       console.log("User created");
//     })
//     .catch((err) => {
//       throw err;
//     });
// }

export default users;
