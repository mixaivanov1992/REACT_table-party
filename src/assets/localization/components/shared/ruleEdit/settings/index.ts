import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        failedDeleteRule: 'не удалось удалить правило',
        error: 'Ошибка',
        addItem: 'Добавить',
        limitReached: 'Достигнут предел',
        maximumElements: 'Максимальное количество элементов - 100',
        close: 'Закрыть',
        removal: 'Удаление',
        confirm: 'Подтвердить',
        deleteRule: 'Вы действительно хотите удалить правило?',
        deleteChapter: 'Вы действительно хотите удалить главу и все ее содержимое?',
        rule: {
            cover: 'Обложка правила (ссылка на изображение)',
            title: 'Название правила',
            deleteItem: 'Удалить правило',
            countItem: 'Количество глав',
        },
        chapter: {
            cover: 'Обложка главы (ссылка на изображение)',
            title: 'Название главы',
            deleteItem: 'Удалить главу',
            countItem: 'Количество листов',
        },
    },
    'en-US': {
        failedDeleteRule: 'failed to delete rule',
        error: 'Error',
        addItem: 'Add',
        limitReached: 'The limit has been reached',
        maximumElements: 'The maximum number of elements is 100',
        close: 'Close',
        removal: 'Removal',
        confirm: 'Confirm',
        deleteRule: 'Do you really want to delete the rule?',
        deleteChapter: 'Do you really want to delete the chapter and all its contents?',
        rule: {
            cover: 'Rule cover (link to the image)',
            title: 'Name of the rule',
            deleteItem: 'Delete the rule',
            countItem: 'Number of chapters',
        },
        chapter: {
            cover: 'Chapter cover (link to the image)',
            title: 'Chapter title',
            deleteItem: 'Delete the chapter',
            countItem: 'Number of sheets',
        },
    },
});
export default Localization;
