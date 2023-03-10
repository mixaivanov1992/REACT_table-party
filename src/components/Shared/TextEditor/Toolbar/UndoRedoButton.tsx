import { AiOutlineRedo, AiOutlineUndo } from 'react-icons/ai';
import { EditorState } from 'draft-js';
import React from 'react';

interface Props {
    editorState: EditorState,
    setEditorState: (state: EditorState)=>void;
}

const UndoRedoButton: React.FC<Props> = (props) => {
    const { editorState, setEditorState } = props;
    return (
        <>
            <button type="button" disabled={editorState.getUndoStack().size <= 0} onClick={() => setEditorState(EditorState.undo(editorState))}>
                <AiOutlineUndo />
                &#8203;
            </button>
            <button type="button" disabled={editorState.getRedoStack().size <= 0} onClick={() => setEditorState(EditorState.redo(editorState))}>
                <AiOutlineRedo />
                &#8203;
            </button>
        </>
    );
};

export default UndoRedoButton;
