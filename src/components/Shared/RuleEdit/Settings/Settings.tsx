import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { PageRoute } from '@models/accessiblePage';
import { actionHandler } from '@store/actions/actionHandler';
import { addChapter } from '@store/reducer/chapterReducer';
import { saveRuleAction } from '@store/actions/ruleAction';
import { setGameName, setRuleCover } from '@store/reducer/ruleReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDeleteAllChapters } from '@hooks/useDeleteAllChapters';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { usePrepareRuleDataForSave } from '@hooks/usePrepareRuleDataForSave';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import InputNumber from '@shared/InputNumber/InputNumber';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/shared/ruleEdit/settings';
import React, { useState } from 'react';
import styles from '@css/shared/ruleEdit/settings/Settings.module.scss';

interface Props{
    ruleUid: string,
    gameName: string,
    cover: string,
    username: string
}

const Settings: React.FC<Props> = (props) => {
    console.info('RuleSettings');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);

    const {
        ruleUid, gameName, username, cover,
    } = props;
    const deleteAllChapters = useDeleteAllChapters(ruleUid);
    const prepareRuleDataForSave = usePrepareRuleDataForSave(ruleUid, username, gameName, cover);
    const history = useHistory();

    const [chapterCount, setChapterCount] = useState<number>(1);
    const stateChapterCount = useTypedSelector((state) => state.chapterReducer[ruleUid]?.length || 0);

    const changeGameName = (name: string): void => {
        dispatch(setGameName(ruleUid, name));
    };

    const onClickChapterAdd = (): void => {
        if ((stateChapterCount + chapterCount) <= 100) {
            const chapters = {
                [ruleUid]: [...Array(chapterCount)].map(() => ({ uid: uuidv4(), name: '', cover: '' })),
            };
            dispatch(addChapter(chapters));
        } else {
            dispatch(showMessage(true, Localization.limitReached, Localization.maximumChapters));
        }
    };

    const onClickDeleteChapters = (): void => {
        deleteAllChapters();
    };

    const onInputChapter = (count: string): void => {
        setChapterCount(+count);
    };

    async function onClickSave(): Promise<void> {
        const result = await actionHandler(dispatch, saveRuleAction, prepareRuleDataForSave());

        if (result.isSuccess) {
            if (ruleUid === DefaultRuleKey) {
                deleteAllChapters();
            }
            const baseUrl = PageRoute.ruleEdit.split(':')[0];
            history.push(`${baseUrl}123`);
            dispatch(showMessage(true, Localization.dataSaved, result.message));
        } else {
            dispatch(showMessage(true, Localization.error, result.message));
        }
    }
    return (
        <div className={styles.settings}>
            <div>
                <InputWrapper
                    htmlFor={`cover${ruleUid}`}
                    text={Localization.linkImage}
                    value={cover}
                >
                    <input
                        onChange={(e) => { dispatch(setRuleCover(ruleUid, e.currentTarget.value)); }}
                        id={`cover${ruleUid}`}
                        type="text"
                        value={cover}
                    />
                </InputWrapper>
            </div>
            <div className={styles.game_name}>
                <InputWrapper
                    htmlFor="gameName"
                    text={Localization.gameName}
                    value={gameName}
                >
                    <input
                        onChange={(e) => { changeGameName(e.currentTarget.value); }}
                        id="gameName"
                        type="text"
                        value={gameName}
                    />
                </InputWrapper>
                {gameName
                    ? <div><button type="button" onClick={onClickSave}>{Localization.save}</button></div>
                    : <div><button type="button" disabled>{Localization.save}</button></div>}
            </div>
            <div className={styles.chapter}>
                <InputWrapper
                    htmlFor="chapterCount"
                    text={Localization.chapterCount}
                    value={chapterCount}
                >
                    <InputNumber
                        uid={uuidv4()}
                        value={chapterCount}
                        onInputData={onInputChapter}
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickChapterAdd}>{Localization.addChapter}</button></div>
                <div><button type="button" onClick={onClickDeleteChapters}>{Localization.deleteChapters}</button></div>
            </div>
        </div>
    );
};
export default Settings;
