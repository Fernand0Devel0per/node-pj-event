import { Event } from "../../../domain/entities/Event";
import { EventRepository } from "../../../domain/repositories/EventRepository ";
import { singleton } from "tsyringe";

@singleton()
export class InMemoryEventRepository implements EventRepository {
  private events: Event[] = [];

  async save(event: Event): Promise<void> {
    this.events.push(event);
  }

  async getAll(): Promise<Event[]> {
    return this.events;
  }
}
