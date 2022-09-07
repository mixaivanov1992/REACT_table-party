import { PageAlias } from '@models/accessiblePage';
import { v4 as uuidv4 } from 'uuid';
import Header from '@components/Content/Header/Header';
import Localization from '@localization/components/content/about';
import React from 'react';
import styles from '@css/content/about/About.module.scss';

const About: React.FC = () => {
    Localization.setLanguage(navigator.language);
    return (
        <main className={styles.about}>
            <div className={styles.container}>
                <Header pageAlias={PageAlias.about} />
                <div>
                    {
                        Localization.about.map((localization) => <p key={uuidv4()} className={styles.text}>{localization}</p>)
                    }
                </div>
            </div>
        </main>
    );
};

export default About;
