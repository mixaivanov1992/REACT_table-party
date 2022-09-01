import { AccessiblePages } from '@models/accessiblePage';
import { Link } from 'react-router-dom';
import Localization from '@localization/components/breadcrumbs/';
import React from 'react';
import styles from '@css/breadcrumbs/Breadcrumbs.module.scss';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

interface Props {
    accessiblePages: AccessiblePages
}

const Breadcrumbs: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);
    const breadcrumbs = useBreadcrumbs();
    const { accessiblePages } = props;

    return (
        <ul className={styles.breadcrumbs}>
            {
                breadcrumbs.map(({ match }) => {
                    for (const accessiblePage of accessiblePages) {
                        const { pageRoute, pageAlias, isContentComponent } = accessiblePage;
                        const baseUrl = pageRoute.split('/:')[0];
                        const currentUrl = match.url.split('/:')[0];

                        if (currentUrl === baseUrl && isContentComponent) {
                            return (
                                <li key={baseUrl}>
                                    <Link to={baseUrl}>{Localization[pageAlias]}</Link>
                                </li>
                            );
                        }
                    }
                    return undefined;
                })
            }
        </ul>
    );
};

export default Breadcrumbs;
