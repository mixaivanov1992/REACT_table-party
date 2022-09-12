import { PageAlias, PageRoute } from '@models/accessiblePage';
import Header from '@components/Content/Header/Header';
import React from 'react';
import RulesList from '@shared/RulesList/RulesList';
import ShowMoreRule from '@shared/ShowMoreRule/ShowMoreRule';
import styles from '@css/content/rules/Rules.module.scss';

const Rules: React.FC = () => {
    console.info('Rules');
    const rulePlay = PageRoute.runRule.split(':')[0];
    return (
        <main className={styles.rules}>
            <div className={styles.container}>
                <Header pageAlias={PageAlias.rules} />
                <RulesList rulePlay={rulePlay} />
                <ShowMoreRule />
            </div>
        </main>
    );
};

export default Rules;
