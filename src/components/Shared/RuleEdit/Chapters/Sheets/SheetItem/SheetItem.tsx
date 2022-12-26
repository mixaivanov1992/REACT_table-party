import { AiFillDelete, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { IoMdImages } from 'react-icons/io';
import { Offset } from '@src/assets/types/offset';
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
    sheetIndex: number,
    forcePageAfterDelete(): void,
    forcePageOffset(offset: Offset, index: number): void
}

const SheetItem:React.FC<Props> = (props) => {
    console.info('sheetItem');
    const dispatch = useDispatch();
    const isValidHttpUrl = useIsValidHttpUrl();
    Localization.setLanguage(navigator.language);

    const {
        ruleUid, sheetIndex, chapterUid, chapterIndex, forcePageAfterDelete, forcePageOffset,
    } = props;

    const sheetUid = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].uid);
    const chapterCover = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].cover);
    const sheetContent = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].content);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);

    const onClickDeleteSheet = (): void => {
        setIsRemoveOpen(true);
    };

    const onClickMove = (offset: Offset) => {
        forcePageOffset(offset, sheetIndex);
    };

    const onClickConfirmRemove = (): void => {
        setIsRemoveOpen(false);
        dispatch(deleteSheet(chapterUid, sheetUid));
        forcePageAfterDelete();
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
    const editorState = sheetContent ? EditorState.createWithContent(convertFromRaw(JSON.parse(sheetContent))) : EditorState.createEmpty();

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
                        {isValidHttpUrl(chapterCover) || /data:image\//.test(chapterCover)
                            ? <img src={chapterCover} alt={chapterCover} />
                            : <div className={styles.pictureMissing}><IoMdImages /></div>}
                    </div>
                    <div className={styles.menu}>
                        <button title={Localization.moveLeft} type="button" onClick={() => { onClickMove(Offset.LEFT); }}>
                            <AiOutlineArrowLeft />
                        </button>
                        <button title={Localization.deleteSheetBtn} type="button" onClick={onClickDeleteSheet}>
                            <AiFillDelete />
                        </button>
                        <button title={Localization.moveRight} type="button" onClick={() => { onClickMove(Offset.RIGHT); }}>
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div>
                <div className={styles.description}>
                    <Editor
                        editorState={editorState}
                        onChange={() => {}}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};

export default SheetItem;
