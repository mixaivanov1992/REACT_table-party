export interface CounterState {
    [group: string]: Array<{
        uid: string,
        name: string,
        value: number
    }>
}
export enum CounterActionType {
    ADD_COUNTER = 'ADD_COUNTER',
    DELETE_COUNTER = 'DELETE_COUNTER',
    CHANGE_COUNTER = 'CHANGE_COUNTER',
}

export interface AddCounter {
    type: CounterActionType.ADD_COUNTER,
    groupUid: string,
    counterUid: string,
    name: string
}

export interface DeleteCounter {
    type: CounterActionType.DELETE_COUNTER,
    groupUid: string,
    counterUid: string
}

export interface ChangeCounter {
    type: CounterActionType.CHANGE_COUNTER,
    groupUid: string,
    counterUid: string,
    value: number
}

export type CounterAction = AddCounter | DeleteCounter | ChangeCounter;
