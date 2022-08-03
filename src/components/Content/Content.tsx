import { AccessiblePage } from '@models/accessiblePage';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import {
    GiDiceEightFacesEight, GiDiceFire, GiPerspectiveDiceSixFacesFive, GiRollingDiceCup, GiRollingDices,
} from 'react-icons/gi';
import Localization from '@localization/components/content';
import React, { useState } from 'react';
import styles from '@css/content/Content.module.scss';

interface Props {
    accessiblePage: AccessiblePage
}
const Content: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);

    const { accessiblePage } = props;
    const { pageAlias, component, fullScreenAccessible } = accessiblePage;

    const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
    const dice = [GiRollingDices, GiPerspectiveDiceSixFacesFive, GiRollingDiceCup, GiDiceEightFacesEight, GiDiceFire];
    const DiceComponent = dice[randomInt(0, 4)];
    const [isFullScreen, setIsFullscreen] = useState<boolean>(false);

    const Component = require(`./${component}`).default;

    if (fullScreenAccessible) {
        return (
            <main className={`${styles.content} ${isFullScreen ? styles.fullscreen : ''}`}>
                <Component>
                    <div className={styles.header}>
                        <span>{Localization[pageAlias]}</span>
                        <DiceComponent />
                    </div>
                    {
                        isFullScreen
                            ? (
                                <div className={styles.menu}>
                                    <button type="button" onClick={() => setIsFullscreen(false)}>
                                        <AiOutlineFullscreen />
                                        &#8203;
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.menu}>
                                    <button type="button" onClick={() => setIsFullscreen(true)}>
                                        <AiOutlineFullscreenExit />
                                        &#8203;
                                    </button>
                                </div>
                            )
                    }
                </Component>
            </main>
        );
    }
    return (
        <main className={`${styles.content} ${isFullScreen ? styles.fullscreen : ''}`}>
            <Component>
                <div className={styles.header}>
                    <span>{Localization[pageAlias]}</span>
                    <DiceComponent />
                </div>
            </Component>
        </main>
    );
};

export default Content;
