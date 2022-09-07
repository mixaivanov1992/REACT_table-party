import { GiReturnArrow } from 'react-icons/gi';
// import { actionHandler } from '@store/actions/actionHandler';
// import { actionSaveRule } from '@store/actions/ruleAction';
// import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import Localization from '@localization/components/shared/ruleEdit/menu/default';
import React from 'react';

interface Props{
    ruleUid: string
}

const Default: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { ruleUid } = props;

    async function onClickReturnDefault(): Promise<void> {
        // const { rule, chapters, sheets } = prepareRuleDataForSave();
        // const saveRule = actionSaveRule(dispatch, rule, chapters, sheets, history);
        // const result = await actionHandler(dispatch, saveRule);

        // if (result.isSuccess) {
        //     dispatch(showMessage(true, Localization.dataSaved, Localization.ruleSaved));
        // } else {
        //     dispatch(showMessage(true, Localization.error, result.message));
        // }
    }

    return (
        <button title={Localization.default} type="button" onClick={onClickReturnDefault}>
            <GiReturnArrow />
            &#8203;
        </button>
    );
};

export default Default;
