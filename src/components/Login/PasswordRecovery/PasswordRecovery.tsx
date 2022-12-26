import { PageRoute } from '@models/accessiblePage';
import { actionHandler } from '@store/actions/actionHandler';
import { actionPasswordRecovery } from '@store/actions/authAction';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Field from '@components/Login/Field/Field';
import Localization from '@localization/components/login/passwordRecovery';
import React, { useState } from 'react';
import styles from '@css/login/passwordRecovery/PasswordRecovery.module.scss';

interface Parameters {
    link: string
}

const PasswordRecovery: React.FC = () => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    console.info('PasswordRecovery');
    const { link } = useParams<Parameters>();

    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const history = useHistory();

    async function onClickPasswordRecovery() {
        setMessage('');
        if (!password) {
            setMessage(Localization.passwordNotField);
            return;
        }
        if (!confirm) {
            setMessage(Localization.confirmNotField);
            return;
        }
        if (confirm !== password) {
            setMessage(Localization.passwordsNotMatch);
            return;
        }
        const passwordRecovery = actionPasswordRecovery(link, password);
        const result = await actionHandler(dispatch, passwordRecovery);
        if (result.isSuccess) {
            history.push(PageRoute.login);
        } else {
            setMessage(result.message);
        }
    }

    return (
        <div className={styles.passwordRecovery}>
            <div className={styles.wrapper}>
                <div className={styles.header}>{Localization.passwordRecovery}</div>
                <Field text={Localization.password} value={password} type="password" id="password" fillField={setPassword} />
                <Field text={Localization.confirm} value={confirm} type="password" id="confirm" fillField={setConfirm} />
                <div className={styles.recovery}>
                    <button
                        onClick={onClickPasswordRecovery}
                        type="button"
                    >
                        {Localization.recover}
                    </button>
                </div>
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    );
};

export default PasswordRecovery;
