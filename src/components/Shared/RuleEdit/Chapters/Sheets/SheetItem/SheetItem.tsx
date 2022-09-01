import { AiFillDelete } from 'react-icons/ai';
import { IoMdImages } from 'react-icons/io';
import { deleteSheet, setSheetContent } from '@store/reducer/sheetReducer';
import { useDispatch } from 'react-redux';
import { useIsValidHttpUrl } from '@hooks/useIsValidHttpUrl';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Dialog from '@shared/Dialog/Dialog';
import Localization from '@localization/components/shared/ruleEdit/chapter/sheets/sheetItem';
import React, { useState } from 'react';
import TextEditor from '@shared/TextEditor/TextEditor';
import styles from '@css/shared/ruleEdit/chapters/sheets/sheetItem/SheetItem.module.scss';

interface Props {
    ruleUid: string,
    chapterUid: string,
    chapterIndex: number,
    sheetIndex: number
}

const SheetItem:React.FC<Props> = (props) => {
    console.info('sheetItem');
    const dispatch = useDispatch();
    const isValidHttpUrl = useIsValidHttpUrl();
    Localization.setLanguage(navigator.language);

    const {
        ruleUid, sheetIndex, chapterUid, chapterIndex,
    } = props;

    const sheetUid = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].uid);
    const chapterCover = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].cover);
    const sheetContent = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].content);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);

    const onClickDeleteSheet = (): void => {
        setIsRemoveOpen(true);
    };

    const onClickConfirmRemove = (): void => {
        setIsRemoveOpen(false);
        dispatch(deleteSheet(chapterUid, sheetUid));
    };

    const onClickOpenTextEditor = () => {
        setIsEditOpen(true);
    };

    const onClickCloseDialog = () => {
        setIsEditOpen(false);
        setIsRemoveOpen(false);
    };

    const editorSave = (content: string) => {
        dispatch(setSheetContent(chapterUid, sheetUid, content));
        onClickCloseDialog();
    };

    return (
        <>
            <Dialog
                isOpen={isEditOpen}
                onClickCloseDialog={onClickCloseDialog}
                title={Localization.dataEntry}
                dialogSize="90"
                content={(
                    <TextEditor
                        initialState={sheetContent}
                        editorSave={editorSave}
                    >
                        <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
                    </TextEditor>
                )}
            />
            <Dialog
                isOpen={isRemoveOpen}
                onClickCloseDialog={onClickCloseDialog}
                title={Localization.removal}
                content={<div>{Localization.deleteSheet}</div>}
                footer={(
                    <>
                        <button type="button" onClick={onClickConfirmRemove}>{Localization.confirm}</button>
                        <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
                    </>
                )}
            />
            <div className={styles.sheet}>
                <div className={styles.item}>
                    <div
                        className={styles.text_editor}
                        role="button"
                        tabIndex={-1}
                        onKeyPress={() => {}}
                        onClick={onClickOpenTextEditor}
                    >
                        {isValidHttpUrl(chapterCover)
                            ? <img src={chapterCover} alt={chapterCover} />
                            : <div className={styles.pictureMissing}><IoMdImages /></div>}
                    </div>
                    <div className={styles.menu}>
                        <button
                            type="button"
                            onClick={onClickDeleteSheet}
                        >
                            <AiFillDelete />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SheetItem;
