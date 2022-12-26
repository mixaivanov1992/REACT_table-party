import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        dataEntry: 'Ввод данных',
        close: 'Закрыть',
        removal: 'Удаление',
        confirm: 'Подтвердить',
        deleteSheet: 'Вы действительно хотите удалить лист?',
        deleteSheetBtn: 'Удалить лист',
        moveLeft: 'Сдвинуть влево',
        moveRight: 'Сдвинуть вправо',
        edit: 'Редактировать',
    },
    'en-US': {
        dataEntry: 'Data entry',
        close: 'Close',
        removal: 'Removal',
        confirm: 'Confirm',
        deleteSheet: 'Do you really want to delete the sheet?',
        deleteSheetBtn: 'Delete a sheet',
        moveLeft: 'Move to the left',
        moveRight: 'Move to the right',
        edit: 'Edit',
    },
});
export default Localization;
