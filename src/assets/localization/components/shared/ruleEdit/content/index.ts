import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        noData: 'Нет данных',
        chapter: {
            navigation: 'Навигация по главам',
            number: 'Глава №',
            offsetRight: 'Смещение главы вправо',
            offsetLeft: 'Смещение главы влево',
        },
        sheet: {
            navigation: 'Навигация по листам',
        },
    },
    'en-US': {
        noData: 'No data',
        chapter: {
            navigation: 'Chapter Navigation',
            chapter: 'Chapter №',
            offsetRight: 'Shifting the chapter to the right',
            offsetLeft: 'Shifting the chapter to the left',
        },
        sheet: {
            navigation: 'Navigating through the sheets',
        },
    },
});
export default Localization;
