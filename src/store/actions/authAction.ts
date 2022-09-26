import { API_URL } from '@src/http';
import { AuthResponse } from '@models/services/authResponse';
import { DefaultRuleKey, RuleAction } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { SetPersonalData } from '@models/store/reducer/personalDataReducer';
import {
    forgotPassword, login, logout, passwordRecovery, registration,
} from '@src/services/authService';
import { setAuthor } from '@store/reducer/ruleReducer';
import { setPersonalData } from '@store/reducer/personalDataReducer';
import axios, { AxiosError } from 'axios';

export const actionRegistration = (email:string, username:string, password:string) => async ():Promise<ServerAnswer> => {
    try {
        await registration(email, username, password);
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionLogin = (dispatch:Dispatch<SetPersonalData | RuleAction>, email:string, password:string) => async ():Promise<ServerAnswer> => {
    try {
        const response = await login(email, password);
        const { accessToken, userData } = response.data;
        localStorage.setItem('token', accessToken);
        dispatch(setPersonalData(true, userData));
        dispatch(setAuthor(DefaultRuleKey, userData.username));
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionForgotPassword = (email:string) => async ():Promise<ServerAnswer> => {
    try {
        await forgotPassword(email);
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionCheckAuth = async (dispatch:Dispatch<SetPersonalData | RuleAction>):Promise<ServerAnswer> => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh-token`, { withCredentials: true });
        const { accessToken, userData } = response.data;
        localStorage.setItem('token', accessToken);
        dispatch(setAuthor(DefaultRuleKey, userData.username));
        return { isSuccess: true, message: '', data: { userData } };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export const actionLogout = (dispatch:Dispatch<SetPersonalData>) => async ():Promise<ServerAnswer> => {
    try {
        await logout();
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    } finally {
        localStorage.removeItem('token');
        dispatch(setPersonalData(false));
    }
};

export const actionPasswordRecovery = (link:string, password:string) => async ():Promise<ServerAnswer> => {
    try {
        await passwordRecovery(link, password);
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
};

export function getGoogleOAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.GOOGLE_AUTH_REDIRECT as string,
        client_id: process.env.GOOGLE_AUTH_ID as string,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
    const queryString = new URLSearchParams(options);

    return `${rootUrl}?${queryString.toString()}`;
}
