import {
    AddCounter, ChangeCounter, CounterAction, CounterActionType, CounterState, DeleteCounter,
} from '@models/store/reducer/counterReducer';

const initialState: CounterState = {};

export const counterReducer = (state = initialState, action: CounterAction): CounterState => {
    switch (action.type) {
    case CounterActionType.ADD_COUNTER: {
        const {
            groupUid, counterUid, name,
        } = action;
        const newState = { ...state };
        if (!newState[groupUid]) {
            newState[groupUid] = [];
        }
        newState[groupUid].push({
            uid: counterUid,
            name,
            value: 0,
        });
        return newState;
    }
    case CounterActionType.DELETE_COUNTER: {
        const { groupUid, counterUid } = action;
        const newState = { ...state };
        newState[groupUid] = newState[groupUid].filter((item) => item.uid !== counterUid);
        return newState;
    }
    case CounterActionType.CHANGE_COUNTER: {
        const {
            groupUid, counterUid, value,
        } = action;
        const newState = { ...state };
        newState[groupUid] = newState[groupUid].map((item) => {
            if (item.uid === counterUid) {
                return { uid: counterUid, name: item.name, value };
            }
            return item;
        });
        return newState;
    }
    default:
        return state;
    }
};

export const addCounter = (groupUid: string, counterUid: string, name: string): AddCounter => ({
    type: CounterActionType.ADD_COUNTER,
    groupUid,
    counterUid,
    name,
});

export const deleteCounter = (groupUid: string, counterUid: string): DeleteCounter => ({
    type: CounterActionType.DELETE_COUNTER,
    groupUid,
    counterUid,
});

export const changeCounter = (groupUid: string, counterUid: string, value: number): ChangeCounter => ({
    type: CounterActionType.CHANGE_COUNTER,
    groupUid,
    counterUid,
    value,
});
