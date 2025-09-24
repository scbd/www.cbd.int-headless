import type lstring from "api-client/types/lstring";
export interface Notification {
    id: string,
    notificationCode: string,
    title: lstring,
    url: string[],
    themes: lstring,
    createdDate: Date,
    endDate: Date,
    updatedDate: Date,
    actionDate: Date,
    deadlineDate: Date,
    reference: string,
    fulltext: lstring,
    from: lstring,
    sender: string,
    recipient: lstring,
};

export interface NotificationMetadata {
    total: number,
    start: number
};

export type NotificationList = (Notification | NotificationMetadata)[];