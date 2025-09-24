import type lstring from "api-client/types/lstring";
export interface Statement {
    id: string,
    statementCode: string,
    title: lstring,
    url: string[],
    themes: lstring,
    createdDate: Date,
    updatedDate: Date,
};
export interface StatementMetadata {
    total: number,
    start: number
};

export type StatementList = (Statement | StatementMetadata)[];