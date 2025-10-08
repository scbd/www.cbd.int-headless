import type lstring from "api-client/types/lstring";
export interface Statement {
    id: string,
    code: string,
    title: lstring,
    urls: string[],
    themes: lstring[],
    createdOn: Date,
    updatedOn: Date,
};
export interface StatementMetadata {
    total: number
};
export interface StatementList {
    rows: Statement[],
    total: number
};

export interface StatementOptions {
    sort?: string,
    limit?: number,
    skip?: number 
};