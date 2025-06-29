import { Event } from "../entities/Event";

export interface EventRepository {
  save(event: Event): Promise<void>;
  getAll(): Promise<Event[]>;
}