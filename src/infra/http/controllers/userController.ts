import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { CreateUserSchema } from "../../../application/dtos/users/CreateUserDto";
import { CreateUserUseCase } from "../../../domain/use-cases/user/CreateUserUseCase";
import { UpdateUserRoleUseCase } from "../../../domain/use-cases/user/UpdateUserRoleUseCase";
import { EventIdParamSchema } from "../../../application/dtos/events/EventIdDto";
import { UpdateUserRoleSchema } from "../../../application/dtos/users/UpdateUserRoleDto";
import { ChangeUserPasswordUseCase } from "../../../domain/use-cases/user/ChangeUserPasswordUseCase";
import { ChangePasswordSchema } from "../../../application/dtos/users/ChangePasswordDto";

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

export async function updateUserRoleHandler(req: Request, res: Response): Promise<void> {
  const paramResult = EventIdParamSchema.safeParse(req.params);
  const bodyResult = UpdateUserRoleSchema.safeParse(req.body);

  if (!paramResult.success || !bodyResult.success) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        ...(paramResult.error && paramResult.error.flatten()),
        ...(bodyResult.error && bodyResult.error.flatten()),
      },
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  const { id } = paramResult.data;
  const { role } = bodyResult.data;

  const useCase = container.resolve(UpdateUserRoleUseCase);
  const result = await useCase.execute(id, role);

  if (result.isFailure) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: result.error });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send();
}

export async function changeUserPasswordHandler(req: Request, res: Response): Promise<void> {
  const result = ChangePasswordSchema.safeParse(req.body);

  if (!result.success) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: result.error.flatten(),
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  const { email, currentPassword, newPassword } = result.data;

  const useCase = container.resolve(ChangeUserPasswordUseCase);
  const execution = await useCase.execute(email, currentPassword, newPassword);

  if (execution.isFailure) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: execution.error,
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send();
}
