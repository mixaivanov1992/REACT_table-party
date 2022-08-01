import { EditorState, Modifier, RichUtils } from 'draft-js';
import { VscSymbolColor } from 'react-icons/vsc';
import { colors } from '@shared/TextEditor/styleMap';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import styles from '@css/shared/textEditor/toolbar/Toolbar.module.scss';

interface Props {
    editorState: EditorState,
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
    selectionWindow: JSX.Element | null,
    setSelectionWindow: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

const Colors: React.FC<Props> = (props) => {
    const {
        editorState, setEditorState, selectionWindow, setSelectionWindow,
    } = props;

    const changeColor = (e: React.MouseEvent | React.KeyboardEvent, toggledColor: string) => {
        e.preventDefault();
        const selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
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

    const colorSelection = () => {
        if (!selectionWindow) {
            setSelectionWindow(
                <div className={styles.colors}>
                    {Object.keys(colors).map((index) => (
                        <span
                            key={uuidv4()}
                            role="button"
                            tabIndex={-1}
                            onMouseDown={(event) => changeColor(event, index)}
                            onKeyPress={(event) => event.key === 'Enter' && changeColor(event, index)}
                            style={{ backgroundColor: colors[index].color }}
                        >
                            &#8203;
                        </span>
                    ))}
                </div>,
            );
        } else {
            setSelectionWindow(null);
        }
    };

    return (
        <span
            role="button"
            tabIndex={-1}
            onMouseDown={colorSelection}
            onKeyPress={(event) => event.key === 'Enter' && colorSelection()}
        >
            <VscSymbolColor />
        </span>
    );
};

export default Colors;
