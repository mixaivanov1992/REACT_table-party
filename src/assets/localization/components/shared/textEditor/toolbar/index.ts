import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        linkImage: 'Ссылка на изображение',
        add: 'Добавить',
        close: 'Закрыть',
        height: 'Высота',
        width: 'Ширина',
        alignLeft: 'Выровнять по левому краю',
        alignCenter: 'Выровнять по центру',
        alignRight: 'Выровнять по правому краю',
        enterUrlLink: 'Введите URL-адрес вашей ссылки',
    },
    'en-US': {
        linkImage: 'Link to the image',
        add: 'Add',
        close: 'Close',
        height: 'Height',
        width: 'Width',
        alignLeft: 'Align to the left',
        alignCenter: 'Align to the center',
        alignRight: 'Align to the right edge',
        enterUrlLink: 'Enter the URL of your link',
    },
});
export default Localization;
