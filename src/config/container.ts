import { container } from "tsyringe";
import { EventRepository } from "../domain/repositories/EventRepository ";
import { InMemoryEventRepository } from "../infra/repositories/events/InMemoryEventRepository";
import { UserRepository } from "../domain/repositories/UserRepository";
import { InMemoryUserRepository } from "../infra/repositories/users/InMemoryUserRepository";

container.registerSingleton<EventRepository>(
  "EventRepository",
  InMemoryEventRepository
);

container.registerSingleton<UserRepository>(
  "UserRepository",
  InMemoryUserRepository
);
