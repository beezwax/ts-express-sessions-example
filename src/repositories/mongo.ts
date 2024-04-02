import { MongoClient, type Db } from "mongodb";
import invariant from "tiny-invariant";

export class MongoRepository {
  #db: Db | null;

  constructor() {
    this.#db = null;
  }

  async #connect(): Promise<Db> {
    invariant(
      process.env.MONGO_URL,
      "Must define the MONGO_URL environment variable",
    );
    invariant(
      process.env.MONGO_DATABASE,
      "Must define the MONGO_DATABASE environment variable",
    );

    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    return client.db(process.env.MONGO_DATABASE);
  }

  async db(): Promise<Db> {
    if (this.#db === null) {
      this.#db = await this.#connect();
    }

    return this.#db;
  }
}
