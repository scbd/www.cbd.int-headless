import type lstring from "api-client/types/lstring";
export interface Statement {
    id: string,
    statementCode: string,
    title: lstring,
    url: string[],
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
}