import { AiOutlineLink } from 'react-icons/ai';
import { EditorState, RichUtils } from 'draft-js';
import Localization from '@localization/components/shared/textEditor/toolbar';
import React from 'react';

interface Props {
    editorState: EditorState,
    setEditorState: (state: EditorState)=>void;
}

const LinkHandler: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);
    const {
        editorState, setEditorState,
    } = props;

    const onClickAddLink = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        const link = prompt(Localization.enterUrlLink);
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

        <button type="button" onClick={onClickAddLink} disabled={editorState.getSelection().isCollapsed()}>
            <AiOutlineLink />
            &#8203;
        </button>
    );
};

export default LinkHandler;
