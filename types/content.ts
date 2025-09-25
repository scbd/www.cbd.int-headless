export interface Content {
    title: string,
    bundle: string,
    createdOn: Date,
    changedOn: Date,
    alias: string,
    lang: "en"|"fr"|"es"|"zh"|"ar",
    body: string,
    summary: string,
}

export interface Article extends Content {
    coverImage: {
        path: string,
        alt: string,
        width: number,
        height: number
    },
}

export interface Page extends Content {
    menu: string
}