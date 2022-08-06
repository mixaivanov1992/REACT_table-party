import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        userNotFound: 'Неверный логин или пароль',
        emailAlreadyExist: 'Электронная почта уже существует',
        userUnauthorized: 'Пользователь не авторизован',
        unActivatedUser: 'Пользователь не активирован',
        unknownError: 'Неизвестная ошибка',
        unexpectedError: 'Непредвиденная ошибка',
        incorrectEmail: 'Неправильный адрес электронной почты',
        incorrectPassword: 'Пароль должен состоять минимум из 8 символов',
        failedSaveRule: 'Не удалось сохранить правило',
        ruleNameAlreadyExist: 'Правило с таким именем уже существует',
        usernameAlreadyExist: 'Имя пользователя уже существует',
        failedGetRule: 'Не удалось получить правило',
    },
    'en-US': {
        userNotFound: 'Invalid username or password',
        emailAlreadyExist: 'The email already exists',
        userUnauthorized: 'The user is not logged in',
        unActivatedUser: 'The user is not activated',
        unknownError: 'Unknown error',
        unexpectedError: 'Unknown error',
        incorrectEmail: 'Incorrect email address',
        incorrectPassword: 'The password must consist of at least 8 characters',
        failedSaveRule: 'Failed to save rule',
        ruleNameAlreadyExist: 'The rule with that name already exists',
        usernameAlreadyExist: 'The username already exist',
        failedGetRule: 'Failed get rule',
    },
});
export default Localization;
