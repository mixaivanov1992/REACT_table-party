import '@css/shared/textEditor/textEditor.css';
import 'draft-js/dist/Draft.css';
import {
    ContentBlock, DraftEditorCommand, Editor, EditorState, RichUtils, convertFromRaw, convertToRaw,
} from 'draft-js';
import { DialogList } from '@models/components/textEditor';
import { colors, fontsFamily, fontsSize } from '@shared/TextEditor/styleMap';
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
            : EditorState.createEmpty(linkDecorator), // проверить
    );
    const editor = useRef() as any;

    const handleSave = () => {
        editorSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    const focus = (): void => {
        editor.current?.focus();
    };

    const handleKeyCommand = (command: DraftEditorCommand) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const getBlockStyle = (contentBlock: ContentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
        case 'align-left':
            return 'align-left';
        case 'align-center':
            return 'align-center';
        case 'align-right':
            return 'align-right';
        case 'color-red':
            return 'color-red';
        default:
            return '';
        }
    };

    return (
        <div className={styles.textEditor}>
            <div className={styles.toolbar}>
                <SimpleButtons editorState={editorState} setEditorState={setEditorState} />
                <ColorHandler editorState={editorState} setEditorState={setEditorState} isOpen={isOpen} setIsOpen={setIsOpen} />
                <LinkHandler editorState={editorState} setEditorState={setEditorState} setIsOpen={setIsOpen} />
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
                    handleKeyCommand={handleKeyCommand}
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={{ ...colors, ...fontsFamily, ...fontsSize }}
                    placeholder={Localization.createRule}
                    ref={(element) => {
                        editor.current = element;
                    }}
                />
            </div>
            <div className={styles.footer}>
                <button className="save" type="button" onClick={(e) => { e.preventDefault(); handleSave(); }}>{Localization.save}</button>
                {children}
            </div>
        </div>
    );
};

export default TextEditor;
