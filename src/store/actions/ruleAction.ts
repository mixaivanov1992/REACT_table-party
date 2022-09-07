import { API_URL } from '@src/http';
import { AuthResponse } from '@models/services/authResponse';
import { ChapterAction } from '@models/store/reducer/chapterReducer';
import { Chapters, Rule, Sheets } from '@models/services/ruleService';
import { DefaultRuleKey, RuleAction } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { PageRoute } from '@models/accessiblePage';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { SheetAction } from '@models/store/reducer/sheetReducer';
import { addChapter } from '@store/reducer/chapterReducer';
import { addRule } from '@store/reducer/ruleReducer';
import { addSheet } from '@store/reducer/sheetReducer';
import { saveRule } from '@src/services/ruleService';
import { useDeleteRuleItems } from '@hooks/useDeleteRuleItems';
import axios, { AxiosError } from 'axios';

export const actionSaveRule = (dispatch:Dispatch<ChapterAction | SheetAction | RuleAction>, rule: Rule, chapters: Chapters, sheets: Sheets, history: any) => async ():Promise<ServerAnswer> => {
    try {
        const response = await saveRule(rule, chapters, sheets);
        const { rule: ruleResult, chapters: chaptersResult, sheets: sheetsResult } = response.data;

        const ruleUid = Object.keys(rule)[0];
        const deleteRuleItems = useDeleteRuleItems(dispatch, ruleUid);
        deleteRuleItems();
        dispatch(addRule(ruleResult));
        dispatch(addChapter(chaptersResult));
        dispatch(addSheet(sheetsResult));

        if (ruleUid === DefaultRuleKey) {
            const baseUrl = PageRoute.ruleEdit.split(':')[0];
            const ruleId = Object.keys(ruleResult)[0];
            history.push(`${baseUrl}${ruleId}`);
        }

        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionDeleteRule = (ruleUid: string) => async ():Promise<ServerAnswer> => {
    try {
        await axios.delete<AuthResponse>(`${API_URL}/rule/${ruleUid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};
