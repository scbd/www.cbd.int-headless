export interface Statement {
    id: string,
    statementCode: string,
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
    updatedDate: Date,
};

export interface StatementMetadata {
    total: number,
    start: number
};

export type StatementList = (Statement | StatementMetadata)[];