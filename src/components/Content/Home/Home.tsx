import { PageAlias } from '@models/accessiblePage';
import { v4 as uuidv4 } from 'uuid';
import Header from '@components/Content/Header/Header';
import Localization from '@localization/components/content/home';
import React from 'react';
import styles from '@css/content/home/Home.module.scss';

const Home: React.FC = () => {
    console.info('Home');
    Localization.setLanguage(navigator.language);
    return (
        <main className={styles.home}>
            <div className={styles.container}>
                <Header pageAlias={PageAlias.home} />
                <div>
                    {
                        Localization.description.map((localization) => <p key={uuidv4()} className={styles.text}>{localization}</p>)
                    }
                </div>
            </div>
        </main>
    );
};

export default Home;
