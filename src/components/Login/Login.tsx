import { FcGoogle } from 'react-icons/fc';
import { Link, useHistory } from 'react-router-dom';
import { PageRoute } from '@models/accessiblePage';
import { actionHandler } from '@store/actions/actionHandler';
import { actionLogin, getGoogleOAuthURL } from '@store/actions/authAction';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Field from '@components/Login/Field/Field';
import GoBack from '@components/Login/GoBack/GoBack';
import Localization from '@localization/components/login';
import React, { useState } from 'react';
import styles from '@css/login/Login.module.scss';

const Login: React.FC = () => {
    console.info('Login');
    const dispatch = useDispatch();

    Localization.setLanguage(navigator.language);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const history = useHistory();
    async function onClickLogin() {
        if (!email) {
            setMessage(Localization.emailNotField);
            return;
        }
        if (!password) {
            setMessage(Localization.passwordNotField);
            return;
        }
        const login = actionLogin(dispatch, email, password);
        const result = await actionHandler(dispatch, login);
        if (result.isSuccess) {
            history.push(PageRoute.home);
        } else {
            setMessage(result.message);
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.wrapper}>
                <GoBack />
                <div className={styles.header}>{Localization.entrance}</div>
                <Field text={Localization.email} value={email} type="email" id="email" setState={setEmail} />
                <Field text={Localization.password} value={password} type="password" id="password" setState={setPassword} />
                <div>
                    <div className={styles.message}>{message}</div>
                    <Link key={uuidv4()} className={styles.forgot_password} to={PageRoute.forgotPassword}>
                        {Localization.forgotPassword}
                    </Link>
                    <button
                        className={styles.login_btn}
                        onClick={onClickLogin}
                        type="button"
                    >
                        {Localization.login}
                    </button>
                    <div>
                        <Link key={uuidv4()} className={styles.registration} to={PageRoute.registration}>
                            {Localization.registration}
                        </Link>
                    </div>
                </div>
                <div className={styles.social}>
                    <a className={styles.google} href={getGoogleOAuthURL()}>
                        <FcGoogle />
                        <span>{Localization.google}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
