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

    async findByDateRange(start: Date, end: Date): Promise<Event[]> {
        return this.events.filter(event =>
            event.getDate() >= start && event.getDate() <= end
        );
    }

    async findById(id: string): Promise<Event | null> {
        const event = this.events.find(event => event.toObject().id === id);
        return event ?? null;
    }

    async delete(id: string): Promise<void> {
        this.events = this.events.filter(event => event.toObject().id !== id);
    }
}
