import { Sheets } from '@models/services/ruleService';

export type SheetState = Sheets;

export enum SheetActionType{
    SET_SHEET_CONTENT = 'SET_SHEET_CONTENT',
    ADD_SHEETS = 'ADD_SHEETS',
    DELETE_SHEET = 'DELETE_SHEET',
    DELETE_SHEETS = 'DELETE_SHEETS',
    SHEET_OFFSET = 'SHEET_OFFSET'
}

export interface AddSheet{
    type: SheetActionType.ADD_SHEETS,
    sheets: Sheets,
}

export interface DeleteSheets{
    type: SheetActionType.DELETE_SHEETS,
    chapters: string[],
}

export interface DeleteSheet{
    type: SheetActionType.DELETE_SHEET,
    chapter: string,
    uid: string,
}

export interface SetSheetContent{
    type: SheetActionType.SET_SHEET_CONTENT,
    chapter: string,
    uid: string,
    content: string
}

export interface SheetOffset{
    type: SheetActionType.SHEET_OFFSET,
    offset: number,
    chapter: string,
    index: number
}

export type SheetAction = SetSheetContent | AddSheet | DeleteSheet | DeleteSheets | SheetOffset;
