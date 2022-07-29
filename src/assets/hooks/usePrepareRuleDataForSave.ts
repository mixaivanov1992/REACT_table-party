import { Version } from '@models/services/ruleService';
import { store } from '@store/index';

export const usePrepareRuleDataForSave = (ruleUid: string, username: string, gameName: string) => () => {
    const { chapterReducer, sheetReducer } = store.getState();
    const version:Version = Version[Version[Object.keys(Version).length - 1]];

    const rule = {
        uid: ruleUid,
        username,
        name: gameName,
        language: navigator.language,
        isPrivate: false,
        rating: 0,
        version,
    };
    const chapters = {
        [ruleUid]: chapterReducer[ruleUid].map((chapter) => ({ uid: chapter.uid, name: chapter.name })),
    };
    const sheets = {};
    chapters[ruleUid].forEach((chapter) => {
        const chapterUid = chapter.uid;
        if (sheetReducer[chapterUid]) {
            sheets[chapterUid] = sheetReducer[chapterUid].map((sheet) => ({ content: sheet.content, cover: sheet.cover }));
        } else {
            sheets[chapterUid] = [];
        }
    });
    return { rule, chapters, sheets };
};
