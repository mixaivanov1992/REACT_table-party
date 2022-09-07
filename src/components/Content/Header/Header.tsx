import {
    GiDiceEightFacesEight, GiDiceFire, GiPerspectiveDiceSixFacesFive, GiRollingDiceCup, GiRollingDices,
} from 'react-icons/gi';
import { PageAlias } from '@models/accessiblePage';
import Localization from '@localization/components/content';
import React from 'react';
import styles from '@css/content/header/Header.module.scss';

interface Props {
    pageAlias: PageAlias,
}

const Header: React.FC<Props> = (props) => {
    const { pageAlias } = props;
    Localization.setLanguage(navigator.language);
    const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
    const dice = [GiRollingDices, GiPerspectiveDiceSixFacesFive, GiRollingDiceCup, GiDiceEightFacesEight, GiDiceFire];
    const DiceComponent = dice[randomInt(0, 4)];
    return (
        <div className={styles.header}>
            <span>{Localization[pageAlias]}</span>
            <DiceComponent />
        </div>
    );
};
export default Header;
