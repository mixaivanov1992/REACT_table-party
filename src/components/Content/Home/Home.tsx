import React, { ReactNode } from 'react';
import styles from '@css/content/home/Home.module.scss';
import Localization from '@localization/home';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    children: ReactNode
}
const Home: React.FC<Props> = (props) => {
    const { children } = props;
    return (
        <>
            {children}
            <div className={styles.home}>
                {
                    Localization.description.map((localization) => <p key={uuidv4()} className={styles.text}>{localization}</p>)
                }
            </div>
        </>
    );
};

export default Home;
