import { Dispatch } from 'react';
import { RuleAction } from '@models/store/reducer/ruleReducer';
import { ServerResponse } from '@models/store/actions/serverResponseAction';
import { SetPersonalData, UserData } from '@models/store/reducer/personalDataReducer';
import { ShowLoader } from '@models/store/reducer/loaderReducer';
import { actionCheckAuth } from '@store/actions/authAction';
import { showLoader } from '@store/reducer/loaderReducer';
import Localization from '@localization/actions';
import cookies from 'js-cookie';

function errorHandler(text: string): string {
    Localization.setLanguage(navigator.language);
    const propertyExist = Object.prototype.hasOwnProperty.call(Localization, text);
    if (propertyExist) {
        return Localization[text];
    }
    return Localization.unknownError;
}

export async function refreshToken(dispatch: Dispatch<SetPersonalData | RuleAction>): Promise<null | UserData> {
    const token = cookies.get('login');
    if (localStorage.getItem('token') || token) {
        cookies.remove('login');
        const { userData } = await actionCheckAuth(dispatch);
        if (userData) {
            return userData;
        }
    }
    return null;
}

export async function actionHandler(dispatch: Dispatch<ShowLoader | SetPersonalData | RuleAction>, action: ()=>Promise<ServerResponse>): Promise<ServerResponse> {
    dispatch(showLoader(true));
    await refreshToken(dispatch);
    const result = { ...await action() };
    await new Promise((resolve) => { setTimeout(() => { resolve(() => {}); }, 500); });
    dispatch(showLoader(false));

    if (!result.isSuccess) {
        return { ...result, message: errorHandler(result.message) };
    }
    return result;
}
