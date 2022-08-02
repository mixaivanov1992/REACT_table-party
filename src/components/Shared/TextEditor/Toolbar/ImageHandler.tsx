import { AiOutlineFileImage } from 'react-icons/ai';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import { DialogList } from '@models/components/textEditor';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import React, { useState } from 'react';
import styles from '@css/shared/textEditor/toolbar/Toolbar.module.scss';

interface Props {
    editorState: EditorState,
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>,
    isOpen: DialogList | null;
    setIsOpen: React.Dispatch<React.SetStateAction<DialogList | null>>
}

const ImageHandler: React.FC<Props> = (props) => {
    const {
        editorState, setEditorState, isOpen, setIsOpen,
    } = props;
    const [src, setSrc] = useState<string>('');

    const addImage = () => {
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
        setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
        setIsOpen(null);
    };

    const imageSelection = () => {
        if (isOpen === DialogList.IMAGE) {
            setIsOpen(null);
        } else {
            setIsOpen(DialogList.IMAGE);
        }
    };

    return (
        <>
            <button type="button" onMouseDown={imageSelection}>
                <AiOutlineFileImage />
                &#8203;
            </button>
            {isOpen === DialogList.IMAGE ? (
                <div className={styles.selectionWindow}>
                    <div className={styles.imageHandler}>
                        <InputWrapper
                            htmlFor="imageSrc"
                            text="imageSrc"
                            value={src}
                        >
                            <input
                                onChange={(e) => { setSrc(e.currentTarget.value); }}
                                id="imageSrc"
                                type="text"
                                value={src}
                            />
                        </InputWrapper>
                        <button type="button" onMouseDown={addImage}>Добавить</button>
                        <button type="button" onMouseDown={() => setIsOpen(null)}>Отмена</button>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ImageHandler;
