import { API_URL } from '@src/http';
import { AuthResponse } from '@models/services/authResponse';
import { Dispatch } from 'react';
import { ReducersActions } from '@models/store/actions/reducersAction';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import {
    forgotPassword, login, logout, registration,
} from '@src/services/authService';
import { setPersonalData } from '@store/reducer/personalDataReducer';
import axios, { AxiosError } from 'axios';

export async function registrationAction<T extends object>(args: T): Promise<ServerAnswer> {
    const { email, username, password } = args as {email:string, username:string, password:string};
    try {
        await registration(email, username, password);
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}

export async function loginAction<T extends object>(args: T): Promise<ServerAnswer> {
    const { dispatch, email, password } = args as {dispatch:Dispatch<ReducersActions>, email:string, password:string};
    try {
        const response = await login(email, password);
        const { accessToken, userData } = response.data;
        localStorage.setItem('token', accessToken);
        dispatch(setPersonalData(true, userData));
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}

export async function forgotPasswordAction<T extends object>(args: T): Promise<ServerAnswer> {
    const { email } = args as {email:string};
    try {
        await forgotPassword(email);
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}

export async function checkAuthAction<T extends object>(args: T): Promise<ServerAnswer> {
    const { dispatch } = args as {dispatch:Dispatch<ReducersActions>};
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh-token`, { withCredentials: true });
        const { accessToken, userData } = response.data;
        localStorage.setItem('token', accessToken);
        dispatch(setPersonalData(true, userData));
        return { isSuccess: true, message: '' };
    } catch (error) {
        dispatch(setPersonalData(false));
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}

export async function logoutAction<T extends object>(args: T): Promise<ServerAnswer> {
    const { dispatch } = args as {dispatch:Dispatch<ReducersActions>};
    try {
        await logout();
        localStorage.removeItem('token');
        dispatch(setPersonalData(false));
        return { isSuccess: true, message: '' };
    } catch (error) {
        const err = error as AxiosError;
        const message = err.response?.data?.message as string || '';
        return { isSuccess: false, message };
    }
}
