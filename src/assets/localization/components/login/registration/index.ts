import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        registration: 'Регистрация',
        email: 'Email',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirm: 'Подтвердить',
        emailNotField: 'Поле "Email" не заполнено',
        usernameNotField: 'Поле "Имя пользователя" не заполнено',
        passwordNotField: 'Поле "Пароль" не заполнено',
        confirmNotField: 'Поле "Подтвердить" не заполнено',
        passwordsNotMatch: 'Пароли не совпадают',
        confirmEmail: 'Вам отправлено письмо. Для завершения регистрации необходимо подтвердить адрес электронной почты',
    },
    'en-US': {
        registration: 'Registration',
        email: 'Email',
        username: 'Username',
        password: 'Password',
        confirm: 'Confirm',
        emailNotField: 'The "Email" field is not filled in',
        usernameNotField: 'The "Username" field is not filled in',
        passwordNotField: 'The "Password" field is not filled in',
        confirmNotField: 'The "Confirm" field is not filled in',
        passwordsNotMatch: "Passwords don't match",
        confirmEmail: 'An email has been sent to you. To complete the registration, you need to confirm the email address',
    },
});
export default Localization;
