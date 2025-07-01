import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import { Result } from "../../../core/Result";

@injectable()
export class ChangeUserPasswordUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  public async execute(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<Result<void>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return Result.fail("User not found.");
    }

    const isValid = await user.isPasswordValid(currentPassword);
    if (!isValid) {
      return Result.fail("Current password is incorrect.");
    }

    const result = await user.updatePassword(newPassword);
    if (result.isFailure) {
      return Result.fail(result.error!);
    }

    await this.userRepository.save(user);
    return Result.ok(undefined);
  }
}
