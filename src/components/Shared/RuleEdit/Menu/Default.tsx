import { DialogSize } from '@models/store/reducer/dialogReducer';
import { GiReturnArrow } from 'react-icons/gi';
import { actionGetRule } from '@store/actions/ruleAction';
import { actionHandler } from '@store/actions/actionHandler';
import { closeDialog, openDialog } from '@store/reducer/dialogReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import Localization from '@localization/components/shared/ruleEdit/menu/default';
import React from 'react';

interface Props{
    ruleUid: string
}

const Default: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);
    const dispatch = useDispatch();
    const { ruleUid } = props;
    async function onClickConfirmReturnDefault(): Promise<void> {
        const getRule = actionGetRule(dispatch, ruleUid);
        const result = await actionHandler(dispatch, getRule);

        dispatch(closeDialog());
        if (!result.isSuccess) {
            dispatch(showMessage(true, Localization.error, Localization.failedRestoreData));
        }
    }
    const onClickReturnDefault = ():void => {
        const footer = (
            <>
                <button type="button" onClick={onClickConfirmReturnDefault}>{Localization.confirm}</button>
                <button type="button" onClick={() => { dispatch(closeDialog()); }}>{Localization.close}</button>
            </>
        );
        dispatch(openDialog(Localization.default, Localization.undoChanges, DialogSize.auto, footer));
    };

    return (
        <button title={Localization.default} type="button" onClick={onClickReturnDefault}>
            <GiReturnArrow />
            &#8203;
        </button>
    );
};

export default Default;
