import '@css/shared/textEditor/textEditor.css';
import 'draft-js/dist/Draft.css';
import { DialogList } from '@models/components/textEditor';
import {
    Editor, EditorState, Modifier, convertFromRaw, convertToRaw, getDefaultKeyBinding,
} from 'draft-js';
import {
    colors, fontsFamily, fontsSize, textAlign,
} from '@shared/TextEditor/styleMap';
import { linkDecorator } from '@shared/TextEditor/Link';
import { mediaBlockRenderer } from '@shared/TextEditor/Media';
import ColorHandler from '@shared/TextEditor/Toolbar/ColorHandler';
import ImageHandler from '@shared/TextEditor/Toolbar/ImageHandler';
import LinkHandler from '@shared/TextEditor/Toolbar/LinkHandler';
import Localization from '@localization/components/shared/textEditor';
import React, { ReactNode, useRef, useState } from 'react';
import SimpleButtons from '@shared/TextEditor/Toolbar/SimpleButtons';
import UndoRedoButton from '@shared/TextEditor/Toolbar/UndoRedoButton';
import styles from '@css/shared/textEditor/TextEditor.module.scss';

interface Props {
    initialState: string,
    editorSave(content: string): void,
    children: ReactNode
}

const TextEditor: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);
    const {
        initialState, editorSave, children,
    } = props;

    const [isOpen, setIsOpen] = useState<DialogList | null>(null);

    const [editorState, setEditorState] = React.useState<EditorState>(
        initialState
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(initialState)), linkDecorator)
            : EditorState.createEmpty(linkDecorator),
    );
    const editor = useRef() as any;

    const onClickSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        editorSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    const focus = (): void => {
        editor.current?.focus();
    };

    const keyBindingFn = (e: React.KeyboardEvent<{}>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const tabCharacter = '    ';
            const newContentState = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                tabCharacter,
            );
            setEditorState(EditorState.push(editorState, newContentState, 'insert-characters'));
        }
        return getDefaultKeyBinding(e);
    };

    return (
        <div className={styles.textEditor}>
            <div className={styles.toolbar}>
                <SimpleButtons editorState={editorState} setEditorState={setEditorState} />
                <ColorHandler editorState={editorState} setEditorState={setEditorState} isOpen={isOpen} setIsOpen={setIsOpen} />
                <LinkHandler editorState={editorState} setEditorState={setEditorState} />
                <ImageHandler editorState={editorState} setEditorState={setEditorState} isOpen={isOpen} setIsOpen={setIsOpen} />
                <UndoRedoButton editorState={editorState} setEditorState={setEditorState} />
            </div>
            <div
                className={styles.editor}
                onClick={() => { setIsOpen(null); focus(); }}
                onKeyPress={() => {}}
                role="button"
                tabIndex={-1}
            >
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={textAlign}
                    customStyleMap={{ ...colors, ...fontsFamily, ...fontsSize }}
                    placeholder={Localization.createRule}
                    ref={(element) => {
                        editor.current = element;
                    }}
                    keyBindingFn={keyBindingFn}
                />
            </div>
            <div className={styles.footer}>
                <button className="save" type="button" onClick={onClickSave}>{Localization.save}</button>
                {children}
            </div>
        </div>
    );
};

export default TextEditor;
