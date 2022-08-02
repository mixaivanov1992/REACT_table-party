import { Dispatch } from 'react';
import { ReducersActions } from '@models/store/actions/reducersAction';
import { ServerAnswer } from '@models/store/actions/serverAnswerAction';
import { showLoader } from '@store/reducer/loaderReducer';
import Localization from '@localization/actions/errors';

function errorHandler(text: string): string {
    Localization.setLanguage(navigator.language);
    const propertyExist = Object.prototype.hasOwnProperty.call(Localization, text);
    if (propertyExist) {
        return Localization[text];
    }
    return Localization.unknownError;
}

export async function actionHandler
    <
        D extends Dispatch<ReducersActions>,
        F extends Function,
        O extends Object
    >(dispatch: D, action: F, args: O): Promise<ServerAnswer> {
    dispatch(showLoader(true));
    const result = { ...await action({ dispatch, ...args }) } as ServerAnswer;
    dispatch(showLoader(false));

    if (!result.isSuccess) {
        return { ...result, message: errorHandler(result.message) };
    }
    return result;
}
