import {
    CgChevronDoubleLeftO, CgChevronDoubleRightO, CgChevronLeftO, CgChevronRightO,
} from 'react-icons/cg';
import { ChapterData, SheetData } from '@models/services/ruleService';
import { GiLifeBar, GiPerspectiveDiceSixFacesSix, GiSecretBook } from 'react-icons/gi';
import Localization from '@localization/components/runRule/bottomMenu';
import React from 'react';
import styles from '@css/runRule/bottomMenu/BottomMenu.module.scss';

interface Props {
    chapters: ChapterData,
    sheets: SheetData,
    selectedChapter: number,
    selectedSheet: number,
    blinkHandler: () => void,
    onClickOpenDialog: () => void,
    changeChapter: (chapter: number) => void,
    changeSheet: (chapter: number) => void,
}

const BottomMenu: React.FC<Props> = (props) => {
    console.info('BottomMenu');
    Localization.setLanguage(navigator.language);

    const {
        chapters, sheets, selectedChapter, selectedSheet, blinkHandler, onClickOpenDialog, changeChapter, changeSheet,
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

    return (
        <div className={styles.menu}>
            <CgChevronDoubleLeftO title={Localization.prevChapter} className={`${!selectedChapter && styles.disabled}`} onClick={onClickPrevChapter} />
            <CgChevronLeftO title={Localization.prevSheet} className={`${!selectedSheet && styles.disabled}`} onClick={onClickPrevSheet} />
            <GiLifeBar title={Localization.counter} />
            <GiSecretBook title={Localization.gameElements} />
            <GiPerspectiveDiceSixFacesSix title={Localization.rollDice} onClick={onClickOpenDialog} />
            <CgChevronRightO title={Localization.nextSheet} className={`${selectedSheet >= sheetCount && styles.disabled}`} onClick={onClickNextSheet} />
            <CgChevronDoubleRightO title={Localization.nextChapter} className={`${selectedChapter >= chapterCount && styles.disabled}`} onClick={onClickNextChapter} />
        </div>
    );
};

export default BottomMenu;
