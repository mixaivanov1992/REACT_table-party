import { AxiosError } from 'axios';
import { Chapters, Rule, Sheets } from '@models/services/ruleService';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { saveRule } from '@src/services/ruleService';

export async function saveRuleAction<T extends object>(args: T): Promise<ServerAnswer> {
    const { rule, chapters, sheets } = args as {rule: Rule, chapters: Chapters, sheets: Sheets};
    try {
        const response = await saveRule(rule, chapters, sheets);
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}
