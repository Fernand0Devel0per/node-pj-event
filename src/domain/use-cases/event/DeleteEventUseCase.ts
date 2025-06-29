import { inject, injectable } from "tsyringe";
import { Result } from "../../../core/Result";
import { EventRepository } from "../../repositories/EventRepository ";

@injectable()
export class DeleteEventUseCase {
  constructor(
    @inject("EventRepository")
    private readonly eventRepo: EventRepository) {}

  public async execute(id: string): Promise<Result<void>> {
    const event = await this.eventRepo.findById(id);
    if (!event) {
      return Result.fail("Evento não encontrado.");
    }

    await this.eventRepo.delete(id);
    return Result.ok(undefined);
  }
}
