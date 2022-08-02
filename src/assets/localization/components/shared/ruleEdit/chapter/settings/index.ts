import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        numberSheets: 'Кол-во листов',
        chapterNumber: 'Глава №',
        chapterTitle: 'Название главы',
        deleteChapter: 'Удалить главу',
        addSheets: 'Добавить лист(ы)',
        limitReached: 'Достигнут предел',
        maximumSheets: 'Общее максимальное количество листов 100',
        linkImage: 'Обложка (ссылка на изображение)',
    },
    'en-US': {
        numberSheets: 'Number of sheets',
        chapterNumber: 'Chapter №',
        chapterTitle: 'Chapter title',
        deleteChapter: 'Delete a chapter',
        addSheets: 'Add sheet(s)',
        limitReached: 'The limit has been reached',
        maximumSheets: 'The total maximum number of sheets is 100',
        linkImage: 'Cover (link to the image)',
    },
});
export default Localization;
