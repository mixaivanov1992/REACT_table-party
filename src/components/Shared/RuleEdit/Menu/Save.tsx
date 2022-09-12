import { AiFillSave } from 'react-icons/ai';
import { actionHandler } from '@store/actions/actionHandler';
import { actionSaveRule } from '@store/actions/ruleAction';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { usePrepareRuleDataForSave } from '@hooks/usePrepareRuleDataForSave';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/ruleEdit/menu/save';
import React from 'react';

interface Props{
    ruleUid: string
}

const Save: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { ruleUid } = props;

    const ruleName = useTypedSelector((state) => state.ruleReducer[ruleUid].name);
    const prepareRuleDataForSave = usePrepareRuleDataForSave(ruleUid);
    const history = useHistory();

    async function onClickSave(): Promise<void> {
        const { rule, chapters, sheets } = prepareRuleDataForSave();
        const saveRule = actionSaveRule(dispatch, rule, chapters, sheets, history);
        const result = await actionHandler(dispatch, saveRule);

        if (result.isSuccess) {
            dispatch(showMessage(true, Localization.dataSaved, Localization.ruleSaved));
        } else {
            dispatch(showMessage(true, Localization.error, result.message));
        }
    }

    return (
        <button title={Localization.save} type="button" disabled={!ruleName} onClick={ruleName ? onClickSave : () => {}}>
            <AiFillSave />
            &#8203;
        </button>
    );
};

export default Save;
