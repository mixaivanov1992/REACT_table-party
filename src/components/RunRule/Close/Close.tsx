import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import React from 'react';
import styles from '@css/runRule/close/Close.module.scss';

const Close: React.FC = () => {
    const history = useHistory();

    return (
        <div className={styles.close}>
            <AiFillCloseCircle />
            <AiOutlineCloseCircle onClick={() => { history.goBack(); }} />
        </div>
    );
};

export default Close;
