import {
    AddRule, DefaultRuleKey, RuleAction, RuleActionType, RuleState, SetGameName, SetRuleCover,
} from '@models/store/reducer/ruleReducer';
import { Rule, Version } from '@models/services/ruleService';

const versionIndex = Object.keys(Version);
const version:Version = Version[versionIndex[versionIndex.length - 1] as Version];

const initialState: RuleState = {
    [DefaultRuleKey]: {
        author: '',
        name: '',
        cover: '',
        pageId: 0,
        language: navigator.language,
        isPrivate: false,
        rating: 0,
        version,
    },
};

export const RuleReducer = (state = initialState, action: RuleAction): RuleState => {
    switch (action.type) {
    case RuleActionType.SET_GAME_NAME: {
        const { uid, name } = action;
        const newState = { ...state };
        newState[uid].name = name;
        return newState;
    }
    case RuleActionType.SET_RULE_COVER: {
        const { uid, cover } = action;
        const newState = { ...state };
        newState[uid].cover = cover;

        return newState;
    }
    case RuleActionType.ADD_RULE: {
        const { rule } = action;
        return { ...state, ...rule };
    }
    default:
        return state;
    }
};

export const setGameName = (uid: string, name: string): SetGameName => ({
    type: RuleActionType.SET_GAME_NAME,
    name,
    uid,
});
export const setRuleCover = (uid: string, cover: string): SetRuleCover => ({
    type: RuleActionType.SET_RULE_COVER,
    cover,
    uid,
});

export const addRule = (rule: Rule): AddRule => ({
    type: RuleActionType.ADD_RULE,
    rule,
});
