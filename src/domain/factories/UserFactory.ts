import { UserValidator } from "../validators/UserValidator";
import { Result } from "../../core/Result";
import { User } from "../entities/User";
import { uuidv7 } from "uuidv7";
import { hashSync } from "bcrypt";
import { UserProps } from "../../application/dtos/users/UserProps";

export class UserFactory {
  public static create(props: UserProps): Result<User, string> {
    const checks = [
      UserValidator.validateRequiredFields(props),
      UserValidator.validateName(props.name),
      UserValidator.validateEmail(props.email),
      UserValidator.validatePassword(props.password),
    ];

    for (const check of checks) {
      if (check.isFailure) return Result.fail(check.error!);
    }

    const hashedPassword = hashSync(props.password, 10);

    const user = new User(
      uuidv7(),
      props.name,
      props.email,
      hashedPassword
    );

    return Result.ok(user);
  }
}
