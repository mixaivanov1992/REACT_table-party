import {
    AddChapter,
    ChapterAction,
    ChapterActionType,
    ChapterOffset,
    ChapterState,
    DeleteChapters,
    RemoveChapter,
    SetChapterCover,
    SetChapterName,
} from '@models/store/reducer/chapterReducer';
import { Chapters } from '@models/services/ruleService';
import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';

const initialState: ChapterState = {
    [DefaultRuleKey]: [],
};

export const chapterReducer = (state = initialState, action: ChapterAction): ChapterState => {
    switch (action.type) {
    case ChapterActionType.ADD_CHAPTERS: {
        const { chapters } = action;
        const newState = { ...state };
        for (const index in chapters) {
            if (Object.hasOwnProperty.call(newState, index)) {
                newState[index].push(...chapters[index]);
            } else {
                newState[index] = chapters[index];
            }
        }
        return newState;
    }
    case ChapterActionType.REMOVE_CHAPTER: {
        const { rule, uid } = action;
        const newState = { ...state };
        newState[rule] = newState[rule].filter((chapter) => chapter.uid !== uid);
        return newState;
    }
    case ChapterActionType.SET_CHAPTER_NAME: {
        const { rule, uid, name } = action;
        const chapters = [...state[rule]];

        for (const index in chapters) {
            if (chapters[index].uid === uid) {
                chapters[index].name = name;
                break;
            }
        }
        return { ...state, chapters };
    }
    case ChapterActionType.SET_CHAPTER_COVER: {
        const { rule, uid, cover } = action;
        const chapters = [...state[rule]];

        for (const index in chapters) {
            if (chapters[index].uid === uid) {
                chapters[index].cover = cover;
                break;
            }
        }
        return { ...state, chapters };
    }
    case ChapterActionType.DELETE_CHAPTERS: {
        const { rule } = action;
        const newState = { ...state };
        delete newState[rule];
        return newState;
    }
    case ChapterActionType.CHAPTER_OFFSET: {
        const { offset, rule, index } = action;
        const newState = { ...state };
        const removed = newState[rule].splice(index, 1);
        newState[rule].splice(index + offset, 0, ...removed);
        return newState;
    }
    default:
        return state;
    }
};

export const setChapterName = (rule: string, uid: string, name: string): SetChapterName => ({
    type: ChapterActionType.SET_CHAPTER_NAME,
    rule,
    uid,
    name,
});

export const addChapter = (chapters: Chapters): AddChapter => ({
    type: ChapterActionType.ADD_CHAPTERS,
    chapters,
});

export const removeChapter = (rule: string, uid: string): RemoveChapter => ({
    type: ChapterActionType.REMOVE_CHAPTER,
    rule,
    uid,
});

export const deleteChapters = (rule: string): DeleteChapters => ({
    type: ChapterActionType.DELETE_CHAPTERS,
    rule,
});

export const setChapterCover = (rule: string, uid: string, cover: string): SetChapterCover => ({
    type: ChapterActionType.SET_CHAPTER_COVER,
    rule,
    uid,
    cover,
});

export const chapterOffset = (offset: number, rule: string, index: number): ChapterOffset => ({
    type: ChapterActionType.CHAPTER_OFFSET,
    offset,
    rule,
    index,
});
