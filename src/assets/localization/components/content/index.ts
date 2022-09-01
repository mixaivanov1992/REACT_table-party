import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        home: 'Добро пожаловать',
        rules: 'Все правила',
        about: 'О нас',
        newRule: 'Новое правило',
        profile: 'Профиль',
        ruleEdit: 'Правка правила',
        searchRules: 'Поиск правил',
    },
    'en-US': {
        home: 'Welcome',
        rules: 'All rules',
        about: 'About us',
        newRule: 'New rules',
        profile: 'Profile',
        ruleEdit: 'Rule edit',
        searchRules: 'Search for rules',
    },
});
export default Localization;
