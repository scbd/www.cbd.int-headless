import type lstring from "api-client/types/lstring";
export interface Meeting {
    id: string,
    meetingCode: string,
    title: lstring,
    url: string[],
    themes: lstring,
    startDate: Date,
    endDate: Date,
    updatedDate: Date,
    country: lstring,
    city: lstring
};
export interface MeetingMetadata {
    total: number,
    start: number
};

export type MeetingList = (Meeting | MeetingMetadata)[];