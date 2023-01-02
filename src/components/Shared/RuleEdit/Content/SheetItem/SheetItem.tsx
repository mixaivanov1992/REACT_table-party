import {
    AiFillDelete, AiFillEdit, AiOutlineArrowLeft, AiOutlineArrowRight,
} from 'react-icons/ai';
import { DialogSize } from '@models/store/reducer/dialogReducer';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { IoMdImages } from 'react-icons/io';
import { Offset } from '@src/assets/types/offset';
import { closeDialog, openDialog } from '@store/reducer/dialogReducer';
import { deleteSheet, setSheetContent } from '@store/reducer/sheetReducer';
import { useDispatch } from 'react-redux';
import { useIsValidHttpUrl } from '@hooks/useIsValidHttpUrl';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/ruleEdit/content/sheetItem';
import React from 'react';
import TextEditor from '@shared/TextEditor/TextEditor';
import styles from '@css/shared/ruleEdit/content/sheetItem/SheetItem.module.scss';

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

    const onClickMove = (offset: Offset) => {
        forcePageOffset(offset, sheetIndex);
    };

    const onClickCloseDialog = () => {
        dispatch(closeDialog());
    };

    const onClickConfirmRemove = (): void => {
        dispatch(closeDialog());
        dispatch(deleteSheet(chapterUid, sheetUid));
        forcePageAfterDelete();
    };

    const editorSave = (content: string) => {
        dispatch(setSheetContent(chapterUid, sheetUid, content));
        dispatch(closeDialog());
    };
    const editorState = sheetContent ? EditorState.createWithContent(convertFromRaw(JSON.parse(sheetContent))) : EditorState.createEmpty();

    const onClickOpenDialogEditor = () => {
        const content = (
            <TextEditor
                initialState={sheetContent}
                editorSave={editorSave}
            >
                <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
            </TextEditor>
        );
        dispatch(openDialog(Localization.dataEntry, content, DialogSize.S90));
    };

    const onClickOpenDeleteDialog = () => {
        const footer = (
            <>
                <button type="button" onClick={onClickConfirmRemove}>{Localization.confirm}</button>
                <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
            </>
        );
        dispatch(openDialog(Localization.removal, Localization.deleteSheet, DialogSize.auto, footer));
    };

    return (
        <div className={styles.sheet}>
            <div className={styles.item}>
                <div className={styles.text_editor}>
                    {isValidHttpUrl(chapterCover) || /data:image\//.test(chapterCover)
                        ? <img src={chapterCover} alt={chapterCover} />
                        : <div className={styles.pictureMissing}><IoMdImages /></div>}
                </div>
                <div className={styles.menu}>
                    <button title={Localization.moveLeft} type="button" onClick={() => { onClickMove(Offset.LEFT); }}>
                        <AiOutlineArrowLeft />
                    </button>
                    <button title={Localization.deleteSheetBtn} type="button" onClick={onClickOpenDeleteDialog}>
                        <AiFillDelete />
                    </button>
                    <button title={Localization.edit} type="button" onClick={onClickOpenDialogEditor}>
                        <AiFillEdit />
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
    );
};

export default SheetItem;
