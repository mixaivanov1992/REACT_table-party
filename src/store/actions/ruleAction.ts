import { AxiosError } from 'axios';
import { Chapters, Rule, Sheets } from '@models/services/ruleService';
import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { ReducersActions } from '@models/store/actions/reducersAction';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { addChapter } from '@store/reducer/chapterReducer';
import { addRule } from '@store/reducer/ruleReducer';
import { addSheet } from '@store/reducer/sheetReducer';
import { saveRule } from '@src/services/ruleService';

export async function saveRuleAction<T extends object>(args: T): Promise<ServerAnswer> {
    const {
        dispatch, rule, chapters, sheets,
    } = args as {dispatch:Dispatch<ReducersActions>, rule: Rule, chapters: Chapters, sheets: Sheets};
    try {
        const response = await saveRule(rule, chapters, sheets);
        const { rule: ruleResult, chapters: chaptersResult, sheets: sheetsResult } = response.data;
        if (DefaultRuleKey === Object.keys(rule)[0]) {
            dispatch(addRule(ruleResult));
            dispatch(addChapter(chaptersResult));
            dispatch(addSheet(sheetsResult));
        }
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}
