import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { CreateUserSchema } from "../../../application/dtos/users/CreateUserDto";
import { CreateUserUseCase } from "../../../domain/use-cases/user/CreateUserUseCase";

export async function createUserHandler(req: Request, res: Response): Promise<void> {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: result.error.flatten(),
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  const useCase = container.resolve(CreateUserUseCase);
  const execution = await useCase.execute(result.data);

  if (execution.isFailure) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: execution.error,
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  res.status(StatusCodes.CREATED).json({
    message: ReasonPhrases.CREATED,
  });
}
