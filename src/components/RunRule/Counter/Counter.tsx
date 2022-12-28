import Localization from '@localization/components/runRule/counter';
import React from 'react';
import styles from '@css/runRule/counter/Counter.module.scss';

const Counter: React.FC = () => {
    Localization.setLanguage(navigator.language);

    return (
        <div className={styles.counter}>
            123
        </div>
    );
};

export default Counter;
