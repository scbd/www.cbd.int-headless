import type { ELstring } from "../types/schemas/base/ELstring";
export interface Meeting {
    id: string,
    meetingCode: string,
    title: ELstring[],
    url: string[],
    themes: ELstring[],
    startDate: Date,
    endDate: Date,
    updatedDate: Date,
    country: ELstring[],
    city: ELstring[]
};

export interface MeetingMetadata {
    total: number,
    start: number
};

export type MeetingList = (Meeting | MeetingMetadata)[];