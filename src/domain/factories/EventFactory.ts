import { EventValidator } from "../validators/EventValidator";
import { Result } from "../../core/Result";
import { uuidv7 } from "uuidv7";
import { Event } from "../entities/Event";
import { EventProps } from "../../application/dtos/events/EventProps";

export class EventFactory {
  public static create(props: EventProps): Result<Event, string> {
    const checks = [
      EventValidator.validateRequiredFields(props),
      EventValidator.validateTitle(props.title),
      EventValidator.validateDescription(props.description),
      EventValidator.validateDate(props.date),
      EventValidator.validateMaxParticipants(props.maxParticipants),
    ];

    for (const check of checks) {
      if (check.isFailure) return Result.fail(check.error!);
    }

    const event = new Event(
      uuidv7(),
      props.title,
      props.description,
      props.date,
      props.location,
      props.maxParticipants,
      props.creatorId,
      props.bannerUrl
    );

    return Result.ok(event);
  }
}
