import { addSheet, deleteSheets } from '@store/reducer/sheetReducer';
import { removeChapter, setChapterCover, setChapterName } from '@store/reducer/chapterReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@shared/Dialog/Dialog';
import Localization from '@localization/components/shared/ruleEdit/settings';
import React, { useState } from 'react';
import Settings from '@shared/RuleEdit/Settings/Settings';

interface Props {
    ruleUid: string,
    chapterIndex: number,
}

const ChapterController: React.FC<Props> = (props) => {
    console.info('ChapterController');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { ruleUid, chapterIndex } = props;

    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const chapterName = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].name);
    const chapterCover = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].cover);
    const stateSheetCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [countItem, SetCountItem] = useState<number>(1);
    const onInputSheet = (count: string): void => {
        SetCountItem(+count);
    };

    const onClickAddSheet = (): void => {
        if ((stateSheetCount + countItem) <= 100) {
            const sheets = {
                [chapterUid]: [...Array(countItem)].map(() => ({ uid: uuidv4(), content: '', cover: '' })),
            };
            dispatch(addSheet(sheets));
        } else {
            dispatch(showMessage(true, Localization.limitReached, Localization.maximumElements));
        }
    };

    const onChangeChapterName = (name: string): void => {
        dispatch(setChapterName(ruleUid, chapterUid, name));
    };

    const onChangeChapterCover = (cover: string): void => {
        dispatch(setChapterCover(ruleUid, chapterUid, cover));
    };

    const onClickRemoveChapter = (): void => {
        setIsOpen(true);
    };

    const onClickConfirmRemove = (): void => {
        setIsOpen(false);
        dispatch(deleteSheets([chapterUid]));
        dispatch(removeChapter(ruleUid, chapterUid));
    };

    const onClickCloseDialog = (): void => {
        setIsOpen(false);
    };

    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClickCloseDialog={onClickCloseDialog}
                title={Localization.removal}
                content={<div>{Localization.deleteChapter}</div>}
                footer={(
                    <>
                        <button type="button" onClick={onClickConfirmRemove}>{Localization.confirm}</button>
                        <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
                    </>
                )}
            />
            <Settings
                title={chapterName}
                onChangeTitle={onChangeChapterName}
                countItem={countItem}
                onInputCountItem={onInputSheet}
                cover={chapterCover}
                onChangeCover={onChangeChapterCover}
                onClickAddItem={onClickAddSheet}
                onClickRemoveItem={onClickRemoveChapter}
            />
        </>
    );
};

export default ChapterController;
