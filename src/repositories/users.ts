import bcrypt from "bcrypt";
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

    const passwordsMatch = await bcrypt.compare(password, user.password);
    return passwordsMatch ? user : null;
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await this.db();
    await db
      .collection<Partial<User>>("users")
      .insertOne({ username, password: hashedPassword, email });
  }
}

const users = new UserRepository();

export default users;
