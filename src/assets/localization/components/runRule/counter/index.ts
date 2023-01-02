import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        error: 'Ошибка',
        delete: 'Удалить группу',
        add: 'Добавить',
        groupName: 'Имя группы (имя игрока)',
        counterName: 'Имя счетчика',
        numberCounters: 'Количество счетчиков',
        fieldNotFilled() { return `Ошибка поле "${this.groupName}" не заполнено`; },
        fieldNotConfused() { return `Ошибка поле "${this.groupName}" не может быть путым`; },
    },
    'en-US': {
        error: 'Error',
        delete: 'Delete the group',
        add: 'Add',
        groupName: 'Group Name (player name)',
        counterName: 'Counter name',
        numberCounters: 'Number of counters',
        fieldNotFilled() { return `Error field "${this.groupName}" is not filled in`; },
        fieldNotConfused() { return `Error field "${this.groupName}" cannot be confused`; },
    },
});
export default Localization;
