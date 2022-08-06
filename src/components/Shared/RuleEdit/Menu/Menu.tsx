import { AiFillSave } from 'react-icons/ai';
import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { PageRoute } from '@models/accessiblePage';
import { actionHandler } from '@store/actions/actionHandler';
import { saveRuleAction } from '@store/actions/ruleAction';
import { showMessage } from '@store/reducer/messageReducer';
import { useDeleteRuleItems } from '@hooks/useDeleteRuleItems';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { usePrepareRuleDataForSave } from '@hooks/usePrepareRuleDataForSave';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/ruleEdit/menu';
import React from 'react';
import styles from '@css/shared/ruleEdit/menu/Menu.module.scss';

interface Props{
    ruleUid: string
}

const Menu: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const {
        ruleUid,
    } = props;

    const ruleName = useTypedSelector((state) => state.RuleReducer[DefaultRuleKey].name);
    const prepareRuleDataForSave = usePrepareRuleDataForSave(ruleUid);
    const deleteRuleItems = useDeleteRuleItems(ruleUid);
    const history = useHistory();

    async function onClickSave(): Promise<void> {
        const result = await actionHandler(dispatch, saveRuleAction, prepareRuleDataForSave());

        if (result.isSuccess) {
            if (ruleUid === DefaultRuleKey) {
                deleteRuleItems();
                const baseUrl = PageRoute.ruleEdit.split(':')[0];
                history.push(`${baseUrl}123`);
            }
            dispatch(showMessage(true, Localization.dataSaved, Localization.ruleSaved));
        } else {
            dispatch(showMessage(true, Localization.error, result.message));
        }
    }

    return (
        <div className={styles.menu}>
            {ruleName
                ? (
                    <div>
                        <button type="button" onClick={onClickSave}>
                            <AiFillSave />
                            &#8203;
                        </button>
                    </div>
                )
                : (
                    <div>
                        <button type="button" disabled>
                            <AiFillSave />
                            &#8203;
                        </button>
                    </div>
                )}
        </div>
    );
};

export default Menu;
