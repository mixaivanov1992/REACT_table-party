import { PageRoute } from '@models/accessiblePage';
import { useParams } from 'react-router-dom';
import React, { ReactNode } from 'react';
import RulesList from '@shared/RulesList/RulesList';

interface Parameters {
    name: string,
}
interface Props {
    children: ReactNode
}

const SearchRules: React.FC<Props> = (props) => {
    console.info('SearchRules');
    const { children } = props;
    const { name } = useParams<Parameters>();
    const rulePlay = PageRoute.runRule.split(':')[0];
    console.log(name);
    return (
        <>
            {children}
            <RulesList rulePlay={rulePlay} nameContains={name} />
        </>
    );
};

export default SearchRules;
