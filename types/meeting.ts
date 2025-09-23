export interface Meeting {
    id: string,
    meetingCode: string,
    title: {
        en: string,
        fr?: string,
        es?: string,
        ru?: string,
        zh?: string,
        ar?: string
    },
    url: string[],
    themes: {
        en: string[],
        fr?: string[],
        es?: string[],
        ru?: string[],
        zh?: string[],
        ar?: string[]
    },
    startDate: Date,
    endDate: Date,
    updatedDate: Date,
    country: {
        en: string,
        fr?: string,
        es?: string,
        ru?: string,
        zh?: string,
        ar?: string
    },
    city: {
        en: string,
        fr?: string,
        es?: string,
        ru?: string,
        zh?: string,
        ar?: string
    }
};

export interface MeetingMetadata {
    total: number,
    start: number
};

export type MeetingList = (Meeting | MeetingMetadata)[];