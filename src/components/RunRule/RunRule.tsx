import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { actionGetRule } from '@store/actions/ruleAction';
import { actionHandler } from '@store/actions/actionHandler';
import {
    colors, fontsFamily, fontsSize, textAlign,
} from '@shared/TextEditor/styleMap';
import { linkDecorator } from '@shared/TextEditor/Link';
import { mediaBlockRenderer } from '@shared/TextEditor/Media';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Cover from '@components/RunRule/Cover/Cover';
import Localization from '@localization/components/runRule';
import Navbar from '@components/RunRule/Navbar/Navbar';
import React, {
    useEffect, useMemo, useRef, useState,
} from 'react';
import styles from '@css/runRule/RunRule.module.scss';

interface Parameters {
    id: string
}

const RunRule: React.FC = () => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { id: ruleId } = useParams<Parameters>();
    const [selectedChapter, setSelectedChapter] = useState<number>(0);
    const [selectedSheet, setSelectedSheet] = useState<number>(0);

    const rule = useTypedSelector((state) => state.ruleReducer[ruleId]);
    const chapters = useTypedSelector((state) => state.chapterReducer[ruleId]);
    const sheets = useTypedSelector((state) => chapters && state.sheetReducer[chapters[selectedChapter]?.uid]);
    const runRule = useRef() as React.MutableRefObject<HTMLDivElement>;
    const history = useHistory();
    const getRule = actionGetRule(dispatch, ruleId);

    useEffect(() => {
        if (!chapters) {
            actionHandler(dispatch, getRule);
        }
    }, []);

    const chapterCount = chapters?.length ? chapters.length - 1 : 0;
    const sheetCount = sheets?.length ? sheets.length - 1 : 0;

    const onClickChapterSelection = (index: number) => {
        setSelectedChapter(index);
        setSelectedSheet(0);
    };

    const onClickCloseRule = () => {
        history.goBack();
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

    const navbar = useMemo(() => chapters && <Navbar chapters={chapters} selectedChapter={selectedChapter} onClickChapterSelection={onClickChapterSelection} />, [chapters, selectedChapter]);
    const editorState = sheets && sheets[selectedSheet] && sheets[selectedSheet].content ? EditorState.createWithContent(convertFromRaw(JSON.parse(sheets[selectedSheet]?.content)), linkDecorator) : EditorState.createEmpty();
    return (
        <div className={styles.runRule} ref={runRule}>
            <div className={styles.close}>
                <AiFillCloseCircle />
                <AiOutlineCloseCircle onClick={onClickCloseRule} />
            </div>
            <Cover cover={rule?.cover} />
            <div className={styles.rule}>
                {navbar}
                <div className={styles.container}>
                    <div className={styles.header}>{chapters && chapters[selectedChapter]?.name}</div>
                    <div className={styles.content}>
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
                    <div>
                        <div>{Localization.chapters}</div>
                        <button disabled={!selectedChapter} type="button" onClick={onClickPrevChapter}>{Localization.back}</button>
                        <button disabled={selectedChapter >= chapterCount} type="button" onClick={onClickNextChapter}>{Localization.forward}</button>
                    </div>
                    <div>
                        <div>{Localization.sheets}</div>
                        <button disabled={!selectedSheet} type="button" onClick={onClickPrevSheet}>{Localization.back}</button>
                        <button disabled={selectedSheet >= sheetCount} type="button" onClick={onClickNextSheet}>{Localization.forward}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RunRule;
