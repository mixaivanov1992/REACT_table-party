import { addSheet, deleteSheets } from '@store/reducer/sheetReducer';
import { removeChapter, setChapterCover, setChapterName } from '@store/reducer/chapterReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import InputNumber from '@shared/InputNumber/InputNumber';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/shared/ruleEdit/chapter/settings';
import React, { useState } from 'react';
import styles from '@css/shared/ruleEdit/chapters/settings/Settings.module.scss';

interface Props {
    ruleUid: string,
    chapterIndex: number,
}

const Settings: React.FC<Props> = (props) => {
    console.info('Settings');
    Localization.setLanguage(navigator.language);

    const dispatch = useDispatch();
    const { ruleUid, chapterIndex } = props;
    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const chapterName = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].name);
    const chapterCover = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].cover);

    const [sheetCount, SetSheetCount] = useState<number>(1);
    const stateSheetCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);
    const chapterNumber = chapterIndex + 1;

    const onClickRemoveChapter = (): void => {
        dispatch(deleteSheets([chapterUid]));
        dispatch(removeChapter(ruleUid, chapterUid));
    };

    const onChangeChapterName = (name: string): void => {
        dispatch(setChapterName(ruleUid, chapterUid, name));
    };

    const onInputSheet = (count: string): void => {
        SetSheetCount(+count);
    };

    const onClickAddSheet = (): void => {
        if ((stateSheetCount + sheetCount) <= 100) {
            const sheets = {
                [chapterUid]: [...Array(sheetCount)].map(() => ({ uid: uuidv4(), content: '', cover: '' })),
            };
            dispatch(addSheet(sheets));
        } else {
            dispatch(showMessage(true, Localization.limitReached, Localization.maximumSheets));
        }
    };

    return (
        <div className={styles.settings}>
            <div>
                <InputWrapper
                    htmlFor={`cover${chapterUid}`}
                    text={Localization.linkImage}
                    value={chapterCover}
                >
                    <input
                        onChange={(e) => { dispatch(setChapterCover(ruleUid, chapterUid, e.currentTarget.value)); }}
                        id={`cover${chapterUid}`}
                        type="text"
                        value={chapterCover}
                    />
                </InputWrapper>
            </div>
            <div className={styles.chapter}>
                <InputWrapper
                    htmlFor={`chapterName-${chapterNumber}`}
                    text={Localization.chapterTitle}
                    value={chapterName}
                >
                    <input
                        type="text"
                        id={`chapterName-${chapterNumber}`}
                        value={chapterName}
                        onChange={
                            (e) => {
                                onChangeChapterName(e.currentTarget.value);
                            }
                        }
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickRemoveChapter}>{Localization.deleteChapter}</button></div>
            </div>
            <div className={styles.sheet}>
                <InputWrapper
                    htmlFor="sheetCount"
                    text={Localization.numberSheets}
                    value={sheetCount}
                >
                    <InputNumber
                        uid={chapterUid}
                        value={sheetCount}
                        onInputData={onInputSheet}
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickAddSheet}>{Localization.addSheets}</button></div>
            </div>
        </div>
    );
};

export default Settings;
