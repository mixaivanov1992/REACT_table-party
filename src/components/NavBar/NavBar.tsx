import { AccessiblePages } from '@models/accessiblePage';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DynamicIcon from '@shared/DynamicIcon/DynamicIcon';
import Localization from '@localization/components/navBar';
import React from 'react';
import styles from '@css/navbar/Navbar.module.scss';

interface Props {
    accessiblePages: AccessiblePages
}

const Navbar: React.FC<Props> = (props) => {
    console.debug('Navbar');
    Localization.setLanguage(navigator.language);

    const { accessiblePages } = props;
    return (
        <nav className={styles.navbar}>
            <ul>
                {
                    accessiblePages.map((accessiblePage) => {
                        const {
                            pageRoute, pageAlias, linkIcon,
                        } = accessiblePage;

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const location = useLocation();
                        if (location.pathname === pageRoute) {
                            return (
                                <li key={uuidv4()} className={styles.active}>
                                    <Link data-localization={Localization[pageAlias]} to={pageRoute}>
                                        { linkIcon ? <DynamicIcon path={linkIcon.path} name={linkIcon.name} /> : '' }
                                    </Link>
                                </li>
                            );
                        }
                        return (
                            <li key={uuidv4()}>
                                <Link data-localization={Localization[pageAlias]} to={pageRoute}>
                                    { linkIcon ? <DynamicIcon path={linkIcon.path} name={linkIcon.name} /> : '' }
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
};

export default Navbar;
