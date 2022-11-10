import { UserData } from '../reducer/personalDataReducer';

export interface ServerResponse{
    isSuccess: boolean,
    message: string
}
export interface ServerResponseCheckAuth extends ServerResponse{
    userData?: UserData
}
export interface ServerResponseNumberRules extends ServerResponse{
    numberRules?: number
}
