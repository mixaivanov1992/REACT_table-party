import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        chaptersNavigation: 'Навигация по главам',
        noData: 'Нет данных',
        chapter: 'Глава №',
        offsetRight: 'Смещение главы вправо',
        offsetLeft: 'Смещение главы влево',
    },
    'en-US': {
        chaptersNavigation: 'Chapter Navigation',
        noData: 'No data',
        chapter: 'Chapter №',
        offsetRight: 'Shifting the chapter to the right',
        offsetLeft: 'Shifting the chapter to the left',
    },
});
export default Localization;
