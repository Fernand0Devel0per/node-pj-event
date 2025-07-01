// src/infra/http/controllers/UserController.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../../../domain/use-cases/user/CreateUserUseCase";
import { CreateUserSchema } from "../../../application/dtos/users/CreateUserDto";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class UserController {
  public static async create(req: Request, res: Response): Promise<void> {
    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: result.error.flatten() });
      return;
    }

    const useCase = container.resolve(CreateUserUseCase);
    const execution = await useCase.execute(result.data);

    if (execution.isFailure) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: execution.error });
      return;
    }

    res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
  }
}
