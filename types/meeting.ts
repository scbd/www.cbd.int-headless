import type lstring from "api-client/types/lstring";
export interface Meeting {
    id: string,
    code: string,
    title: lstring,
    urls: string[],
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
};

export interface MeetingOptions {
    sort?: string,
    limit?: number,
    skip?: number 
};