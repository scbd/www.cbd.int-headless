export interface Content {
    title: string,
    bundle: string,
    created: Date,
    changed: Date,
    alias: string,
    lang: "en"|"fr"|"es"|"zh"|"ar",
    body: string,
    summary: string,
}

export interface Article extends Content {
    image: {
        filename: string,
        path: string,
        alt: string,
        title: string,
        width: number,
        height: number
    },
}

export interface Page extends Content {
    menu: string
}