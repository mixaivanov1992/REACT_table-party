import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        sheetNumber: 'Лист №',
        dataEntry: 'Ввод данных',
        close: 'Закрыть',
        removal: 'Удаление',
        confirm: 'Подтвердить',
        deleteSheet: 'Вы действительно хотите удалить лист?',
    },
    'en-US': {
        sheetNumber: 'Sheet number',
        dataEntry: 'Data entry',
        close: 'Close',
        removal: 'Removal',
        confirm: 'Confirm',
        deleteSheet: 'Do you really want to delete the sheet?',
    },
});
export default Localization;
