import { Result } from "../../core/Result";
import { EventValidator } from "../validators/EventValidator";

export class Event {
    private readonly _id: string;
    private title: string;
    private description: string;
    private date: Date;
    private location: string;
    private maxParticipants: number;
    private creatorId: string;
    private bannerUrl?: string;
    private readonly createdAt: Date;
    private updatedAt: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        date: Date,
        location: string,
        maxParticipants: number,
        creatorId: string,
        bannerUrl?: string
    ) {
        this._id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.creatorId = creatorId;
        this.bannerUrl = bannerUrl;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public toObject(): {
        id: string;
        title: string;
        description: string;
        date: Date;
        location: string;
        maxParticipants: number;
        creatorId: string;
        bannerUrl?: string;
        createdAt: Date;
        updatedAt: Date;
    } {
        return {
            id: this._id,
            title: this.title,
            description: this.description,
            date: this.date,
            location: this.location,
            maxParticipants: this.maxParticipants,
            creatorId: this.creatorId,
            bannerUrl: this.bannerUrl,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public getDate(): Date {
        return this.date;
    }
    public isFull(currentParticipants: number): boolean {
        return currentParticipants >= this.maxParticipants;
    }

    public updateTitle(newTitle: string): Result<void> {
        const result = EventValidator.validateTitle(newTitle);
        if (result.isFailure) return Result.fail(result.error!);

        this.title = newTitle;
        this.updatedAt = new Date();
        return Result.ok(undefined);
    }

    public updateDescription(newDescription: string): Result<void> {
        const result = EventValidator.validateDescription(newDescription);
        if (result.isFailure) return Result.fail(result.error!);

        this.description = newDescription;
        this.updatedAt = new Date();
        return Result.ok(undefined);
    }

    public updateDate(newDate: Date): Result<void> {
        const result = EventValidator.validateDate(newDate);
        if (result.isFailure) return Result.fail(result.error!);

        this.date = newDate;
        this.updatedAt = new Date();
        return Result.ok(undefined);
    }

    public updateLocation(newLocation: string): Result<void> {
        const result = EventValidator.validateLocation(newLocation);
        if (result.isFailure) return Result.fail(result.error!);

        this.location = newLocation;
        this.updatedAt = new Date();
        return Result.ok(undefined);
    }

    public updateMaxParticipants(newMax: number): Result<void> {
        const result = EventValidator.validateNewMaxParticipants(newMax, this.maxParticipants);
        if (result.isFailure) return Result.fail(result.error!);

        this.maxParticipants = newMax;
        this.updatedAt = new Date();
        return Result.ok(undefined);
    }

    public updateBannerUrl(newUrl?: string): Result<void> {
        this.bannerUrl = newUrl;
        this.updatedAt = new Date();
        return Result.ok(undefined);
    }

}
