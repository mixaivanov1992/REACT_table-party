import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    'ru-RU': {
        back: 'Назад',
        forward: 'Вперед',
        prevChapter: 'Предыдущая глава',
        nextChapter: 'Следующая глава',
        prevSheet: 'Предыдущий лист',
        nextSheet: 'Следующий лист',
        rollDice: 'Бросок кубика',
        counter: 'Счетчик',
        gameElements: 'Элементы игры',
    },
    'en-US': {
        back: 'Back',
        forward: 'Forward',
        prevChapter: 'Previous chapter',
        nextChapter: 'Next chapter',
        prevSheet: 'Previous sheet',
        nextSheet: 'Next sheet',
        rollDice: 'Roll of the dice',
        counter: 'Counter',
        gameElements: 'Game Elements',
    },
});
export default Localization;
