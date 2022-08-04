import { AiOutlineFileImage } from 'react-icons/ai';
import { Align, DialogList } from '@models/components/textEditor';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import InputNumber from '@shared/InputNumber/InputNumber';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/shared/textEditor/toolbar';
import React, { useState } from 'react';
import styles from '@css/shared/textEditor/toolbar/Toolbar.module.scss';

interface Props {
    editorState: EditorState,
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>,
    isOpen: DialogList | null;
    setIsOpen: React.Dispatch<React.SetStateAction<DialogList | null>>
}

const ImageHandler: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);
    const {
        editorState, setEditorState, isOpen, setIsOpen,
    } = props;
    const [src, setSrc] = useState<string>('');
    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [align, setAlign] = useState<Align>(Align.LEFT);

    const addImage = () => {
        if (!src) {
            return;
        }
        const style = { height: 'auto', width: 'auto' };
        if (height) {
            style.height = `${height}px`;
        }
        if (width) {
            style.width = `${width}px`;
        }
        const parentStyle = { textAlign: align };
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

    const onInputHeight = (value: string): void => {
        setHeight(+value);
    };

    const onInputWidth = (value: string): void => {
        setWidth(+value);
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
                            htmlFor="selectionWindow"
                            text={Localization.linkImage}
                            value={src}
                        >
                            <input
                                onChange={(e) => { setSrc(e.currentTarget.value); }}
                                id="selectionWindow"
                                type="text"
                                value={src}
                            />
                        </InputWrapper>
                        <div className={styles.size}>
                            <InputWrapper
                                htmlFor="selectionWindow-height"
                                text={Localization.height}
                                value={height}
                            >
                                <InputNumber
                                    uid="selectionWindow-height"
                                    value={height}
                                    onInputData={onInputHeight}
                                />
                            </InputWrapper>
                            <InputWrapper
                                htmlFor="selectionWindow-width"
                                text={Localization.width}
                                value={width}
                            >
                                <InputNumber
                                    uid="selectionWindow-width"
                                    value={width}
                                    onInputData={onInputWidth}
                                />
                            </InputWrapper>
                        </div>
                        <div className={styles.align}>
                            <select value={align} onChange={(e) => setAlign(e.currentTarget.value as Align)}>
                                <option value={Align.LEFT}>{Localization.alignLeft}</option>
                                <option value={Align.CENTER}>{Localization.alignCenter}</option>
                                <option value={Align.RIGHT}>{Localization.alignRight}</option>
                            </select>
                        </div>
                        <div>
                            <button type="button" onMouseDown={addImage}>Добавить</button>
                            <button type="button" onMouseDown={() => setIsOpen(null)}>Отмена</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ImageHandler;
