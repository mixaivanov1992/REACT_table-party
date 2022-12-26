import { ContentTypes } from '@models/contentTypes';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useImageProcessing } from '@hooks/useImageProcessing';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@shared/Dialog/Dialog';
import InputNumber from '@shared/InputNumber/InputNumber';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/shared/ruleEdit/settings';
import React, { useState } from 'react';
import styles from '@css/shared/ruleEdit/settings/Settings.module.scss';

interface Props {
    contentTypes: ContentTypes,
    title: string,
    countItem: number,
    stateCount: number,
    cover: string,
    onInputCountItem: (count: number) => void,
    onChangeTitle: (title: string) => void
    onChangeCover: (cover: string) => void,
    onClickConfirmRemove: () => void
    addItem: () => void,
}

const Settings: React.FC<Props> = (props) => {
    console.info('Settings');
    Localization.setLanguage(navigator.language);

    const dispatch = useDispatch();
    const {
        contentTypes, title, countItem, stateCount, cover, onChangeTitle, onInputCountItem, onChangeCover, addItem, onClickConfirmRemove,
    } = props;

    const onClickAddItem = (): void => {
        if ((stateCount + countItem) > 100) {
            dispatch(showMessage(true, Localization.limitReached, Localization.maximumElements));
        } else {
            addItem();
        }
    };

    const imageProcessing = useImageProcessing();
    const onChangeImage = (e: React.FormEvent<HTMLInputElement>): void => {
        const { files } = e.currentTarget;
        const getFileData = (error: string, data: string) => {
            if (!error) {
                onChangeCover(data);
            } else {
                dispatch(showMessage(true, Localization.error, Localization[error] || error));
            }
        };
        imageProcessing(getFileData, files, 'image/jpeg');
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const uniqueId = uuidv4();
    return (
        <>
            <div className={styles.settings}>
                <div>
                    <InputWrapper
                        htmlFor={`cover${uniqueId}`}
                        text={Localization[contentTypes].cover}
                        value={cover}
                    >
                        <input
                            onChange={(e) => { onChangeCover(e.currentTarget.value); }}
                            id={`cover${uniqueId}`}
                            type="text"
                            value={cover}
                        />
                    </InputWrapper>
                    <div>
                        <input type="file" accept=".jpg, .jpeg" onChange={onChangeImage} />
                        <button type="button">{Localization.review}</button>
                    </div>
                </div>
                <div>
                    <InputWrapper
                        htmlFor={`title${uniqueId}`}
                        text={Localization[contentTypes].title}
                        value={title}
                    >
                        <input
                            type="text"
                            id={`title${uniqueId}`}
                            value={title}
                            onChange={(e) => { onChangeTitle(e.currentTarget.value); }}
                        />
                    </InputWrapper>
                    <div><button type="button" onClick={() => { setIsOpen(true); }}>{Localization[contentTypes].deleteItem}</button></div>
                </div>
                <div>
                    <InputWrapper
                        htmlFor={`count${uniqueId}`}
                        text={Localization[contentTypes].countItem}
                        value={countItem}
                    >
                        <InputNumber
                            id={`count${uniqueId}`}
                            value={countItem}
                            onInputData={onInputCountItem}
                        />
                    </InputWrapper>
                    <div><button type="button" onClick={onClickAddItem}>{Localization.addItem}</button></div>
                </div>
            </div>
            <Dialog
                isOpen={isOpen}
                onClickCloseDialog={() => { setIsOpen(false); }}
                title={Localization.removal}
                content={<div>{Localization[contentTypes].delete}</div>}
                footer={(
                    <>
                        <button type="button" onClick={() => { setIsOpen(false); onClickConfirmRemove(); }}>{Localization.confirm}</button>
                        <button type="button" onClick={() => { setIsOpen(false); }}>{Localization.close}</button>
                    </>
                )}
            />
        </>
    );
};

export default Settings;
