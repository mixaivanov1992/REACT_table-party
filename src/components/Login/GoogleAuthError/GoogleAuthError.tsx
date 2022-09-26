import { useParams } from 'react-router-dom';
import GoBack from '@components/Login/GoBack/GoBack';
import Localization from '@localization/components/login/googleAuthError';
import React from 'react';
import styles from '@css/login/passwordRecovery/PasswordRecovery.module.scss';

interface Parameters {
    error: string
}

const GoogleAuthError: React.FC = () => {
    Localization.setLanguage(navigator.language);
    const { error } = useParams<Parameters>();
    return (
        <div className={styles.passwordRecovery}>
            <div className={styles.wrapper}>
                <GoBack />
                <div className={styles.header}>{Localization.error}</div>
                <div className={styles.message}>{Localization[error]}</div>
            </div>
        </div>
    );
};

export default GoogleAuthError;
