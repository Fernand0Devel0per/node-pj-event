export type EventResponseDto = {
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
};

export type GetEventsResponseDto = EventResponseDto[];

