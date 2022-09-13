import { Rule } from '@models/services/ruleService';

export interface RulesResponse{
    rules: Array<Rule>
}

export interface NumberRulesResponse{
    numberRules: number,
}
