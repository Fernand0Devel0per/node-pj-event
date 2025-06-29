import { container } from "tsyringe";
import { EventRepository } from "../domain/repositories/EventRepository ";
import { InMemoryEventRepository } from "../infra/repositories/events/InMemoryEventRepository";

container.registerSingleton<EventRepository>(
  "EventRepository",
  InMemoryEventRepository
);
