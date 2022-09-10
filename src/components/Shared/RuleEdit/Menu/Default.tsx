import { GiReturnArrow } from 'react-icons/gi';
// import { actionHandler } from '@store/actions/actionHandler';
// import { actionSaveRule } from '@store/actions/ruleAction';
// import { showMessage } from '@store/reducer/messageReducer';
import { actionGetRule } from '@store/actions/ruleAction';
import { actionHandler } from '@store/actions/actionHandler';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import Dialog from '@shared/Dialog/Dialog';
import Localization from '@localization/components/shared/ruleEdit/menu/default';
import React, { useState } from 'react';

interface Props{
    ruleUid: string
}

const Default: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { ruleUid } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickReturnDefault = ():void => {
        setIsOpen(true);
    };
    async function onClickConfirmDefaultReturn(): Promise<void> {
        const getRule = actionGetRule(dispatch, ruleUid);
        const result = await actionHandler(dispatch, getRule);

        if (!result.isSuccess) {
            dispatch(showMessage(true, Localization.error, Localization.failedRestoreData));
        }
    }
    const onClickCloseDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button title={Localization.default} type="button" onClick={onClickReturnDefault}>
                <GiReturnArrow />
                &#8203;
            </button>
            <Dialog
                isOpen={isOpen}
                onClickCloseDialog={onClickCloseDialog}
                title={Localization.default}
                content={<div>{Localization.undoChanges}</div>}
                footer={(
                    <>
                        <button type="button" onClick={onClickConfirmDefaultReturn}>{Localization.confirm}</button>
                        <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
                    </>
                )}
            />
        </>
    );
};

export default Default;
