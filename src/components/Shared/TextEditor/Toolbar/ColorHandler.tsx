import { DialogList } from '@models/components/textEditor';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import { VscSymbolColor } from 'react-icons/vsc';
import { colors } from '@shared/TextEditor/styleMap';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import styles from '@css/shared/textEditor/toolbar/Toolbar.module.scss';

interface Props {
    editorState: EditorState,
    setEditorState: (state: EditorState)=>void;
    isOpen: DialogList | null;
    setIsOpen: (state: DialogList | null)=>void;
}

const ColorHandler: React.FC<Props> = (props) => {
    const {
        editorState, setEditorState, isOpen, setIsOpen,
    } = props;

    const onClickChangeColor = (toggledColor: string) => {
        const selection = editorState.getSelection();

        const nextContentState = Object.keys(colors)
            .reduce((contentState, color) => Modifier.removeInlineStyle(contentState, selection, color), editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style',
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor,
            );
        }

        setEditorState(nextEditorState);
    };

    const onClickColorSelection = () => {
        if (isOpen === DialogList.COLORS) {
            setIsOpen(null);
        } else {
            setIsOpen(DialogList.COLORS);
        }
    };

    return (
        <>
            <button type="button" onClick={onClickColorSelection}>
                <VscSymbolColor />
            </button>
            {isOpen === DialogList.COLORS ? (
                <div className={styles.selectionWindow}>
                    <div className={styles.colorHandler}>
                        {Object.keys(colors).map((index) => (
                            <span
                                key={uuidv4()}
                                role="button"
                                tabIndex={-1}
                                onClick={() => onClickChangeColor(index)}
                                onKeyPress={() => {}}
                                style={{ backgroundColor: colors[index].color }}
                            >
                                &#8203;
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ColorHandler;
