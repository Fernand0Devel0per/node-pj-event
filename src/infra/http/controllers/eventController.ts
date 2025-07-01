import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { CreateEventUseCase } from "../../../domain/use-cases/event/CreateEventUseCase";
import { CreateEventSchema } from "../../../application/dtos/events/CreateEventDto";
import { GetEventsByDateRangeSchema } from "../../../application/dtos/events/GetEventsByDateRangeDto";
import { GetEventsByDateRangeUseCase } from "../../../domain/use-cases/event/GetEventsByDateUseCase";
import { DeleteEventUseCase } from "../../../domain/use-cases/event/DeleteEventUseCase";
import { EventIdParamSchema } from "../../../application/dtos/events/EventIdDto";
import { UpdateEventSchema } from "../../../application/dtos/events/UpdateEventDto";
import { UpdateEventUseCase } from "../../../domain/use-cases/event/UpdateEventUseCase";


export async function createEventHandler(req: Request, res: Response): Promise<void> {
    const result = CreateEventSchema.safeParse(req.body);

    if (!result.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: result.error.flatten(),
            message: ReasonPhrases.BAD_REQUEST,
        });
        return;
    }

    const useCase = container.resolve(CreateEventUseCase);
    const execution = await useCase.execute(result.data);

    if (execution.isFailure) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: execution.error,
            message: ReasonPhrases.BAD_REQUEST,
        });
        return;
    }

    res.status(StatusCodes.CREATED).json({
        message: "Event created with success",
    });
}

export async function getEventsByDateRangeHandler(req: Request, res: Response): Promise<void> {
    const result = GetEventsByDateRangeSchema.safeParse(req.query);

    if (!result.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: result.error.flatten(),
            message: ReasonPhrases.BAD_REQUEST,
        });
        return;
    }

    const { start, end } = result.data;
    const useCase = container.resolve(GetEventsByDateRangeUseCase);
    const execution = await useCase.execute(start, end);

    if (execution.isFailure) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: execution.error,
            message: ReasonPhrases.BAD_REQUEST,
        });
        return;
    }

    const events = execution.value ?? [];
    const response = events.map(event => event.toObject());

    res.status(StatusCodes.OK).json(response);
}

export async function deleteEventHandler(req: Request, res: Response): Promise<void> {
  const result = EventIdParamSchema.safeParse(req.params);

  if (!result.success) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: result.error.flatten(),
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  const { id } = result.data;
  const useCase = container.resolve(DeleteEventUseCase);
  const execution = await useCase.execute(id);

  if (execution.isFailure) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: execution.error,
      message: ReasonPhrases.NOT_FOUND,
    });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send();
}

export async function updateEventHandler(req: Request, res: Response): Promise<void> {
  const result = EventIdParamSchema.safeParse(req.params);
  const bodyResult = UpdateEventSchema.safeParse(req.body);

  if (!result.success || !bodyResult.success) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        ...(result.error && result.error.flatten()),
        ...(bodyResult.error && bodyResult.error.flatten()),
      },
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  const { id } = result.data;
  const updates = bodyResult.data;

  const useCase = container.resolve(UpdateEventUseCase);
  const execution = await useCase.execute(id, updates);

  if (execution.isFailure) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: execution.error,
      message: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send();
}
