import { inject, injectable } from "tsyringe";
import { Result } from "../../../core/Result";
import { UserRepository } from "../../repositories/UserRepository";
import { UserValidator } from "../../validators/UserValidator";

@injectable()
export class UpdateUserRoleUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  public async execute(id: string, newRole: string): Promise<Result<void>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return Result.fail("User not found.");
    }

    const validation = UserValidator.validateRole(newRole);
    if (validation.isFailure) {
      return Result.fail(validation.error!);
    }

    const updateResult = user.updateRole(newRole);
    if (updateResult.isFailure) {
      return Result.fail(updateResult.error!);
    }

    await this.userRepository.save(user);
    return Result.ok(undefined);
  }
}
