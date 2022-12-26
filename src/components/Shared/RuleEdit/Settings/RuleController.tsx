import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { PageRoute } from '@models/accessiblePage';
import { SettingsType } from '@models/shared/ruleEdit/settings/settings';
import { actionDeleteRule } from '@store/actions/ruleAction';
import { actionHandler } from '@store/actions/actionHandler';
import { addChapter } from '@store/reducer/chapterReducer';
import { removeRule, setRuleCover, setRuleName } from '@store/reducer/ruleReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDeleteRuleItems } from '@hooks/useDeleteRuleItems';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/shared/ruleEdit/settings/index';
import React, { useState } from 'react';
import Settings from '@shared/RuleEdit/Settings/Settings';

interface Props{
    ruleUid: string,
}

const RuleController: React.FC<Props> = (props) => {
    console.info('RuleController');
    Localization.setLanguage(navigator.language);

    const dispatch = useDispatch();
    const { ruleUid } = props;
    const history = useHistory();

    const [ruleName, ruleCover] = useTypedSelector((state) => [state.ruleReducer[ruleUid].name, state.ruleReducer[ruleUid].cover]);
    const stateCount = useTypedSelector((state) => state.chapterReducer[ruleUid]?.length || 0);
    const deleteRuleItems = useDeleteRuleItems(dispatch, ruleUid);

    const [countItem, SetCountItem] = useState<number>(1);

    const addItem = (): void => {
        const chapters = {
            [ruleUid]: [...Array(countItem)].map(() => ({ uid: uuidv4(), name: '', cover: '' })),
        };
        dispatch(addChapter(chapters));
    };

    const onClickConfirmRemove = () => {
        if (DefaultRuleKey !== ruleUid) {
            const deleteRule = actionDeleteRule(ruleUid);
            (async () => {
                const result = await actionHandler(dispatch, deleteRule);
                if (result.isSuccess) {
                    deleteRuleItems();
                    dispatch(removeRule(ruleUid));
                    history.push(PageRoute.home);
                } else {
                    dispatch(showMessage(true, Localization.error, Localization.failedDeleteRule));
                }
            })();
        } else {
            deleteRuleItems();
        }
    };

    return (
        <Settings
            settingsType={SettingsType.RULE}
            title={ruleName}
            countItem={countItem}
            stateCount={stateCount}
            cover={ruleCover}
            onChangeTitle={(name: string) => dispatch(setRuleName(ruleUid, name))}
            onInputCountItem={(count: number) => SetCountItem(count)}
            onChangeCover={(cover: string) => dispatch(setRuleCover(ruleUid, cover))}
            onClickConfirmRemove={onClickConfirmRemove}
            addItem={addItem}
        />
    );
};
export default RuleController;
