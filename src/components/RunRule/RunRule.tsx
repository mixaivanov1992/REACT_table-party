import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { linkDecorator } from '@shared/TextEditor/Link';
import { useHistory, useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Cover from '@components/RunRule/Cover/Cover';
import Localization from '@localization/components/runRule';
import Navbar from '@components/RunRule/Navbar/Navbar';
import React, { useMemo, useRef, useState } from 'react';
import styles from '@css/runRule/RunRule.module.scss';

interface Parameters {
    url: string
}

const RunRule: React.FC = () => {
    console.info('RunRule');
    Localization.setLanguage(navigator.language);
    const { url } = useParams<Parameters>();
    const [selectedChapter, setSelectedChapter] = useState<number>(0);
    const [selectedSheet, setSelectedSheet] = useState<number>(0);

    const rules = useTypedSelector((state) => state.RuleReducer);
    const ruleId = Object.keys(rules).filter((key) => rules[key].url === url)[0];
    const chapters = useTypedSelector((state) => state.chapterReducer[ruleId]);
    const sheets = useTypedSelector((state) => state.sheetReducer[chapters[selectedChapter]?.uid]);

    const rule = rules[ruleId];
    const chapterCount = chapters.length ? chapters.length - 1 : 0;
    const sheetCount = sheets.length ? sheets.length - 1 : 0;

    const runRule = useRef() as React.MutableRefObject<HTMLDivElement>;
    const history = useHistory();

    const onClickCloseRule = () => {
        history.goBack();
    };

    const onClickChapterSelection = (index: number) => {
        setSelectedChapter(index);
        setSelectedSheet(0);
    };

    const onClickNextChapter = () => {
        if (selectedChapter < chapterCount) {
            setSelectedChapter(selectedChapter + 1);
            setSelectedSheet(0);
        }
    };

    const onClickPrevChapter = () => {
        if (selectedChapter > 0) {
            setSelectedChapter(selectedChapter - 1);
            setSelectedSheet(0);
        }
    };

    const onClickNextSheet = () => {
        if (selectedSheet < sheetCount) {
            setSelectedSheet(selectedSheet + 1);
        }
    };

    const onClickPrevSheet = () => {
        if (selectedSheet > 0) {
            setSelectedSheet(selectedSheet - 1);
        }
    };

    const navbar = useMemo(() => <Navbar chapters={chapters} selectedChapter={selectedChapter} onClickChapterSelection={onClickChapterSelection} />, [chapters, selectedChapter]);

    const editorState = sheets ? EditorState.createWithContent(convertFromRaw(JSON.parse(sheets[selectedSheet]?.content)), linkDecorator) : EditorState.createEmpty();
    return (
        <div className={styles.runRule} ref={runRule}>
            <div className={styles.close}>
                <AiFillCloseCircle />
                <AiOutlineCloseCircle onClick={onClickCloseRule} />
            </div>
            <Cover cover={rule.cover} />
            <div className={styles.rule}>
                {navbar}
                <div className={styles.container}>
                    <div className={styles.header}>{chapters[selectedChapter]?.name}</div>
                    <div className={styles.content}>
                        <Editor
                            editorState={editorState}
                            onChange={() => {}}
                            readOnly
                        />
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        <div>{Localization.chapters}</div>
                        <button disabled={!selectedChapter || selectedChapter < chapterCount} type="button" onClick={onClickPrevChapter}>{Localization.back}</button>
                        <button disabled={selectedChapter >= chapterCount} type="button" onClick={onClickNextChapter}>{Localization.forward}</button>
                    </div>
                    <div>
                        <div>{Localization.sheets}</div>
                        <button disabled={!selectedSheet || selectedSheet < sheetCount} type="button" onClick={onClickPrevSheet}>{Localization.back}</button>
                        <button disabled={selectedSheet >= sheetCount} type="button" onClick={onClickNextSheet}>{Localization.forward}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RunRule;
