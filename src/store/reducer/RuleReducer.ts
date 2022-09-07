import {
    AddRule, DefaultRuleKey, RemoveRule, RuleAction, RuleActionType, RuleState, SetAuthor, SetRuleCover, SetRuleName,
} from '@models/store/reducer/ruleReducer';
import { Rule, Version } from '@models/services/ruleService';

const versionIndex = Object.keys(Version);
const version:Version = Version[versionIndex[versionIndex.length - 1] as Version];

const initialState: RuleState = {
    [DefaultRuleKey]: {
        author: '',
        name: '',
        cover: '',
        url: '',
        language: navigator.language,
        isPrivate: false,
        rating: 0,
        version,
    },
};

export const RuleReducer = (state = initialState, action: RuleAction): RuleState => {
    switch (action.type) {
    case RuleActionType.SET_RULE_NAME: {
        const { uid, name } = action;
        const newState = { ...state };
        newState[uid].name = name;
        return newState;
    }
    case RuleActionType.SET_RULE_AUTHOR: {
        const { uid, author } = action;
        const newState = { ...state };
        newState[uid].author = author;
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
    case RuleActionType.REMOVE_RULE: {
        const { uid } = action;
        const newState = { ...state };
        delete newState[uid];
        return newState;
    }
    default:
        return state;
    }
};
export const setAuthor = (uid: string, author: string): SetAuthor => ({
    type: RuleActionType.SET_RULE_AUTHOR,
    uid,
    author,
});

export const setRuleName = (uid: string, name: string): SetRuleName => ({
    type: RuleActionType.SET_RULE_NAME,
    uid,
    name,
});
export const setRuleCover = (uid: string, cover: string): SetRuleCover => ({
    type: RuleActionType.SET_RULE_COVER,
    cover,
    uid,
});
export const removeRule = (uid: string): RemoveRule => ({
    type: RuleActionType.REMOVE_RULE,
    uid,
});

export const addRule = (rule: Rule): AddRule => ({
    type: RuleActionType.ADD_RULE,
    rule,
});
