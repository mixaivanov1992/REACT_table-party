import {
    NewRuleAction, NewRuleState, SetGameName, Version, newRuleActionType,
} from '@models/reducer/newRuleReducer';

const versionIndex = Object.keys(Version);
const version:Version = Version[versionIndex[versionIndex.length - 1] as Version];

const initialState: NewRuleState = {
    gameName: '',
    version,
};

export const newRuleReducer = (state = initialState, action: NewRuleAction): NewRuleState => {
    switch (action.type) {
    case newRuleActionType.SET_GAME_NAME:
        return {
            ...state,
            gameName: action.gameName,
        };
    default:
        return state;
    }
};

export const setGameName = (gameName: string): SetGameName => ({
    type: newRuleActionType.SET_GAME_NAME,
    gameName,
});
