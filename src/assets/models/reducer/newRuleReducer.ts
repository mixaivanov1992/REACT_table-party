export interface NewRuleState {
    uid: string,
    name: string,
    version: Version
}

export enum Version {
    V0_0_1 = 'V0_0_1'
}

export enum newRuleActionType {
    SET_GAME_NAME = 'SET_GAME_NAME',
}

export interface SetGameName {
    type: newRuleActionType.SET_GAME_NAME,
    name: string
}

export type NewRuleAction = SetGameName;
