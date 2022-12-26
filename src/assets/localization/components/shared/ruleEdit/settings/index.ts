import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        fileNotFound: 'Файл не найден',
        incorrectFileType: 'Неправильный тип файла',
        review: 'Обзор...',
        failedDeleteRule: 'не удалось удалить правило',
        error: 'Ошибка',
        addItem: 'Добавить',
        limitReached: 'Достигнут предел',
        maximumElements: 'Максимальное количество элементов - 100',
        close: 'Закрыть',
        removal: 'Удаление',
        confirm: 'Подтвердить',
        rule: {
            cover: 'Обложка правила (ссылка на изображение)',
            title: 'Название правила',
            deleteItem: 'Удалить правило',
            countItem: 'Количество глав',
            delete: 'Вы действительно хотите удалить правило?',
        },
        chapter: {
            cover: 'Обложка главы (ссылка на изображение)',
            title: 'Название главы',
            deleteItem: 'Удалить главу',
            countItem: 'Количество листов',
            delete: 'Вы действительно хотите удалить главу и все ее содержимое?',
        },
    },
    'en-US': {
        fileNotFound: 'File not found',
        incorrectFileType: 'Incorrect file type',
        review: 'Review...',
        failedDeleteRule: 'failed to delete rule',
        error: 'Error',
        addItem: 'Add',
        limitReached: 'The limit has been reached',
        maximumElements: 'The maximum number of elements is 100',
        close: 'Close',
        removal: 'Removal',
        confirm: 'Confirm',
        rule: {
            cover: 'Rule cover (link to the image)',
            title: 'Name of the rule',
            deleteItem: 'Delete the rule',
            countItem: 'Number of chapters',
            delete: 'Do you really want to delete the rule?',
        },
        chapter: {
            cover: 'Chapter cover (link to the image)',
            title: 'Chapter title',
            deleteItem: 'Delete the chapter',
            countItem: 'Number of sheets',
            delete: 'Do you really want to delete the chapter and all its contents?',
        },
    },
});
export default Localization;
