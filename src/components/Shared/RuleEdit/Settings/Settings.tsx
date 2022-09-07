import { SettingsType } from '@models/shared/ruleEdit/settings/settings';
import { v4 as uuidv4 } from 'uuid';
import InputNumber from '@shared/InputNumber/InputNumber';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/shared/ruleEdit/settings';
import React from 'react';
import styles from '@css/shared/ruleEdit/settings/Settings.module.scss';

interface Props {
    settingsType: SettingsType,
    title: string,
    onChangeTitle: (title: string) => void
    countItem: number,
    onInputCountItem: (count: string) => void,
    cover: string,
    onChangeCover: (cover: string) => void,
    onClickAddItem: () => void,
    onClickRemoveItem: () => void
}

const Settings: React.FC<Props> = (props) => {
    console.info('Settings');
    Localization.setLanguage(navigator.language);

    const {
        settingsType, title, onChangeTitle, countItem, onInputCountItem, cover, onChangeCover, onClickAddItem, onClickRemoveItem,
    } = props;

    const uniqueId = uuidv4();
    return (
        <div className={styles.settings}>
            <InputWrapper
                htmlFor={`cover${uniqueId}`}
                text={Localization[settingsType].cover}
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
                <InputWrapper
                    htmlFor={`title${uniqueId}`}
                    text={Localization[settingsType].title}
                    value={title}
                >
                    <input
                        type="text"
                        id={`title${uniqueId}`}
                        value={title}
                        onChange={(e) => { onChangeTitle(e.currentTarget.value); }}
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickRemoveItem}>{Localization[settingsType].deleteItem}</button></div>
            </div>
            <div>
                <InputWrapper
                    htmlFor={`count${uniqueId}`}
                    text={Localization[settingsType].countItem}
                    value={countItem}
                >
                    <InputNumber
                        uid={`count${uniqueId}`}
                        value={countItem}
                        onInputData={onInputCountItem}
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickAddItem}>{Localization.addItem}</button></div>
            </div>
        </div>
    );
};

export default Settings;
