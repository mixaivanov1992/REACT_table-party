import { AiFillDelete } from 'react-icons/ai';
import { IoMdImages } from 'react-icons/io';
import { deleteSheet } from '@store/reducer/sheetReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/ruleEdit/chapter/settings/sheets/sheetItem';
import React, { useState } from 'react';
import SheetDialog from '@shared/RuleEdit/Chapters/Sheets/SheetItem/SheetDialog/SheetDialog';
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
    Localization.setLanguage(navigator.language);

    const {
        ruleUid, sheetIndex, chapterUid, chapterIndex,
    } = props;
    const sheetNumber = sheetIndex + 1;

    const sheetUid = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].uid);
    const chapterCover = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].cover);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickDeleteSheet = (): void => {
        dispatch(deleteSheet(chapterUid, sheetUid));
    };

    const onClickOpenDialog = () => {
        setIsOpen(true);
    };

    const onClickCloseDialog = () => {
        setIsOpen(false);
    };

    function isValidHttpUrl(str: string) {
        let url;
        try {
            url = new URL(str);
        } catch (_) {
            return false;
        }
        return url.protocol === 'http:' || url.protocol === 'https:';
    }

    return (
        <>
            {
                isOpen
            && (
                <SheetDialog
                    onClickCloseDialog={onClickCloseDialog}
                    isOpen={isOpen}
                    chapterUid={chapterUid}
                    sheetUid={sheetUid}
                    sheetIndex={sheetIndex}
                />
            )
            }
            <div className={styles.sheet}>
                <div className={styles.sheet_number}>{Localization.sheetNumber + sheetNumber}</div>
                <div
                    role="button"
                    tabIndex={-1}
                    onKeyPress={() => {}}
                    onClick={onClickOpenDialog}
                    className={styles.item}
                >
                    {isValidHttpUrl(chapterCover)
                        ? <img src={chapterCover} alt={chapterCover} />
                        : <div className={styles.pictureMissing}><IoMdImages /></div>}
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
