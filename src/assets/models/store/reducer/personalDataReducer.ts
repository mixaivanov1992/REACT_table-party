import { AccessiblePages } from '@models/accessiblePage';

export interface PersonalDataState {
    isAuthorized: boolean,
    username: string,
    email: string,
    avatar: string,
    favorites: Array<Number>,
    libraryOwner: Array<Number>,
    role: Roles,
    accessiblePages: AccessiblePages
}
export enum Roles {
    ADMIN = 'admin',
    GUEST = 'guest',
    USER = 'user',
}

export enum PersonalDataActionType {
    SET_PERSONAL_DATA = 'SET_PERSONAL_DATA',
}

export type UserData = {
    email: string,
    username: string
    avatar: string,
    role: string,
    // isActivated: boolean,
    // isBlocked: boolean,
}

export interface SetPersonalData {
    type: PersonalDataActionType.SET_PERSONAL_DATA,
    isAuthorized: boolean,
    userData?: UserData
}
export type PersonalDataAction = SetPersonalData;
