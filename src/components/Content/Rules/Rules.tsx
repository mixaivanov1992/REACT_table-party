import { PageRoute } from '@models/accessiblePage';
import React, { ReactNode } from 'react';
import RulesList from '@shared/RulesList/RulesList';

interface Props {
    children: ReactNode
}
const Rules: React.FC<Props> = (props) => {
    console.info('Rules');
    const { children } = props;
    const rulePlay = PageRoute.runRule.split(':')[0];
    return (
        <>
            {children}
            <RulesList rulePlay={rulePlay} />
        </>
    );
};

export default Rules;
