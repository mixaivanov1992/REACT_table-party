import '@css/shared/textEditor/textEditor.css';
import 'draft-js/dist/Draft.css';
import {
    AiOutlineFileImage, AiOutlineLink,
} from 'react-icons/ai';
import {
    AtomicBlockUtils, ContentBlock, DraftEditorCommand, Editor, EditorState, RichUtils, convertFromRaw, convertToRaw,
} from 'draft-js';
import { colors, fontsFamily, fontsSize } from '@shared/TextEditor/styleMap';
import { linkDecorator } from '@shared/TextEditor/Link';
import { mediaBlockRenderer } from '@shared/TextEditor/Media';
import Colors from '@shared/TextEditor/Toolbar/Colors';
import Localization from '@localization/components/shared/editor';
import React, { ReactNode, useRef, useState } from 'react';
import SimpleButtons from '@shared/TextEditor/Toolbar/SimpleButtons';
import UndoRedo from '@shared/TextEditor/Toolbar/UndoRedo';
import styles from '@css/shared/textEditor/TextEditor.module.scss';

interface Props {
    initialState: string,
    readOnly: boolean
    editorSave(content: string): void,
    children: ReactNode
}

const TextEditor: React.FC<Props> = (props) => {
    const {
        initialState, editorSave, readOnly, children,
    } = props;
    const [selectionWindow, setSelectionWindow] = useState<JSX.Element | null>(null);
    Localization.setLanguage(navigator.language);

    const [editorState, setEditorState] = React.useState<EditorState>(
        initialState
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(initialState)), linkDecorator)
            : EditorState.createEmpty(linkDecorator),
    );

    if (readOnly) {
        return (
            <div className={styles.textEditor}>
                <div className={styles.readOnly}>
                    <Editor
                        editorState={editorState}
                        onChange={() => {}}
                        blockRendererFn={mediaBlockRenderer}
                        readOnly
                    />
                </div>
            </div>
        );
    }

    const handleSave = () => {
        editorSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    const handleInsertImage = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        const src = prompt('Please enter the URL of your picture');
        if (!src) {
            return;
        }
        const style = { height: '200px', width: '100px' };
        const parentStyle = { textAlign: 'center' };
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src, style, parentStyle });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        return setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    };

    const handleAddLink = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        const link = prompt('Please enter the URL of your link');
        if (!link) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
            return;
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
            url: link,
        });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'apply-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
    };

    const handleKeyCommand = (command: DraftEditorCommand) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const editor = useRef() as any;
    const focus = (): void => {
        editor.current?.focus();
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
                <Colors editorState={editorState} setEditorState={setEditorState} selectionWindow={selectionWindow} setSelectionWindow={setSelectionWindow} />
                <button type="button" onMouseDown={handleInsertImage}>
                    <AiOutlineFileImage />
                    &#8203;
                </button>
                <button type="button" onMouseDown={handleAddLink} disabled={editorState.getSelection().isCollapsed()}>
                    <AiOutlineLink />
                    &#8203;
                </button>
                <UndoRedo editorState={editorState} setEditorState={setEditorState} />
            </div>
            {selectionWindow ? <div className={styles.selectionWindow}>{selectionWindow}</div> : null}
            <div
                className={styles.editor}
                onClick={() => { setSelectionWindow(null); focus(); }}
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
