import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        passwordRecovery: 'Восстановление пароля',
        recover: 'Восстановить',
        password: 'Пароль',
        confirm: 'Подтвердить',
        passwordNotField: 'Поле "Пароль" не заполнено',
        confirmNotField: 'Поле "Подтвердить" не заполнено',
        passwordsNotMatch: 'Пароли не совпадают',
    },
    'en-US': {
        passwordRecovery: 'Password recovery',
        recover: 'Recover',
        password: 'Password',
        confirm: 'Confirm',
        passwordNotField: 'The "Password" field is not filled in',
        confirmNotField: 'The "Confirm" field is not filled in',
        passwordsNotMatch: "Passwords don't match",
    },
});
export default Localization;
