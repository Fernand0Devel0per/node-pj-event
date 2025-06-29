import { Event } from "../entities/Event";

export interface EventRepository {
  save(event: Event): Promise<void>;
  getAll(): Promise<Event[]>;
  findByDateRange(start: Date, end: Date): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  delete(id: string): Promise<void>;
}