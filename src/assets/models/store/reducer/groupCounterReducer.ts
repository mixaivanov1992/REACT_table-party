export interface GroupCounterState {
    [rule: string]: Array<{
        uid: string,
        name: string,
    }>
}
export enum GroupCounterActionType {
    ADD_GROUP = 'ADD_GROUP',
    DELETE_GROUP = 'DELETE_GROUP',
    CHANGE_GROUP = 'CHANGE_GROUP',
}

export interface AddGroup {
    type: GroupCounterActionType.ADD_GROUP,
    ruleUid: string,
    groupUid: string,
    name: string
}

export interface DeleteGroup {
    type: GroupCounterActionType.DELETE_GROUP,
    ruleUid: string,
    groupUid: string,
}

export interface ChangeGroup {
    type: GroupCounterActionType.CHANGE_GROUP,
    ruleUid: string,
    groupUid: string,
    name: string,
}

export type CounterAction = AddGroup | DeleteGroup | ChangeGroup;
