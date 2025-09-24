import type { ELstring } from "../types/schemas/base/ELstring";
export interface Notification {
    id: string,
    notificationCode: string,
    title: ELstring[],
    url: string[],
    themes: ELstring[],
    createdDate: Date,
    endDate: Date,
    updatedDate: Date,
    actionDate: Date,
    deadlineDate: Date,
    reference: string,
    fulltext: ELstring[],
    from: ELstring[],
    sender: string,
    recipient: ELstring[],
};

export interface NotificationMetadata {
    total: number,
    start: number
};

export type NotificationList = (Notification | NotificationMetadata)[];