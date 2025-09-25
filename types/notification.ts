import type lstring from "api-client/types/lstring";
export interface Notification {
    id: string,
    notificationCode: string,
    title: lstring,
    url: string[],
    themes: lstring[],
    createdOn: Date,
    endOn: Date,
    updatedOn: Date,
    actionOn: Date,
    deadlineOn: Date,
    reference: string,
    fulltext: lstring,
    from: lstring,
    sender: string,
    recipient: string[],
};

export interface NotificationList {
    rows: Notification[],
    total: number
};