import { Result } from "../../../core/Result";
import { EventRepository } from "../../repositories/EventRepository ";
import { UpdateEventDto } from "../../../application/dtos/events/UpdateEventDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateEventUseCase {
  constructor(
    @inject("EventRepository")
    private readonly eventRepo: EventRepository
) {}

  public async execute(id: string, updates: UpdateEventDto): Promise<Result<void>> {
    const event = await this.eventRepo.findById(id);
    if (!event) {
      return Result.fail("Event not found.");
    }

    if (updates.title) {
      const result = event.updateTitle(updates.title);
      if (result.isFailure) return Result.fail(result.error!);
    }

    if (updates.description) {
      const result = event.updateDescription(updates.description);
      if (result.isFailure) return Result.fail(result.error!);
    }

    if (updates.date) {
      const result = event.updateDate(updates.date);
      if (result.isFailure) return Result.fail(result.error!);
    }

    if (updates.location) {
      event.updateLocation(updates.location);
    }

    if (updates.maxParticipants) {
      const result = event.updateMaxParticipants(updates.maxParticipants);
      if (result.isFailure) return Result.fail(result.error!);
    }

    if (updates.bannerUrl !== undefined) {
      event.updateBannerUrl(updates.bannerUrl);
    }

    await this.eventRepo.save(event);

    return Result.ok(undefined);
  }
}
