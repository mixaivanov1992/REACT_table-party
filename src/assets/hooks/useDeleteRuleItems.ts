import { ChapterAction } from '@models/store/reducer/chapterReducer';
import { DefaultRuleKey, RuleAction } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { SheetAction } from '@models/store/reducer/sheetReducer';
import { deleteChapters } from '@store/reducer/chapterReducer';
import { deleteSheets } from '@store/reducer/sheetReducer';
import { setRuleCover, setRuleName } from '@store/reducer/ruleReducer';
import { store } from '@store/index';

export const useDeleteRuleItems = (dispatch: Dispatch<ChapterAction | SheetAction | RuleAction>, ruleUid: string) => () => {
    const { chapterReducer } = store.getState();
    if (chapterReducer[ruleUid] !== undefined) {
        const chapters = chapterReducer[ruleUid].map((chapter) => (chapter.uid));
        dispatch(deleteSheets(chapters));
        dispatch(deleteChapters(ruleUid));

        if (DefaultRuleKey === ruleUid) {
            dispatch(setRuleName(ruleUid, ''));
            dispatch(setRuleCover(ruleUid, ''));
        }
    }
};
