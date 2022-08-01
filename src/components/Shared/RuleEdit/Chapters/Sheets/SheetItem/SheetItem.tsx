import { deleteSheet } from '@store/reducer/sheetReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/shared/ruleEdit/chapter/settings/sheets/sheetItem';
import React, { useState } from 'react';
import SheetDialog from '@shared/RuleEdit/Chapters/Sheets/SheetItem/SheetDialog/SheetDialog';
import TextEditor from '@shared/TextEditor/TextEditor';
import styles from '@css/shared/ruleEdit/chapters/sheets/sheetItem/SheetItem.module.scss';

interface Props {
    chapterUid: string,
    sheetIndex: number
}

const SheetItem:React.FC<Props> = (props) => {
    console.info('sheetItem');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);

    const {
        sheetIndex, chapterUid,
    } = props;
    const sheetNumber = sheetIndex + 1;

    const sheetUid = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].uid);
    const sheetCover = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].cover);
    const sheetContent = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].content);

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    const coverImage = sheetCover.split(',').pop() || '';

    const regExpBase64 = new RegExp('/[A-Za-z0-9+/=]/');
    const cover = regExpBase64.test(coverImage) ? (
        <img
            src={sheetCover}
            alt={Localization.cover}
        />
    ) : <span>{sheetCover}</span>;

    const onClickDeleteSheet = (): void => {
        dispatch(deleteSheet(chapterUid, sheetUid));
    };

    const onClickOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const onClickCloseDialog = () => {
        setIsOpenDialog(false);
    };

    return (
        <>
            {
                isOpenDialog
            && (
                <SheetDialog
                    onClickCloseDialog={onClickCloseDialog}
                    isOpen={isOpenDialog}
                    chapterUid={chapterUid}
                    sheetUid={sheetUid}
                    sheetIndex={sheetIndex}
                />
            )
            }
            <div className={styles.sheet}>
                <div
                    role="button"
                    tabIndex={-1}
                    onKeyPress={() => {}}
                    onClick={onClickOpenDialog}
                    key={uuidv4()}
                    className={styles.item}
                >
                    {/* {sheetCover ? (
                        <div className={styles.cover}>{cover}</div>
                    ) : <div className={styles.number}>{`${Localization.sheetNumber}${sheetNumber}`}</div>} */}
                    <TextEditor
                        initialState={sheetContent}
                        editorSave={() => {}}
                        readOnly
                    >
                        &#8203;
                    </TextEditor>
                </div>
                <button
                    type="button"
                    onClick={onClickDeleteSheet}
                >
                    {Localization.deleteSheet}
                </button>
            </div>
        </>
    );
};

export default SheetItem;
