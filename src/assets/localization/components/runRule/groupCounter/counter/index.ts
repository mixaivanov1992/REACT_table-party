import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        error: 'Ошибка',
        delete: 'Удалить счетчик',
        add: 'Добавить счетчик',
        counterName: 'Имя счетчика',
        fieldNotFilled() { return `Ошибка поле "${this.counterName}" не заполнено`; },
    },
    'en-US': {
        error: 'Error',
        delete: 'Delete the counter',
        add: 'Add the counter',
        counterName: 'Counter name',
        fieldNotFilled() { return `Error field "${this.counterName}" is not filled in`; },
    },
});
export default Localization;
