import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        passwordRecovery: 'Восстановление пароля',
        email: 'Email',
        recover: 'Восстановить',
        emailNotField: 'Поле "Email" не заполнено',
        passwordRecoverySent: 'Письмо отправлено на почту для восстановления пароля',
    },
    'en-US': {
        passwordRecovery: 'Password recovery',
        email: 'Email',
        recover: 'Recover',
        emailNotField: 'The "Email" field is not filled in',
        passwordRecoverySent: 'The email was sent to the email for password recovery',
    },
});
export default Localization;
