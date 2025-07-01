import { Result } from "../../core/Result";

export class UserValidator {
  public static validateName(name: string): Result<void, string> {
    if (!name || name.trim().length < 3 || name.trim().length > 100) {
      return Result.fail("Name must be between 3 and 100 characters.");
    }
    return Result.ok(undefined);
  }

  public static validateEmail(email: string): Result<void, string> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return Result.fail("Invalid email format.");
    }
    return Result.ok(undefined);
  }

  public static validatePassword(password: string): Result<void, string> {
    if (!password || password.length < 6 || password.length > 100) {
      return Result.fail("Password must be between 6 and 100 characters.");
    }
    return Result.ok(undefined);
  }

  public static validateRequiredFields(props: Record<string, any>): Result<void, string> {
    const missing = Object.entries(props).filter(([_, v]) => v === undefined || v === null);
    if (missing.length > 0) {
      return Result.fail("All fields are required.");
    }
    return Result.ok(undefined);
  }
}
