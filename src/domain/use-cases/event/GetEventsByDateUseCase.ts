import { Result } from "../../../core/Result";
import { EventRepository } from "../../repositories/EventRepository ";
import { Event } from "../../entities/Event";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetEventsByDateRangeUseCase {
  constructor(
    @inject("EventRepository")
        private readonly eventRepo: EventRepository
    ) {}

  public async execute(start: Date, end: Date): Promise<Result<Event[]>> {
    
    if (start > end) {
      return Result.fail("Start date must be earlier than or equal to end date.");
    }

    const events = await this.eventRepo.findByDateRange(start, end);
    return Result.ok(events);
  }
}
