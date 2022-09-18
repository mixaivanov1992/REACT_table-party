import { IoChevronBackOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import React from 'react';
import styles from '@css/login/goBack/GoBack.module.scss';

const GoBack: React.FC = () => {
    console.info('GoBack');
    const history = useHistory();

    return (
        <div
            tabIndex={-1}
            onKeyPress={() => {}}
            role="button"
            onClick={history.goBack}
            className={styles.go_back}
        >
            <span>
                <IoChevronBackOutline />
            </span>
        </div>
    );
};

export default React.memo(GoBack);
