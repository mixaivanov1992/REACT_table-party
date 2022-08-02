import { AiOutlineLink } from 'react-icons/ai';
import { DialogList } from '@models/components/textEditor';
import { EditorState, RichUtils } from 'draft-js';
import React from 'react';

interface Props {
    editorState: EditorState,
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>,
    setIsOpen: React.Dispatch<React.SetStateAction<DialogList | null>>
}

const LinkHandler: React.FC<Props> = (props) => {
    const {
        editorState, setEditorState, setIsOpen,
    } = props;

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
    return (

        <button type="button" onMouseDown={handleAddLink} disabled={editorState.getSelection().isCollapsed()}>
            <AiOutlineLink />
            &#8203;
        </button>
    );
};

export default LinkHandler;
