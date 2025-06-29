import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CreateEventUseCase } from "../../../domain/use-cases/event/CreateEventUseCase";
import { CreateEventSchema } from "../../../application/dtos/events/CreateEventDto";

export const createEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const result = CreateEventSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error.flatten() });
    return;
  }

  const useCase = container.resolve(CreateEventUseCase);
  const execution = await useCase.execute(result.data);

  if (execution.isFailure) {
    res.status(400).json({ error: execution.error });
    return;
  }

  res.status(201).json({ message: "Evento criado com sucesso" });
};
