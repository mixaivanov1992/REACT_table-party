import { Chapters } from '@models/services/ruleService';

export type ChapterState = Chapters;

export enum ChapterActionType{
    ADD_CHAPTERS = 'ADD_CHAPTERS',
    REMOVE_CHAPTER = 'REMOVE_CHAPTER',
    SET_CHAPTER_NAME = 'SET_CHAPTER_NAME',
    SET_CHAPTER_COVER = 'SET_CHAPTER_COVER',
    DELETE_CHAPTERS = 'DELETE_CHAPTERS',
}

export interface SetChapterName{
    type: ChapterActionType.SET_CHAPTER_NAME,
    rule: string,
    uid: string,
    name: string
}

export interface AddChapter{
    type: ChapterActionType.ADD_CHAPTERS,
    chapters: Chapters
}

export interface RemoveChapter{
    type: ChapterActionType.REMOVE_CHAPTER,
    rule: string,
    uid: string
}

export interface DeleteChapters{
    type: ChapterActionType.DELETE_CHAPTERS,
    rule: string,
}

export interface SetChapterCover{
    type: ChapterActionType.SET_CHAPTER_COVER,
    rule: string,
    uid: string,
    cover: string
}

export type ChapterAction = AddChapter | RemoveChapter | SetChapterName | DeleteChapters | SetChapterCover;
