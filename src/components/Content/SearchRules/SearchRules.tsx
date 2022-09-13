import { PageAlias, PageRoute } from '@models/accessiblePage';
import { useParams } from 'react-router-dom';
import Header from '@components/Content/Header/Header';
import React from 'react';
import RulesList from '@shared/RulesList/RulesList';
import ShowMoreRule from '@shared/ShowMoreRule/ShowMoreRule';
import styles from '@css/content/searchRules/SearchRules.module.scss';

interface Parameters {
    name: string,
}

const SearchRules: React.FC = () => {
    console.info('SearchRules');
    const { name } = useParams<Parameters>();
    const rulePlay = PageRoute.runRule.split(':')[0];
    return (
        <main className={styles.searchRules}>
            <div className={styles.container}>
                <Header pageAlias={PageAlias.searchRules} />
                <RulesList rulePlay={rulePlay} name={name} />
                <ShowMoreRule name={name} />
            </div>
        </main>
    );
};

export default SearchRules;
