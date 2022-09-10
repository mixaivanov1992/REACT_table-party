import { PageAlias, PageRoute } from '@models/accessiblePage';
import { v4 as uuidv4 } from 'uuid';
import Header from '@components/Content/Header/Header';
import Localization from '@localization/components/content/profile';
import React, { useState } from 'react';
import RulesList from '@shared/RulesList/RulesList';
import styles from '@css/content/profile/Profile.module.scss';

const Profile: React.FC = () => {
    console.info('Profile');
    Localization.setLanguage(navigator.language);

    const ruleEdit = PageRoute.ruleEdit.split(':')[0];
    const rulePlay = PageRoute.runRule.split(':')[0];

    const [activeTab, setActiveTab] = useState<number>(0);

    const Content:Array<JSX.Element> = [
        <RulesList rulePlay={rulePlay} ruleEdit={ruleEdit} />,
    ];
    const li:Array<JSX.Element> = [Localization.myRules].map((name: string, index:number) => (
        <li
            key={uuidv4()}
            role="menuitem"
            onKeyPress={() => {}}
            onClick={() => { setActiveTab(index); }}
            className={index === activeTab ? styles.active : ''}
        >
            {name}
        </li>
    ));
    return (
        <main className={styles.profile}>
            <div className={styles.container}>
                <Header pageAlias={PageAlias.profile} />
                <ul>{li}</ul>
                <div className={styles.content}>
                    {Content[activeTab]}
                </div>
            </div>
        </main>
    );
};

export default Profile;
