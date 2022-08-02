import { AccessiblePages } from '@models/accessiblePage';
import { GuestPages } from '@store/defaultParameters/pages/guestPages';
import { InitialPages } from '@store/defaultParameters/pages/initialPages';
import {
    PersonalDataAction, PersonalDataActionType, PersonalDataState, Roles, SetPersonalData, UserData,
} from '@models/store/reducer/personalDataReducer';
import { UserPage } from '@store/defaultParameters/pages/userPages';

const initialState: PersonalDataState = {
    isAuthorized: false,
    username: '',
    email: '',
    avatar: '',
    favorites: [],
    libraryOwner: [],
    role: Roles.GUEST,
    accessiblePages: [...InitialPages, ...GuestPages].sort((a, b) => a.sort - b.sort),
};

export const personalDataReducer = (state = initialState, action: PersonalDataAction): PersonalDataState => {
    switch (action.type) {
    case PersonalDataActionType.SET_PERSONAL_DATA: {
        if (action.userData) {
            const { isAuthorized, userData } = action;

            if (isAuthorized) {
                const {
                    username, avatar, email, role,
                } = userData;
                const accessiblePages: AccessiblePages = [...InitialPages, ...UserPage].sort((a, b) => a.sort - b.sort);
                return {
                    ...state,
                    isAuthorized,
                    username,
                    email,
                    avatar,
                    favorites: [],
                    libraryOwner: [],
                    role: Roles[role.toUpperCase()],
                    accessiblePages,
                };
            }
        }
        return initialState;
    }
    default:
        return state;
    }
};

export const setPersonalData = (isAuthorized: boolean, userData?: UserData): SetPersonalData => ({
    type: PersonalDataActionType.SET_PERSONAL_DATA,
    isAuthorized,
    userData,
});
