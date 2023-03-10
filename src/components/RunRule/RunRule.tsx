import { ChapterData, RuleData } from '@models/services/ruleService';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import {
    colors, fontsFamily, fontsSize, textAlign,
} from '@shared/TextEditor/styleMap';
import { linkDecorator } from '@shared/TextEditor/Link';
import { mediaBlockRenderer } from '@shared/TextEditor/Media';
import { useTypedSelector } from '@hooks/useTypedSelector';
import BottomMenu from '@components/RunRule/BottomMenu/BottomMenu';
import Close from '@components/RunRule/Close/Close';
import Cover from '@components/RunRule/Cover/Cover';
import Navbar from '@components/RunRule/Navbar/Navbar';
import React, { useMemo, useRef, useState } from 'react';
import styles from '@css/runRule/RunRule.module.scss';

interface Props {
    ruleId: string,
    rule: RuleData,
    chapters: ChapterData
}

const RunRule: React.FC<Props> = (props) => {
    console.info('RunRule');

    const { ruleId, rule, chapters } = props;
    const [selectedChapter, setSelectedChapter] = useState<number>(0);
    const [selectedSheet, setSelectedSheet] = useState<number>(0);

    const sheets = useTypedSelector((state) => state.sheetReducer[chapters[selectedChapter]?.uid]);
    const runRule = useRef() as React.MutableRefObject<HTMLDivElement>;
    const blink = useRef() as React.MutableRefObject<HTMLDivElement>;

    const onClickChapterSelection = (index: number) => {
        setSelectedChapter(index);
        setSelectedSheet(0);
    };

    const blinkHandler = () => {
        blink.current.classList.add(styles.blink);
        setTimeout(() => {
            blink.current.classList.remove(styles.blink);
        }, 500);
    };

    const navbar = useMemo(() => <Navbar chapters={chapters} selectedChapter={selectedChapter} onClickChapterSelection={onClickChapterSelection} />, [chapters, selectedChapter]);
    const editorState = sheets && sheets[selectedSheet] && sheets[selectedSheet].content ? EditorState.createWithContent(convertFromRaw(JSON.parse(sheets[selectedSheet].content)), linkDecorator) : EditorState.createEmpty();
    return (
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
                <BottomMenu
                    ruleId={ruleId}
                    chapters={chapters}
                    sheets={sheets}
                    selectedChapter={selectedChapter}
                    selectedSheet={selectedSheet}
                    blinkHandler={blinkHandler}
                    changeChapter={(chapter: number) => { setSelectedChapter(chapter); }}
                    changeSheet={(sheet: number) => { setSelectedSheet(sheet); }}
                />
            </div>
        </main>
    );
};

export default RunRule;
