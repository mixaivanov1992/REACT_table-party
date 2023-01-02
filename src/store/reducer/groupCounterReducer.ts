import {
    AddGroup, ChangeGroup, CounterAction, DeleteGroup, GroupCounterActionType, GroupCounterState,
} from '@models/store/reducer/groupCounterReducer';

const initialState: GroupCounterState = {};

export const groupCounterReducer = (state = initialState, action: CounterAction): GroupCounterState => {
    switch (action.type) {
    case GroupCounterActionType.ADD_GROUP: {
        const { ruleUid, groupUid, name } = action;
        const newState = { ...state };
        if (!newState[ruleUid]) {
            newState[ruleUid] = [];
        }
        newState[ruleUid].push({
            uid: groupUid,
            name,
        });
        return newState;
    }
    case GroupCounterActionType.DELETE_GROUP: {
        const { ruleUid, groupUid } = action;
        const newState = { ...state };
        newState[ruleUid] = newState[ruleUid].filter((item) => item.uid !== groupUid);
        return newState;
    }
    case GroupCounterActionType.CHANGE_GROUP: {
        const {
            ruleUid, groupUid, name,
        } = action;
        const newState = { ...state };
        newState[ruleUid] = newState[ruleUid].map((item) => {
            if (item.uid === groupUid) {
                return { uid: groupUid, name };
            }
            return item;
        });
        return newState;
    }
    default:
        return state;
    }
};

export const addGroup = (ruleUid: string, groupUid: string, name: string): AddGroup => ({
    type: GroupCounterActionType.ADD_GROUP,
    ruleUid,
    groupUid,
    name,
});

export const deleteGroup = (ruleUid: string, groupUid: string): DeleteGroup => ({
    type: GroupCounterActionType.DELETE_GROUP,
    ruleUid,
    groupUid,
});

export const changeGroup = (ruleUid: string, groupUid: string, name: string): ChangeGroup => ({
    type: GroupCounterActionType.CHANGE_GROUP,
    ruleUid,
    groupUid,
    name,
});
