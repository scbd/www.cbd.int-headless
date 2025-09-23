export interface Notification {
    id: string,
    notificationCode: string,
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
    createdDate: Date,
    endDate: Date,
    updatedDate: Date,
    actionDate: Date,
    deadlineDate: Date,
    reference: string,
    fulltext: {
        en: string,
        fr?: string,
        es?: string,
        ru?: string,
        zh?: string,
        ar?: string
    },
    from: {
        en: string,
        fr?: string,
        es?: string,
        ru?: string,
        zh?: string,
        ar?: string
    },
    sender: string,
    recipient: string[]
};

export interface NotificationMetadata {
    total: number,
    start: number
};

export type NotificationList = (Notification | NotificationMetadata)[];