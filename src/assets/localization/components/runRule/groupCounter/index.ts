import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        error: 'Ошибка',
        delete: 'Удалить группу',
        add: 'Добавить группу',
        groupName: 'Имя группы (имя игрока)',
        fieldNotFilled() { return `Ошибка поле "${this.groupName}" не заполнено`; },
        fieldNotConfused() { return `Ошибка поле "${this.groupName}" не может быть путым`; },
    },
    'en-US': {
        error: 'Error',
        delete: 'Delete the group',
        add: 'Add the group',
        groupName: 'Group Name (player name)',
        fieldNotFilled() { return `Error field "${this.groupName}" is not filled in`; },
        fieldNotConfused() { return `Error field "${this.groupName}" cannot be confused`; },
    },
});
export default Localization;
