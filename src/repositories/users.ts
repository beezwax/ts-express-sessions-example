export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

class UserRepository {
  #id: number;
  users: User[];

  constructor() {
    this.#id = 0;
    this.users = [];
  }

  findByCredentials(username: string, password: string): User | null {
    const user = this.findByUsername(username);
    if (user === null) return null;

    return user.password === password ? user : null;
  }

  findByUsername(username: string): User | null {
    return this.users.find((u) => u.username === username) ?? null;
  }

  create(username: string, password: string, email: string): void {
    this.users.push({ id: this.#getId(), username, password, email });
  }

  #getId(): number {
    this.#id += 1;
    return this.#id;
  }
}

const users = new UserRepository();

// create dummy user if needed
if (users.findByUsername("demo") === null) {
  users.create("demo", "demo", "demo@demo.demo");
}

export default users;
