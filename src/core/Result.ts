export class Result<T, E = string> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly value?: T;
  public readonly error?: E;

  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.value = value;
    this.error = error;

    Object.freeze(this);
  }

  public static ok<T>(value: T): Result<T> {
    return new Result(true, value);
  }

  public static fail<T = never, E = string>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }
}
