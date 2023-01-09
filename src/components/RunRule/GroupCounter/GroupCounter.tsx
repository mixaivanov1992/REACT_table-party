import { addGroup, changeGroup, deleteGroup } from '@store/reducer/groupCounterReducer';
import { deleteAllCounter } from '@store/reducer/counterReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Counter from '@components/RunRule/GroupCounter/Counter/Counter';
import InputWrapper from '@shared/InputWrapper/InputWrapper';
import Localization from '@localization/components/runRule/groupCounter';
import React, { useState } from 'react';
import styles from '@css/runRule/groupCounter/GroupCounter.module.scss';

interface Props {
    ruleId: string,
}

const GroupCounter: React.FC<Props> = (props) => {
    console.info('GroupCounter');
    Localization.setLanguage(navigator.language);
    const dispatch = useDispatch();
    const { ruleId } = props;
    const groupCounterReducer = useTypedSelector((state) => state.groupCounterReducer[ruleId]);
    const [newGroupName, setNewGroupName] = useState('');

    const onClickAddGroup = () => {
        if (newGroupName) {
            setNewGroupName('');
            dispatch(addGroup(ruleId, uuidv4(), newGroupName));
        } else {
            dispatch(showMessage(true, Localization.error, Localization.fieldNotFilled()));
        }
    };

    const onClickDeleteGroup = (groupUid: string) => {
        dispatch(deleteAllCounter(groupUid));
        dispatch(deleteGroup(ruleId, groupUid));
    };

    const onChangeGroup = (groupUid: string, name: string) => {
        if (name) {
            dispatch(changeGroup(ruleId, groupUid, name));
        } else {
            dispatch(showMessage(true, Localization.error, Localization.fieldNotConfused()));
        }
    };

    const content = groupCounterReducer && groupCounterReducer.map((group) => {
        const { uid, name } = group;
        return (
            <div className={styles.wrapper} key={uid}>
                <div className={styles.group_name}>
                    <InputWrapper
                        htmlFor={uid}
                        text={Localization.groupName}
                        value={name}
                    >
                        <input
                            type="text"
                            id={uid}
                            value={name}
                            onChange={(e) => { onChangeGroup(uid, e.currentTarget.value.trim()); }}
                        />
                    </InputWrapper>
                    <div><button type="button" onClick={() => { onClickDeleteGroup(uid); }}>{Localization.delete}</button></div>
                </div>
                <Counter groupUid={uid} />
            </div>
        );
    });

    const groupUid = uuidv4();
    return (
        <div className={styles.group_counter}>
            <div className={styles.content}>{content}</div>
            <div className={styles.add_group}>
                <InputWrapper
                    htmlFor={groupUid}
                    text={Localization.groupName}
                    value={newGroupName}
                >
                    <input
                        type="text"
                        id={groupUid}
                        value={newGroupName}
                        onChange={(e) => { setNewGroupName(e.currentTarget.value.trim()); }}
                    />
                </InputWrapper>
                <div><button type="button" onClick={onClickAddGroup}>{Localization.add}</button></div>
            </div>
        </div>
    );
};

export default GroupCounter;
