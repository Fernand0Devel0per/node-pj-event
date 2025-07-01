import { Result } from "../../core/Result";
import { UserRole } from "../value-objects/UserRole";
import { UserValidator } from "../validators/UserValidator";
import bcrypt from "bcrypt";

export class User {
  private readonly _id: string;
  private name: string;
  private email: string;
  private password: string;
  private role: UserRole;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.DEFAULT
  ) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this._id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public async isPasswordValid(plainText: string): Promise<boolean> {
    return bcrypt.compare(plainText, this.password);
  }

  public async updatePassword(newPassword: string): Promise<Result<void>> {
    const result = UserValidator.validatePassword(newPassword);
    if (result.isFailure) return Result.fail(result.error!);

    this.password = await bcrypt.hash(newPassword, 10);
    this.updatedAt = new Date();
    return Result.ok(undefined);
  }

  public updateName(newName: string): Result<void> {
    const result = UserValidator.validateName(newName);
    if (result.isFailure) return Result.fail(result.error!);

    this.name = newName;
    this.updatedAt = new Date();
    return Result.ok(undefined);
  }

  public toObject(): {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
