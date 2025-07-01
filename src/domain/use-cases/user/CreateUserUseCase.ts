// src/domain/use-cases/user/CreateUserUseCase.ts
import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import { UserFactory } from "../../factories/UserFactory";
import { CreateUserDto } from "../../../application/dtos/users/CreateUserDto";
import { Result } from "../../../core/Result";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepo: UserRepository
  ) {}

  public async execute(dto: CreateUserDto): Promise<Result<void>> {
    const userOrError = UserFactory.create(dto);
    if (userOrError.isFailure) {
      return Result.fail(userOrError.error!);
    }

    const user = userOrError.value!;
    await this.userRepo.save(user);

    return Result.ok(undefined);
  }
}
