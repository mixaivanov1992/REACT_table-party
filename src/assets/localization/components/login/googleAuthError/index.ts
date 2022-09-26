import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        error: 'Не удалось войти через Google',
        userUnauthorized: 'Пользователь не авторизован',
        googleNotVerified: 'Учетная запись Google не верифицирована',
    },
    'en-US': {
        error: "Couldn't log in via Google",
        userUnauthorized: 'The user is not logged in',
        googleNotVerified: 'Google account is not verified',
    },
});
export default Localization;
