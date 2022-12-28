import {
    CgChevronDoubleLeftO, CgChevronDoubleRightO, CgChevronLeftO, CgChevronRightO,
} from 'react-icons/cg';
import { ChapterData, RuleData } from '@models/services/ruleService';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { GiLifeBar, GiPerspectiveDiceSixFacesSix, GiSecretBook } from 'react-icons/gi';
import {
    colors, fontsFamily, fontsSize, textAlign,
} from '@shared/TextEditor/styleMap';
import { linkDecorator } from '@shared/TextEditor/Link';
import { mediaBlockRenderer } from '@shared/TextEditor/Media';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Close from '@components/RunRule/Close/Close';
import Cover from '@components/RunRule/Cover/Cover';
import Dialog from '@shared/Dialog/Dialog';
import Localization from '@localization/components/runRule';
import Navbar from '@components/RunRule/Navbar/Navbar';
import React, { useMemo, useRef, useState } from 'react';
import RollDice from '@components/RunRule/RollDice/RollDice';
import styles from '@css/runRule/RunRule.module.scss';

interface Props {
    rule: RuleData,
    chapters: ChapterData
}

const RunRule: React.FC<Props> = (props) => {
    console.info('RunRule');
    Localization.setLanguage(navigator.language);

    const { rule, chapters } = props;

    const [selectedChapter, setSelectedChapter] = useState<number>(0);
    const [selectedSheet, setSelectedSheet] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const sheets = useTypedSelector((state) => state.sheetReducer[chapters[selectedChapter]?.uid]);
    const runRule = useRef() as React.MutableRefObject<HTMLDivElement>;
    const blink = useRef() as React.MutableRefObject<HTMLDivElement>;

    const chapterCount = chapters.length ? chapters.length - 1 : 0;
    const sheetCount = sheets.length ? sheets.length - 1 : 0;

    const blinkHandler = () => {
        blink.current.classList.add(styles.blink);
        setTimeout(() => {
            blink.current.classList.remove(styles.blink);
        }, 500);
    };

    const onClickChapterSelection = (index: number) => {
        setSelectedChapter(index);
        setSelectedSheet(0);
    };

    const onClickNextChapter = () => {
        if (selectedChapter < chapterCount) {
            setSelectedChapter(selectedChapter + 1);
            setSelectedSheet(0);
            blinkHandler();
        }
    };

    const onClickPrevChapter = () => {
        if (selectedChapter > 0) {
            setSelectedChapter(selectedChapter - 1);
            setSelectedSheet(0);
            blinkHandler();
        }
    };

    const onClickNextSheet = () => {
        if (selectedSheet < sheetCount) {
            setSelectedSheet(selectedSheet + 1);
            blinkHandler();
        }
    };

    const onClickPrevSheet = () => {
        if (selectedSheet > 0) {
            setSelectedSheet(selectedSheet - 1);
            blinkHandler();
        }
    };

    const navbar = useMemo(() => <Navbar chapters={chapters} selectedChapter={selectedChapter} onClickChapterSelection={onClickChapterSelection} />, [chapters, selectedChapter]);
    const editorState = sheets && sheets[selectedSheet] && sheets[selectedSheet].content ? EditorState.createWithContent(convertFromRaw(JSON.parse(sheets[selectedSheet]?.content)), linkDecorator) : EditorState.createEmpty();
    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClickCloseDialog={() => { setIsOpen(false); }}
                title={Localization.rollDice}
                dialogSize="90"
                content={<RollDice />}
            />
            <main className={styles.runRule} ref={runRule}>
                <Close />
                <Cover cover={rule?.cover} />
                <div className={styles.rule}>
                    {navbar}
                    <div className={styles.container}>
                        <div className={styles.header}>{chapters && chapters[selectedChapter]?.name}</div>
                        <div className={`${styles.content}`} ref={blink}>
                            <Editor
                                editorState={editorState}
                                blockRendererFn={mediaBlockRenderer}
                                blockStyleFn={textAlign}
                                customStyleMap={{ ...colors, ...fontsFamily, ...fontsSize }}
                                onChange={() => {}}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <CgChevronDoubleLeftO title={Localization.prevChapter} className={`${!selectedChapter && styles.disabled}`} onClick={onClickPrevChapter} />
                        <CgChevronLeftO title={Localization.prevSheet} className={`${!selectedSheet && styles.disabled}`} onClick={onClickPrevSheet} />
                        <GiLifeBar title={Localization.counter} />
                        <GiSecretBook title={Localization.gameElements} />
                        <GiPerspectiveDiceSixFacesSix title={Localization.rollDice} onClick={() => { setIsOpen(true); }} />
                        <CgChevronRightO title={Localization.nextSheet} className={`${selectedSheet >= sheetCount && styles.disabled}`} onClick={onClickNextSheet} />
                        <CgChevronDoubleRightO title={Localization.nextChapter} className={`${selectedChapter >= chapterCount && styles.disabled}`} onClick={onClickNextChapter} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default RunRule;
