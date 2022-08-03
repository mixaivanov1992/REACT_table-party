import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { deleteChapters } from '@store/reducer/chapterReducer';
import { deleteSheets } from '@store/reducer/sheetReducer';
import { setRuleCover, setRuleName } from '@store/reducer/ruleReducer';
import { store } from '@store/index';
import { useDispatch } from 'react-redux';

export const useDeleteRuleItems = (ruleUid: string) => {
    const dispatch = useDispatch();
    return () => {
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
};
