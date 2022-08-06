import { Dispatch } from 'react';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { ShowLoader } from '@models/store/reducer/loaderReducer';
import { showLoader } from '@store/reducer/loaderReducer';
import Localization from '@localization/actions';

function errorHandler(text: string): string {
    Localization.setLanguage(navigator.language);
    const propertyExist = Object.prototype.hasOwnProperty.call(Localization, text);
    if (propertyExist) {
        return Localization[text];
    }
    return Localization.unknownError;
}

export async function actionHandler(dispatch: Dispatch<ShowLoader>, action: ()=>Promise<ServerAnswer>): Promise<ServerAnswer> {
    dispatch(showLoader(true));
    const result = { ...await action() };
    dispatch(showLoader(false));

    if (!result.isSuccess) {
        return { ...result, message: errorHandler(result.message) };
    }
    return result;
}
