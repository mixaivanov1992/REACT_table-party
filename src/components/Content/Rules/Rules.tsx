import { PageRoute } from '@models/accessiblePage';
import React from 'react';
import RulesList from '@shared/RulesList/RulesList';

const Rules: React.FC = () => {
    console.info('Rules');
    const rulePlay = PageRoute.runRule.split(':')[0];
    return (
        <RulesList rulePlay={rulePlay} />
    );
};

export default Rules;
