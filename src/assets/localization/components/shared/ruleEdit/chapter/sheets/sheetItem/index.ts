import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        dataEntry: 'Ввод данных',
        close: 'Закрыть',
        removal: 'Удаление',
        confirm: 'Подтвердить',
        deleteSheet: 'Вы действительно хотите удалить лист?',
        deleteSheetBtn: 'Удалить лист',
    },
    'en-US': {
        dataEntry: 'Data entry',
        close: 'Close',
        removal: 'Removal',
        confirm: 'Confirm',
        deleteSheet: 'Do you really want to delete the sheet?',
        deleteSheetBtn: 'Delete a sheet',
    },
});
export default Localization;
