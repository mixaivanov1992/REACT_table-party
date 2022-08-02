import {
    AddSheet,
    DeleteSheet,
    DeleteSheets,
    SetSheetContent,
    SheetAction,
    SheetActionType,
    SheetState,
} from '@models/store/reducer/sheetReducer';
import { Sheets } from '@models/services/ruleService';

const initialState: SheetState = {
    0: [{
        uid: '',
        content: '',
    }],
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
