// src/domain/validators/EventValidator.ts

import { Result } from "../../core/Result";

export class EventValidator {
  public static validateTitle(title: string): Result<void, string> {
    if (!title || title.length < 3 || title.length > 100) {
      return Result.fail("Title must be between 3 and 100 characters.");
    }
    return Result.ok(undefined);
  }

  public static validateDescription(description: string): Result<void, string> {
    if (!description || description.length < 10 || description.length > 500) {
      return Result.fail("Description must be between 10 and 500 characters.");
    }
    return Result.ok(undefined);
  }

  public static validateDate(date: Date): Result<void, string> {
    if (!date || date.getTime() <= Date.now()) {
      return Result.fail("Date must be in the future.");
    }
    return Result.ok(undefined);
  }

  public static validateMaxParticipants(max: number): Result<void, string> {
    if (!max || max <= 0) {
      return Result.fail("Max participants must be greater than zero.");
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
