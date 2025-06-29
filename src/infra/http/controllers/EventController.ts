import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CreateEventUseCase } from "../../../domain/use-cases/event/CreateEventUseCase";
import { CreateEventSchema } from "../../../application/dtos/events/CreateEventDto";
import { GetEventsByDateRangeSchema } from "../../../application/dtos/events/GetEventsByDateRangeDto";
import { GetEventsByDateRangeUseCase } from "../../../domain/use-cases/event/GetEventsByDateUseCase";
import { DeleteEventSchema } from "../../../application/dtos/events/DeleteEventDto";
import { DeleteEventUseCase } from "../../../domain/use-cases/event/DeleteEventUseCase";

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

export async function getEventsByDateRangeHandler(req: Request, res: Response): Promise<void> {
  const result = GetEventsByDateRangeSchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({ errors: result.error.flatten() });
    return;
  }

  const { start, end } = result.data;
  const useCase = container.resolve(GetEventsByDateRangeUseCase);
  const execution = await useCase.execute(start, end);

  if (execution.isFailure) {
    res.status(400).json({ error: execution.error });
    return;
  }

  const events = execution.value ?? [];
  const response = events.map(event => event.toObject());
  res.status(200).json(response);
}

export async function deleteEventHandler(req: Request, res: Response): Promise<void> {
  const result = DeleteEventSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({ errors: result.error.flatten() });
    return;
  }

  const { id } = result.data;
  const useCase = container.resolve(DeleteEventUseCase);
  const execution = await useCase.execute(id);

  if (execution.isFailure) {
    res.status(404).json({ error: execution.error });
    return;
  }

  res.status(204).send();
}
