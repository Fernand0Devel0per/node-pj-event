import { injectable, inject } from "tsyringe";
import { EventRepository } from "../../repositories/EventRepository ";
import { EventFactory } from "../../factories/EventFactory";
import { EventProps } from "../../../application/dtos/events/EventProps";
import { Result } from "../../../core/Result";

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject("EventRepository")
    private readonly eventRepo: EventRepository
  ) {}

  public async execute(props: EventProps): Promise<Result<void>> {
    const eventOrError = EventFactory.create(props);
    if (eventOrError.isFailure) {
      return Result.fail(eventOrError.error!);
    }

    const event = eventOrError.value!;
    await this.eventRepo.save(event);

    return Result.ok(undefined);
  }
}
