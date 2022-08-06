import { actionForgotPassword } from '@store/actions/authAction';
import { actionHandler } from '@store/actions/actionHandler';
import { useDispatch } from 'react-redux';
import Field from '@components/Login/Field/Field';
import GoBack from '@components/Login/GoBack/GoBack';
import Localization from '@localization/components/login/forgotPassword';
import React, { useState } from 'react';
import styles from '@css/login/forgotPassword/ForgotPassword.module.scss';

const ForgotPassword: React.FC = () => {
    console.info('ForgotPassword');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);

    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isSent, setIsSent] = useState<boolean>(false);

    async function onClickRecover() {
        setMessage('');
        if (!email) {
            setMessage(Localization.emailNotField);
            return;
        }
        const forgotPassword = actionForgotPassword(email);
        const result = await actionHandler(dispatch, forgotPassword);
        if (result.isSuccess) {
            setIsSent(true);
        } else {
            setMessage(result.message);
        }
    }

    return (
        <div className={styles.forgot_password}>
            <div className={styles.wrapper}>
                <GoBack />
                <div className={styles.header}>{Localization.passwordRecovery}</div>
                { !isSent
                && (
                    <>
                        <Field text={Localization.email} value={email} type="email" id="email" setState={setEmail} />
                        <button
                            className={styles.recover_btn}
                            onClick={onClickRecover}
                            type="button"
                        >
                            {Localization.recover}
                        </button>
                    </>
                )}
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    );
};

export default ForgotPassword;
