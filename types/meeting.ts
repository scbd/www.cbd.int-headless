import type lstring from "api-client/types/lstring";
export interface Meeting {
    id: string,
    meetingCode: string,
    title: lstring,
    url: string[],
    themes: lstring[],
    startOn: Date,
    endOn: Date,
    updatedOn: Date,
    country: lstring,
    city: lstring
};
export interface MeetingList {
    rows: Meeting[],
    total: number
}