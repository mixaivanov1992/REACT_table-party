export interface Rule{
    [key: string]: RuleData,
}

export interface Chapters{
    [key: string]: ChapterData
}

export interface Sheets{
    [key: string]: SheetData
}
export type RuleData = {
    author: string,
    name: string,
    cover: string,
    language: string,
    isPrivate: boolean,
    rating: number,
    version: Version,
}
export enum Version {
    V0_0_1 = 'V0_0_1'
}

export type SheetData = Array<{uid: string, content: string}>;
export type ChapterData = Array<{uid: string, name: string, cover: string}>
