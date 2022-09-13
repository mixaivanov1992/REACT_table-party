import {
    Chapters, Rule, Sheets,
} from '@models/services/ruleService';
import { store } from '@store/index';

export const usePrepareRuleDataForSave = (ruleUid: string) => () => {
    const { ruleReducer, chapterReducer, sheetReducer } = store.getState();
    const {
        author, name, cover, language, isPrivate, rating, version,
    } = ruleReducer[ruleUid];

    const rule: Rule = {
        [ruleUid]: {
            author,
            name,
            cover,
            language,
            isPrivate,
            rating,
            version,
        },
    };
    const chapters: Chapters = {};
    const sheets: Sheets = {};

    if (chapterReducer[ruleUid] !== undefined) {
        chapters[ruleUid] = chapterReducer[ruleUid].map((chapter) => ({ uid: chapter.uid, name: chapter.name, cover: chapter.cover }));
        chapters[ruleUid].forEach((chapter) => {
            const chapterUid = chapter.uid;
            if (sheetReducer[chapterUid]) {
                sheets[chapterUid] = sheetReducer[chapterUid].map((sheet) => ({ content: sheet.content, uid: sheet.uid }));
            } else {
                sheets[chapterUid] = [];
            }
        });
    }
    return { rule, chapters, sheets };
};
