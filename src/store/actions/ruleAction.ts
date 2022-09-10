import { API_URL } from '@src/http';
import { ChapterAction } from '@models/store/reducer/chapterReducer';
import { Chapters, Rule, Sheets } from '@models/services/ruleService';
import { DefaultRuleKey, RuleAction } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { PageRoute } from '@models/accessiblePage';
import { RuleResponse } from '@models/services/ruleResponse';
import { RulesResponse } from '@models/services/rulesResponse';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { SheetAction } from '@models/store/reducer/sheetReducer';
import { addChapter } from '@store/reducer/chapterReducer';
import { addRule, setRuleCover, setRuleName } from '@store/reducer/ruleReducer';
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
        await axios.delete<void>(`${API_URL}/rule/${ruleUid}`, {
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

export const actionGetRule = (dispatch:Dispatch<ChapterAction | SheetAction | RuleAction>, ruleUid: string) => async ():Promise<ServerAnswer> => {
    try {
        const response = await axios.get<RuleResponse>(`${API_URL}/rule/${ruleUid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const deleteRuleItems = useDeleteRuleItems(dispatch, ruleUid);
        deleteRuleItems();
        const { rule, chapters, sheets } = response.data;

        dispatch(setRuleName(ruleUid, rule[ruleUid].name));
        dispatch(setRuleCover(ruleUid, rule[ruleUid].cover));
        dispatch(addChapter(chapters));
        dispatch(addSheet(sheets));

        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionGetRules = (dispatch:Dispatch<RuleAction>, limit: number, page: number) => async ():Promise<ServerAnswer> => {
    try {
        const response = await axios.get<RulesResponse>(`${API_URL}/rules/${limit}/${page}`);
        const { rules } = response.data;

        rules.forEach((rule: Rule) => {
            dispatch(addRule(rule));
        });

        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};
