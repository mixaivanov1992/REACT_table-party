import { AuthResponse } from '@models/services/authResponse';
import { AxiosResponse } from 'axios';
import $api from '@src/http';

export async function login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
}

export async function registration(email: string, username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, username, password });
}

export async function forgotPassword(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/forgot-password', { email });
}

export async function passwordRecovery(link: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/password-recovery', { link, password });
}

export async function logout(): Promise<void> {
    return $api.post('/logout');
}
