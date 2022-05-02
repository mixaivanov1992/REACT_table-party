import {
    ChapterState, ChapterActionType, SetSheetCount, SetChapterName, AddChapter, ChapterAction, /* SetSettingsVisibility, */ RemoveChapter,
} from '@src/assets/interfaces-types/chapterReducer';
import { v4 as uuidv4 } from 'uuid';

const initialState: ChapterState = {
    chapters: [{
        index: '',
        sheetCount: 0,
        name: '',
    }],
};

export const chapterReducer = (state = initialState, action: ChapterAction): ChapterState => {
    switch (action.type) {
    case ChapterActionType.SET_COLUMN_COUNT: {
        const chapters = [...state.chapters];
        chapters.forEach((chapter, index) => {
            if (chapter.index === action.index) {
                chapters[index].sheetCount = action.count;
            }
        });
        return { ...state, chapters };
    }
    case ChapterActionType.ADD_CHAPTER: {
        const chapters = [...state.chapters];
        [...Array(action.count)].forEach(() => {
            chapters.push({
                index: uuidv4(),
                sheetCount: 3,
                name: '',
            });
        });
        return { ...state, chapters };
    }
    case ChapterActionType.REMOVE_CHAPTER: {
        const chapters = state.chapters.filter((chapter) => chapter.index !== action.index);
        return { ...state, chapters };
    }
    case ChapterActionType.SET_CHAPTER_NAME: {
        const chapters = [...state.chapters];
        chapters.forEach((chapter, index) => {
            if (chapter.index === action.index) {
                chapters[index].name = action.name;
            }
        });
        return { ...state, chapters };
    }
    default:
        return state;
    }
};

export const setSheetCount = (index: string, count: number): SetSheetCount => ({
    type: ChapterActionType.SET_COLUMN_COUNT,
    index,
    count,
});

export const setChapterName = (index: string, name: string): SetChapterName => ({
    type: ChapterActionType.SET_CHAPTER_NAME,
    index,
    name,
});

export const addChapter = (count: number): AddChapter => ({
    type: ChapterActionType.ADD_CHAPTER,
    count,
});

export const removeChapter = (index: string): RemoveChapter => ({
    type: ChapterActionType.REMOVE_CHAPTER,
    index,
});
