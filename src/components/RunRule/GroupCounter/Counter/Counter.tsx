import { addCounter, changeCounter, deleteCounter } from '@store/reducer/counterReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import InputNumber from '@shared/InputNumber/InputNumber';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/runRule/groupCounter/counter';
import React, { useState } from 'react';
import styles from '@css/runRule/groupCounter/counter/Counter.module.scss';

interface Props {
    groupUid: string,
}

const Counter: React.FC<Props> = (props) => {
    console.info('Counter');
    Localization.setLanguage(navigator.language);
    const dispatch = useDispatch();
    const { groupUid } = props;
    const counterReducer = useTypedSelector((state) => state.counterReducer[groupUid]);
    const [newCounterName, setNewCounterName] = useState('');

    const onClickAddCounter = () => {
        if (newCounterName) {
            setNewCounterName('');
            dispatch(addCounter(groupUid, uuidv4(), newCounterName));
        } else {
            dispatch(showMessage(true, Localization.error, Localization.fieldNotFilled()));
        }
    };

    const onClickDeleteCounter = (counterUid: string) => {
        dispatch(deleteCounter(groupUid, counterUid));
    };

    const onChangeCounter = (counterUid: string, value: number) => {
        dispatch(changeCounter(groupUid, counterUid, value));
    };

    const content = counterReducer && counterReducer.map((counter) => {
        const { uid, name, value } = counter;
        return (
            <div className={styles.wrapper} key={uid}>
                <InputWrapper
                    htmlFor={uid}
                    text={name}
                    value={value}
                >
                    <InputNumber
                        id={uid}
                        value={value}
                        onInputData={(data: number) => { onChangeCounter(uid, data); }}
                    />
                </InputWrapper>
                <div><button type="button" onClick={() => { onClickDeleteCounter(uid); }}>{Localization.delete}</button></div>
            </div>
        );
    });

    const counterUid = uuidv4();
    return (
        <div className={styles.counter}>
            <div className={styles.add_counter}>
                <InputWrapper
                    htmlFor={counterUid}
                    text={Localization.counterName}
                    value={newCounterName}
                >
                    <input
                        type="text"
                        id={counterUid}
                        value={newCounterName}
                        onChange={(e) => { setNewCounterName(e.currentTarget.value.trim()); }}
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickAddCounter}>{Localization.add}</button></div>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Counter;
