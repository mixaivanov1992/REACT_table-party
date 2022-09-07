import { AxiosResponse } from 'axios';
import { Chapters, Rule, Sheets } from '@models/services/ruleService';
import { RuleResponse } from '@models/services/ruleResponse';
import $api from '@src/http';

export async function saveRule(rule: Rule, chapters: Chapters, sheets: Sheets): Promise<AxiosResponse<RuleResponse>> {
    return $api.post<RuleResponse>('/rule', { rule, chapters, sheets });
}
