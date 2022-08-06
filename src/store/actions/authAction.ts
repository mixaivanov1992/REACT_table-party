import { API_URL } from '@src/http';
import { AuthResponse } from '@models/services/authResponse';
import { DefaultRuleKey, RuleAction } from '@models/store/reducer/ruleReducer';
import { Dispatch } from 'react';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { SetPersonalData } from '@models/store/reducer/personalDataReducer';
import {
    forgotPassword, login, logout, registration,
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

export const actionCheckAuth = (dispatch:Dispatch<SetPersonalData | RuleAction>) => async ():Promise<ServerAnswer> => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh-token`, { withCredentials: true });
        const { accessToken, userData } = response.data;
        localStorage.setItem('token', accessToken);
        dispatch(setPersonalData(true, userData));
        dispatch(setAuthor(DefaultRuleKey, userData.username));
        return { isSuccess: true, message: '' };
    } catch (error) {
        dispatch(setPersonalData(false));
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
