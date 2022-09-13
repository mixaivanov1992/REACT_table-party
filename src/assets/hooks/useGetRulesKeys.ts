import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { Rule } from '@models/services/ruleService';

export const useGetRulesKeys = (rulesReducer: Rule, author: string, name: string) => Object.keys(rulesReducer).filter((key) => {
    if (DefaultRuleKey === key) {
        return null;
    }
    if (name) {
        if (rulesReducer[key].name.toLowerCase().includes(name.toLowerCase())) {
            return key;
        }
        return null;
    }
    if (author) {
        if (rulesReducer[key].author.includes(author)) {
            return key;
        }
        return null;
    }
    return key;
});
