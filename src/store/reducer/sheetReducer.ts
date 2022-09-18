import {
    AddSheet,
    DeleteSheet,
    DeleteSheets,
    SetSheetContent,
    SheetAction,
    SheetActionType,
    SheetOffset,
    SheetState,
} from '@models/store/reducer/sheetReducer';
import { Sheets } from '@models/services/ruleService';

const initialState: SheetState = {
    0: [],
};

export const sheetReducer = (state = initialState, action: SheetAction): SheetState => {
    switch (action.type) {
    case SheetActionType.ADD_SHEETS: {
        const { sheets } = action;
        const newState = { ...state };
        for (const index in sheets) {
            if (Object.hasOwnProperty.call(newState, index)) {
                newState[index].push(...sheets[index]);
            } else {
                newState[index] = sheets[index];
            }
        }
        return newState;
    }
    case SheetActionType.SET_SHEET_CONTENT: {
        const { chapter, uid } = action;
        const sheets = state[chapter].filter((item) => item.uid === uid);
        for (const item of sheets) {
            item.content = action.content;
        }
        return { ...state, sheets };
    }
    case SheetActionType.DELETE_SHEET: {
        const { chapter, uid } = action;
        const newState = { ...state };
        newState[chapter] = newState[chapter].filter((item) => item.uid !== uid);
        return newState;
    }
    case SheetActionType.DELETE_SHEETS: {
        const { chapters } = action;
        const newState = { ...state };
        chapters.forEach((chapter) => {
            delete newState[chapter];
        });
        return newState;
    }
    case SheetActionType.SHEET_OFFSET: {
        const { offset, chapter, index } = action;
        const newState = { ...state };
        const removed = newState[chapter].splice(index, 1);
        newState[chapter].splice(index + offset, 0, ...removed);
        return newState;
    }
    default:
        return state;
    }
};
export const addSheet = (sheets: Sheets): AddSheet => ({
    type: SheetActionType.ADD_SHEETS,
    sheets,
});

export const deleteSheets = (chapters: string[]): DeleteSheets => ({
    type: SheetActionType.DELETE_SHEETS,
    chapters,
});

export const deleteSheet = (chapter: string, uid: string): DeleteSheet => ({
    type: SheetActionType.DELETE_SHEET,
    chapter,
    uid,
});

export const setSheetContent = (chapter: string, uid: string, content: string): SetSheetContent => ({
    type: SheetActionType.SET_SHEET_CONTENT,
    chapter,
    uid,
    content,
});

export const sheetOffset = (offset: number, chapter: string, index: number): SheetOffset => ({
    type: SheetActionType.SHEET_OFFSET,
    offset,
    chapter,
    index,
});
