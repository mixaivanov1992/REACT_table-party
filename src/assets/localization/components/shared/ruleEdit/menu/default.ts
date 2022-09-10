import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        default: 'Отменить все изменения',
        close: 'Закрыть',
        confirm: 'Подтвердить',
        undoChanges: 'Отменить все внесенные изменения в правило',
        error: 'Ошибка',
        failedRestoreData: 'Не удалось восстановить данные по умолчанию',
    },
    'en-US': {
        default: 'Undo all changes',
        close: 'Close',
        confirm: 'Confirm',
        undoChanges: 'Undo all changes made to the rule',
        error: 'Error',
        failedRestoreData: 'Failed to restore default data',
    },
});
export default Localization;
