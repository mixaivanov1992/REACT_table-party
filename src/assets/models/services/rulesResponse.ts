import { Rule } from '@models/services/ruleService';

export interface RulesResponse{
    numberRecords: number,
    rules: Array<Rule>
}
