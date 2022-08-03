import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        countItem: 'Кол-во элементов',
        title: 'Название',
        linkImage: 'Обложка (ссылка на изображение)',
        deleteItem: 'Удалить',
        addItem: 'Добавить',
        limitReached: 'Достигнут предел',
        maximumElements: 'Максимальное количество элементов - 100',
        close: 'Закрыть',
        removal: 'Удаление',
        confirm: 'Подтвердить',
        deleteRule: 'Вы действительно хотите удалить правило?',
        deleteChapter: 'Вы действительно хотите удалить главу и все ее содержимое?',
    },
    'en-US': {
        countItem: 'Count item',
        title: 'Title',
        linkImage: 'Cover (link to the image)',
        deleteItem: 'Delete',
        addItem: 'Add',
        limitReached: 'The limit has been reached',
        maximumElements: 'The maximum number of elements is 100',
        close: 'Close',
        removal: 'Removal',
        confirm: 'Confirm',
        deleteRule: 'Do you really want to delete the rule?',
        deleteChapter: 'Do you really want to delete the chapter and all its contents?',
    },
});
export default Localization;
