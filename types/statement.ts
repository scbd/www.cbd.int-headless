import type { ELstring } from "../types/schemas/base/ELstring";
export interface Statement {
    id: string,
    statementCode: string,
    title: ELstring[],
    url: string[],
    themes: ELstring[],
    createdDate: Date,
    updatedDate: Date,
};

export interface StatementMetadata {
    total: number,
    start: number
};

export type StatementList = (Statement | StatementMetadata)[];