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
import Dialog from '@shared/Dialog/Dialog';
import Localization from '@localization/components/shared/ruleEdit/settings/index';
import React, { useState } from 'react';
import Settings from '@shared/RuleEdit/Settings/Settings';

interface Props{
    ruleUid: string,
}

const RuleController: React.FC<Props> = (props) => {
    console.info('RuleController');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { ruleUid } = props;

    const ruleName = useTypedSelector((state) => state.ruleReducer[ruleUid].name);
    const ruleCover = useTypedSelector((state) => state.ruleReducer[ruleUid].cover);
    const stateChapterCount = useTypedSelector((state) => state.chapterReducer[ruleUid]?.length || 0);
    const deleteRuleItems = useDeleteRuleItems(dispatch, ruleUid);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [countItem, SetCountItem] = useState<number>(1);
    const onInputChapter = (count: string): void => {
        SetCountItem(+count);
    };

    const onClickAddChapter = (): void => {
        if ((stateChapterCount + countItem) <= 100) {
            const chapters = {
                [ruleUid]: [...Array(countItem)].map(() => ({ uid: uuidv4(), name: '', cover: '' })),
            };
            dispatch(addChapter(chapters));
        } else {
            dispatch(showMessage(true, Localization.limitReached, Localization.maximumElements));
        }
    };

    const onChangeRuleName = (name: string): void => {
        dispatch(setRuleName(ruleUid, name));
    };

    const onChangeRuleCover = (cover: string): void => {
        dispatch(setRuleCover(ruleUid, cover));
    };

    const onClickRemoveRule = (): void => {
        setIsOpen(true);
    };

    const history = useHistory();
    async function onClickConfirmRemove() {
        setIsOpen(false);
        if (DefaultRuleKey !== ruleUid) {
            const deleteRule = actionDeleteRule(ruleUid);
            const result = await actionHandler(dispatch, deleteRule);
            if (result.isSuccess) {
                deleteRuleItems();
                dispatch(removeRule(ruleUid));
                history.push(PageRoute.home);
            } else {
                dispatch(showMessage(true, Localization.error, Localization.failedDeleteRule));
            }
        } else {
            deleteRuleItems();
        }
    }

    const onClickCloseDialog = (): void => {
        setIsOpen(false);
    };

    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClickCloseDialog={onClickCloseDialog}
                title={Localization.removal}
                content={<div>{Localization.deleteRule}</div>}
                footer={(
                    <>
                        <button type="button" onClick={onClickConfirmRemove}>{Localization.confirm}</button>
                        <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
                    </>
                )}
            />
            <Settings
                settingsType={SettingsType.RULE}
                title={ruleName}
                onChangeTitle={onChangeRuleName}
                countItem={countItem}
                onInputCountItem={onInputChapter}
                cover={ruleCover}
                onChangeCover={onChangeRuleCover}
                onClickAddItem={onClickAddChapter}
                onClickRemoveItem={onClickRemoveRule}
            />
        </>
    );
};
export default RuleController;
