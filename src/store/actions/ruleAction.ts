import { API_URL } from '@src/http';
import { ChapterAction } from '@models/store/reducer/chapterReducer';
import { Chapters, Rule, Sheets } from '@models/services/ruleService';
import { DefaultRuleKey, RuleAction } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { NumberRulesResponse, RulesResponse } from '@models/services/rulesResponse';
import { PageRoute } from '@models/accessiblePage';
import { RuleResponse } from '@models/services/ruleResponse';
import { ServerResponse, ServerResponseNumberRules } from '@models/store/actions/serverResponseAction';
import { SheetAction } from '@models/store/reducer/sheetReducer';
import { addChapter } from '@store/reducer/chapterReducer';
import { addRule, addRules } from '@store/reducer/ruleReducer';
import { addSheet } from '@store/reducer/sheetReducer';
import { saveRule } from '@src/services/ruleService';
import { useDeleteRuleItems } from '@hooks/useDeleteRuleItems';
import axios, { AxiosError } from 'axios';

export const actionSaveRule = (dispatch:Dispatch<ChapterAction | SheetAction | RuleAction>, rule: Rule, chapters: Chapters, sheets: Sheets, history: any) => async ():Promise<ServerResponse> => {
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

export const actionDeleteRule = (ruleUid: string) => async ():Promise<ServerResponse> => {
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

export const actionGetRule = (dispatch:Dispatch<ChapterAction | SheetAction | RuleAction>, ruleUid: string) => async ():Promise<ServerResponse> => {
    try {
        const response = await axios.get<RuleResponse>(`${API_URL}/rule/${ruleUid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const deleteRuleItems = useDeleteRuleItems(dispatch, ruleUid);
        deleteRuleItems();
        const { rule, chapters, sheets } = response.data;

        dispatch(addRule(rule));
        dispatch(addChapter(chapters));
        dispatch(addSheet(sheets));

        return { isSuccess: true, message: '' };
    } catch (error) {
        const { response } = error as AxiosError;
        const message = response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionGetRules = (dispatch:Dispatch<RuleAction>, limit: number, page: number, author: string, name: string) => async ():Promise<ServerResponse> => {
    try {
        let str = '';
        if (author) {
            str += `rules-author/${limit}/${page}/${author}`;
        } else if (name) {
            str += `rules-name/${limit}/${page}/${name}`;
        } else {
            str += `rules/${limit}/${page}`;
        }
        const { data } = await axios.get<RulesResponse>(`${API_URL}/${str}`);
        const { rules } = data;

        dispatch(addRules(rules));
        return { isSuccess: true, message: '' };
    } catch (error) {
        const { response } = error as AxiosError;
        const message = response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionGetNumberRules = async (author: string, name: string) :Promise<ServerResponseNumberRules> => {
    try {
        let str = '';
        if (author) {
            str += `-author/${author}`;
        } else if (name) {
            str += `-name/${name}`;
        }
        const { data } = await axios.get<NumberRulesResponse>(`${API_URL}/number-rules${str}`);
        const { numberRules } = data;

        return { isSuccess: true, message: '', numberRules };
    } catch (error) {
        const { response } = error as AxiosError;
        const message = response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};
