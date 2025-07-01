// src/infra/repositories/InMemoryUserRepository.ts
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.getEmail() === email);
    return user ?? null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.getId() === id);
    return user || null;
  }
}
