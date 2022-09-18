import { AccessiblePages } from '@models/accessiblePage';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/footer';
import React from 'react';
import styles from '@css/footer/Footer.module.scss';

interface Props {
    accessiblePages: AccessiblePages
}

const Footer: React.FC<Props> = (props) => {
    console.info('Footer');
    Localization.setLanguage(navigator.language);
    const { accessiblePages } = props;

    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.site_name}>Table Party</div>
                <div className={styles.links}>
                    {accessiblePages.map((accessiblePage) => {
                        const {
                            pageRoute, pageAlias,
                        } = accessiblePage;

                        return (
                            <Link key={uuidv4()} className={styles[pageAlias]} to={pageRoute}>{Localization[pageAlias]}</Link>
                        );
                    })}
                </div>
                <p className={styles.copyright}>
                    &copy;
                    {` ${new Date().getFullYear()}`}
                    {/* {` ${new Date().getFullYear()} TP.COM`} */}
                </p>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.projectAssistance}>
                    <div>{Localization.projectAssistance}</div>
                    <div>VISA</div>
                    <div>4400 4301 7703 2700</div>
                    <div>МИР</div>
                    <div>5336 6902 8653 9822</div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <span>Table</span>
                    <span>Party</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
