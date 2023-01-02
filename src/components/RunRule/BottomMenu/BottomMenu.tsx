import {
    CgChevronDoubleLeftO, CgChevronDoubleRightO, CgChevronLeftO, CgChevronRightO,
} from 'react-icons/cg';
import { ChapterData, SheetData } from '@models/services/ruleService';
import { DialogSize } from '@models/store/reducer/dialogReducer';
import { GiLifeBar, GiPerspectiveDiceSixFacesSix, GiSecretBook } from 'react-icons/gi';
import { openDialog } from '@store/reducer/dialogReducer';
import { useDispatch } from 'react-redux';
import GroupCounter from '@components/RunRule/GroupCounter/GroupCounter';
import Localization from '@localization/components/runRule/bottomMenu';
import React from 'react';
import RollDice from '@components/RunRule/RollDice/RollDice';
import styles from '@css/runRule/bottomMenu/BottomMenu.module.scss';

interface Props {
    ruleId: string,
    chapters: ChapterData,
    sheets: SheetData,
    selectedChapter: number,
    selectedSheet: number,
    blinkHandler: () => void,
    changeChapter: (chapter: number) => void,
    changeSheet: (chapter: number) => void,
}

const BottomMenu: React.FC<Props> = (props) => {
    console.info('BottomMenu');
    Localization.setLanguage(navigator.language);
    const dispatch = useDispatch();

    const {
        ruleId, chapters, sheets, selectedChapter, selectedSheet, blinkHandler, changeChapter, changeSheet,
    } = props;

    const chapterCount = chapters.length ? chapters.length - 1 : 0;
    const sheetCount = sheets.length ? sheets.length - 1 : 0;

    const onClickNextChapter = () => {
        if (selectedChapter < chapterCount) {
            changeChapter(selectedChapter + 1);
            changeSheet(0);
            blinkHandler();
        }
    };

    const onClickPrevChapter = () => {
        if (selectedChapter > 0) {
            changeChapter(selectedChapter - 1);
            changeSheet(0);
            blinkHandler();
        }
    };

    const onClickNextSheet = () => {
        if (selectedSheet < sheetCount) {
            changeSheet(selectedSheet + 1);
            blinkHandler();
        }
    };

    const onClickPrevSheet = () => {
        if (selectedSheet > 0) {
            changeSheet(selectedSheet - 1);
            blinkHandler();
        }
    };

    const onClickOpenRollDice = () => {
        dispatch(openDialog(Localization.rollDice, <RollDice />, DialogSize.auto));
    };

    const onClickOpenCounter = () => {
        dispatch(openDialog(Localization.counter, <GroupCounter ruleId={ruleId} />, DialogSize.S90));
    };

    const onClickOpenGameElements = () => {
        dispatch(openDialog(Localization.gameElements, 'In development', DialogSize.S90));
    };

    return (
        <div className={styles.menu}>
            <CgChevronDoubleLeftO title={Localization.prevChapter} className={`${!selectedChapter && styles.disabled}`} onClick={onClickPrevChapter} />
            <CgChevronLeftO title={Localization.prevSheet} className={`${!selectedSheet && styles.disabled}`} onClick={onClickPrevSheet} />
            <GiLifeBar title={Localization.counter} onClick={onClickOpenCounter} />
            <GiSecretBook title={Localization.gameElements} onClick={onClickOpenGameElements} />
            <GiPerspectiveDiceSixFacesSix title={Localization.rollDice} onClick={onClickOpenRollDice} />
            <CgChevronRightO title={Localization.nextSheet} className={`${selectedSheet >= sheetCount && styles.disabled}`} onClick={onClickNextSheet} />
            <CgChevronDoubleRightO title={Localization.nextChapter} className={`${selectedChapter >= chapterCount && styles.disabled}`} onClick={onClickNextChapter} />
        </div>
    );
};

export default BottomMenu;
